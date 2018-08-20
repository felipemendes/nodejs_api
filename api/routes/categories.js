const express = require('express');

const router = express.Router();
const Category = require('../models/Category');
const uuidv1 = require('uuid/v1');
const validate = require('uuid-validate');

router.get('/:status?/:uuid?/:search?/:page?/:limit?', (req, res) => {
    if (req.query.uuid !== undefined && !validate(req.query.uuid)) {
        return res.status(500).json({
            message: 'Categories cannot be returned. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    Category.getCategories(req.query.status, req.query.uuid, req.query.search, req.query.page, req.query.limit, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: 'Categories cannot be returned. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.status(200).json({
                categories: rows
            });
        }
    });
});

router.post('/', (req, res) => {
    const newUuid = uuidv1();

    Category.postCategory(req.body, newUuid, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Category cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.status(200).json({
                message: 'Category successfully registered',
                uuid: `${newUuid}`
            });
        }
    });
});

router.delete('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'Categories cannot be deleted. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    Category.deleteCategory(req.params.uuid, (err, count) => {
        if (err) {
            res.status(500).json({
                message: 'Category cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows === 0) {
            res.status(500).json({
                message: 'Category cannot be remove. Check details message for more info',
                details: `Category ${req.params.uuid} not found`
            });
        } else {
            res.status(200).json({
                message: 'Category successfully removed',
                details: `Affected rows ${count.affectedRows}`
            });
        }
    });
});

router.put('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'Categories cannot be updated. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    Category.putCategory(req.params.uuid, req.body, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: 'Category cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.status(200).json({
                message: 'Category successfully updated',
                details: rows
            });
        }
    });
});

module.exports = router;
