const express = require('express');

const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/CheckAuth');
const CategoriesController = require('../controllers/categories');

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, './uploads/categories/');
    },

    filename(req, file, cb) {
        const filename = `${new Date().getTime()}-${file.originalname}`;
        cb(null, filename);
    }

});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({

    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter

});

router.get('/:status?/:uuid?/:search?/:page?/:limit?', CategoriesController.get_categories);

router.post('/', upload.single('url_image'), checkAuth, CategoriesController.create_category);

router.delete('/:uuid', checkAuth, CategoriesController.delete_category);

router.put('/:uuid', upload.single('url_image'), checkAuth, CategoriesController.update_category);

module.exports = router;
