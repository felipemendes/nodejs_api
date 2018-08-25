const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/CheckAuth');
const CategoriesController = require('../controllers/categories');

router.get('/:status?/:uuid?/:search?/:page?/:limit?', CategoriesController.get_categories);

router.post('/', checkAuth, CategoriesController.create_category);

router.delete('/:uuid', checkAuth, CategoriesController.delete_category);

router.put('/:uuid', checkAuth, CategoriesController.update_category);

module.exports = router;
