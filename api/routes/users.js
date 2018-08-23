const express = require('express');

const router = express.Router();
const User = require('../models/User');
const uuidv1 = require('uuid/v1');
const validate = require('uuid-validate');
const helpers = require('../helpers/PurAiHelpers');

router.get('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'User cannot be returned. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    User.getUser(req.params.uuid, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: 'User cannot be returned. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.status(200).json({
                user: rows
            });
        }
    });
});

router.post('/', (req, res) => {
    if (!helpers.validateEmail(req.body.email)) {
        return res.status(500).json({
            message: 'Invalid email address'
        });
    }

    User.checkEmailExists(req.body.email, '', (errEmail, rowsEmail) => {
        if (rowsEmail && rowsEmail.length) {
            return res.status(409).json({
                message: 'E-mail address already registered'
            });
        }

        const newUuid = uuidv1();
        User.postUser(req.body, newUuid, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'User cannot be register. Check details message for more info',
                    details: err.sqlMessage
                });
            } else {
                res.status(200).json({
                    message: 'User successfully registered',
                    uuid: `${newUuid}`
                });
            }
            return;
        });
    });
});

router.delete('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'Users cannot be deleted. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    User.deleteUser(req.params.uuid, (err, count) => {
        if (err) {
            res.status(500).json({
                message: 'User cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows === 0) {
            res.status(500).json({
                message: 'User cannot be remove. Check details message for more info',
                details: `User ${req.params.uuid} not found`
            });
        } else {
            res.status(200).json({
                message: 'User successfully removed',
                details: `Affected rows ${count.affectedRows}`
            });
        }
    });
});

router.put('/:uuid', (req, res) => {
    if (!helpers.validateEmail(req.body.email)) {
        return res.status(409).json({
            message: 'Invalid email address'
        });
    }

    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'Users cannot be updated. Check details message for more info',
            details: 'UUID format is invalid'
        });
    }

    User.checkEmailExists(req.body.email, req.params.uuid, (errEmail, rowsEmail) => {
        if (rowsEmail && rowsEmail.length) {
            return res.status(500).json({
                message: 'E-mail address already registered'
            });
        }

        User.putUser(req.body, req.params.uuid, (err, rows) => {
            if (err) {
                res.status(500).json({
                    message: 'User cannot be register. Check details message for more info',
                    details: err.sqlMessage
                });
            } else {
                res.status(200).json({
                    message: 'User successfully updated',
                    details: rows
                });
            }
            return;
        });
    });
});

module.exports = router;
