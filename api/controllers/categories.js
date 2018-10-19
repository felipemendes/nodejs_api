const Category = require('../models/Category');
const uuidv1 = require('uuid/v1');
const validate = require('uuid-validate');

exports.get_categories = (req, res) => {
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
};

exports.create_category = (req, res) => {
    if (req.file === undefined) {
        res.json({
            message: 'Category cannot be register. Check details message for more info',
            details: 'Column \'url_image\' cannot be null'
        });
        return;
    }

    const newUuid = uuidv1();

    Category.postCategory(req.body, req.file, newUuid, (err) => {
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
};

exports.delete_category = (req, res) => {
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
};

exports.update_category = (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'Categories cannot be updated. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    Category.putCategory(req.params.uuid, req.body, req.file, (err, rows) => {
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
};
