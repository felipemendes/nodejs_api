const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb ) => {
    // reject a file
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

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {
    Event.getEventById(req.params.id, function (err, rows) {
      if (err)
        res.json(err);
      else
        res.json(rows);
    });

  } else {
    Event.getAllEvents(function (err, rows) {
      if (err)
        res.json(err);
      else
        res.json(rows);
    });
  }
  
});

router.post('/', upload.single('url_image'), function (req, res, next) {

    Event.addEvent(req.body, req.file, function (err, count) {
        if (err)
            res.json(err);
        else
            res.json(req.body);
    });

});

router.post('/:id', function (req, res, next) {

    Event.deleteAll(req.body, function (err, count) {
        if (err)
        res.json(err);
        else
        res.json(count);
    });

});

router.delete('/:id', function (req, res, next) {

    Event.deleteEvent(req.params.id, function (err, count) {
        if (err)
        res.json(err);
        else
        res.json(count);
    });

});

router.put('/:id', upload.single('url_image'), function (req, res, next) {

    Event.updateEvent(req.params.id, req.body, req.file, function (err, rows) {
        if (err)
        res.json(err);
        else
        res.json(rows);
    });

});

module.exports = router;