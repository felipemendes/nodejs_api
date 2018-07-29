const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const helpers = require('../helpers/PurAiHelpers');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },

    filename: function (req, file, cb) {
        const filename = new Date().toLocaleDateString() + "-" + Math.floor((Math.random() * 10000) + 1) + ".jpg";
        cb(null, filename);
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

router.get('/:uuid?/:search?/:page?/:quantity?', function (req, res, next) {

    Event.getEvents(req.query.uuid, req.query.search, req.query.page, req.query.quantity, function (err, rows) {
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

    const emailFormatted = helpers.validateEmail(req.body.user_email);
    if (!emailFormatted) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Email format is invalid'
        });
        return;
    }

    if (req.file == undefined) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Column \'url_image\' cannot be null'
        });
        return;
    }

    const dateFormatted = helpers.dateFormatter(req.body.date);
    if (dateFormatted == 'NaN/NaN/NaN') {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Date invalid format. Must be yyyy-MM-dd'
        });
        return;
    }

    const newUuid = uuidv1();
    const placePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.place_phone);
    const salePlacePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.sale_place_phone);

    Event.postEvent(req.body, req.file, newUuid, placePhoneNumberFormatted, dateFormatted, salePlacePhoneNumberFormatted, function (err, count) {
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

router.delete('/:uuid', function (req, res, next) {

    Event.deleteEvent(req.params.uuid, function (err, count) {
        if (err) {
            res.json({
                message: 'Event cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows == 0) {
            res.json({
                message: 'Event cannot be remove. Check details message for more info',
                details: 'Event ' + req.params.uuid + ' not found'
            });
        } else {
            res.json({
                message: 'Event successfully removed',
                details: 'Affected rows ' + count.affectedRows
            });
        }
    });

});

router.put('/:uuid', upload.single('url_image'), function (req, res, next) {

    const emailFormatted = helpers.validateEmail(req.body.user_email);
    if (!emailFormatted) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Email format is invalid'
        });
        return;
    }

    if (req.file == undefined) {
        res.json({
            message: 'Event cannot be register. Check details message for more info',
            details: 'Column \'url_image\' cannot be null'
        });
        return;
    }

    const newUuid = uuidv1();
    const placePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.place_phone);
    const salePlacePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.sale_place_phone);
    
    Event.putEvent(req.params.uuid, placePhoneNumberFormatted, salePlacePhoneNumberFormatted, req.body, req.file, function (err, rows) {
        if (err) {
            res.json({
                message: 'Event cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'Event successfully updated',
                details: rows
            });
        }
    });

});

module.exports = router;