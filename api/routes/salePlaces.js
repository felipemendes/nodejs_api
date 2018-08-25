const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/CheckAuth');
const SalePlacesController = require('../controllers/salePlaces');

router.get('/:status?/:uuid?/:search?/:page?/:limit?', SalePlacesController.get_sale_places);

router.post('/', checkAuth, SalePlacesController.create_sale_place);

router.delete('/:uuid', checkAuth, SalePlacesController.delete_sale_place);

router.put('/:uuid', checkAuth, SalePlacesController.update_sale_place);

module.exports = router;
