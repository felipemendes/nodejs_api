const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

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

router.post('/', function (req, res, next) {

    Event.addEvent(req.body, function (err, count) {
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

router.put('/:id', function (req, res, next) {

    Event.updateEvent(req.params.id, req.body, function (err, rows) {
        if (err)
        res.json(err);
        else
        res.json(rows);
    });

});

module.exports = router;