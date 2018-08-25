const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/CheckAuth');
const EventsController = require('../controllers/events');

router.get('/:saleplace?/:category?/:upcoming?/:status?/:uuid?/:search?/:page?/:limit?', EventsController.get_events);

router.post('/', checkAuth, EventsController.create_event);

router.delete('/:uuid', checkAuth, EventsController.delete_event);

router.put('/:uuid', checkAuth, EventsController.update_event);

module.exports = router;
