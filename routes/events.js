const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer');
const uuidv1 = require('uuid/v1');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }

});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});

router.get('/:id?/:search?/:page?/:quantity?', function (req, res, next) {

    Event.getEvents(req.query.id, req.query.search, req.query.page, req.query.quantity, function (err, rows) {
        if (err) {
            res.json({
                message: 'Events cannot be return. Check details message for more info',
                details: err.sqlMessage
            });
        } else
            res.json(rows);
    });

});

router.post('/', upload.single('url_image'), function (req, res, next) {

    if (req.file == undefined) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Column \'url_image\' cannot be null'
        });
        return;
    }

    let newUuid = uuidv1();
    Event.addEvent(req.body, req.file, newUuid, function (err, count) {
        if (err) {
            res.json({
                message: 'Event cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'Event successfully registered',
                details: 'New UUID: ' + newUuid
            });
        }
    });

});

router.put('/:id', upload.single('url_image'), function (req, res, next) {

    if (req.file == undefined) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Column \'url_image\' cannot be null'
        });
        return;
    }

    Event.updateEvent(req.params.id, req.body, req.file, function (err, rows) {
        if (err) {
            res.json({
                message: 'Event cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'Event successfully registered',
                details: 'New UUID: ' + newUuid
            });
        }
    });

});

router.delete('/:id', function (req, res, next) {

    Event.deleteEvent(req.params.id, function (err, count) {
        if (err) {
            res.json({
                message: 'Event cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows == 0) {
            res.json({
                message: 'Event cannot be remove. Check details message for more info',
                details: 'Event ' + req.params.id + ' not found'
            });
        } else {
            res.json({
                message: 'Event successfully removed',
                details: 'Affected rows ' + count.affectedRows
            });
        }
    });

});

module.exports = router;