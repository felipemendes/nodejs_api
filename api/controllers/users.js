require('dotenv').config();

const User = require('../models/User');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('uuid-validate');
const helpers = require('../helpers/PurAiHelpers');

exports.get_users = (req, res) => {
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
};

exports.signup = (req, res) => {
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
        const hash = bcrypt.hashSync(req.body.password, 10);

        User.postUser(req.body, newUuid, hash, (err) => {
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
};

exports.login = (req, res) => {
    if (!helpers.validateEmail(req.body.email)) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }

    User.login(req.body.email, (err, rows) => {
        if (err || rows.length < 1) {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }

        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            const token = jwt.sign({
                    email: rows[0].email,
                    userId: rows[0].uuid
                },
                process.env.JWT_KEY, {
                    /*expiresIn: '1h'*/
                }
            );
            return res.status(200).json({
                message: 'Auth successful',
                token: `Bearer ${token}`
            });
        }

        return res.status(401).json({
            message: 'Authentication failed'
        });
    });
};

exports.delete_user = (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'User cannot be deleted. Check details message for more info',
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
};

exports.update_user = (req, res) => {
    if (!helpers.validateEmail(req.body.email)) {
        return res.status(409).json({
            message: 'Invalid email address'
        });
    }

    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        return res.status(500).json({
            message: 'User cannot be updated. Check details message for more info',
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
};
