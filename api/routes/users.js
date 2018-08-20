const express = require('express');

const router = express.Router();
const User = require('../models/User');
const uuidv1 = require('uuid/v1');
const validate = require('uuid-validate');

router.get('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        res.json({
            message: 'User cannot be returned. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    User.getUser(req.params.uuid, (err, rows) => {
        if (err) {
            res.json({
                message: 'User cannot be returned. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                user: rows
            });
        }
    });
});

router.post('/', (req, res) => {
    const newUuid = uuidv1();

    User.postUser(req.body, newUuid, (err) => {
        if (err) {
            res.json({
                message: 'User cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'User successfully registered',
                uuid: `${newUuid}`
            });
        }
    });
});

router.delete('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        res.json({
            message: 'Users cannot be deleted. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    User.deleteUser(req.params.uuid, (err, count) => {
        if (err) {
            res.json({
                message: 'User cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows === 0) {
            res.json({
                message: 'User cannot be remove. Check details message for more info',
                details: `User ${req.params.uuid} not found`
            });
        } else {
            res.json({
                message: 'User successfully removed',
                details: `Affected rows ${count.affectedRows}`
            });
        }
    });
});

router.put('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        res.json({
            message: 'Users cannot be updated. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    User.putUser(req.body, req.params.uuid, (err, rows) => {
        if (err) {
            res.json({
                message: 'User cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'User successfully updated',
                details: rows
            });
        }
    });
});

module.exports = router;
