const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/CheckAuth');
const UsersController = require('../controllers/users');

router.get('/:status?/:uuid?', checkAuth, UsersController.get_users);

router.post('/signup', checkAuth, UsersController.signup);

router.post('/', UsersController.login);

router.delete('/:uuid', checkAuth, UsersController.delete_user);

router.put('/:uuid', checkAuth, UsersController.update_user);

module.exports = router;
