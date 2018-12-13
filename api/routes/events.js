const express = require('express');

const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/CheckAuth');
const EventsController = require('../controllers/events');

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, './uploads/events/');
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

router.get('/:saleplace?/:category?/:upcoming?/:status?/:featured?/:uuid?/:search?/:page?/:limit?', EventsController.get_events);

router.post('/', upload.single('image'), checkAuth, EventsController.create_event);

router.delete('/:uuid', checkAuth, EventsController.delete_event);

router.put('/:uuid', upload.single('image'), checkAuth, EventsController.update_event);

module.exports = router;
