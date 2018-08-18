const express = require('express');

const router = express.Router();
const SalePlace = require('../models/SalePlace');
const uuidv1 = require('uuid/v1');
const helpers = require('../helpers/PurAiHelpers');
const validate = require('uuid-validate');

router.get('/:status?/:uuid?/:search?/:page?/:limit?', (req, res) => {
    if (req.query.uuid !== undefined && !validate(req.query.uuid)) {
        res.json({
            message: 'Sale Places cannot be returned. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    SalePlace.getSalePlaces(req.query.status, req.query.uuid, req.query.search, req.query.page, req.query.limit, (err, rows) => {
        if (err) {
            res.json({
                message: 'Sale Places cannot be returned. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                sale_places: rows
            });
        }
    });
});

router.post('/', (req, res) => {
    const newUuid = uuidv1();
    const salePlacePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.phone);

    SalePlace.postSalePlace(req.body, newUuid, salePlacePhoneNumberFormatted, (err) => {
        if (err) {
            res.json({
                message: 'Sale Place cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'Sale Place successfully registered',
                uuid: `${newUuid}`
            });
        }
    });
});

router.delete('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        res.json({
            message: 'Sale Places cannot be deleted. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    SalePlace.deleteSalePlace(req.params.uuid, (err, count) => {
        if (err) {
            res.json({
                message: 'Sale Place cannot be remove. Check details message for more info',
                details: err
            });
        } else if (count.affectedRows === 0) {
            res.json({
                message: 'Sale Place cannot be remove. Check details message for more info',
                details: `Sale Place ${req.params.uuid} not found`
            });
        } else {
            res.json({
                message: 'Sale Place successfully removed',
                details: `Affected rows ${count.affectedRows}`
            });
        }
    });
});

router.put('/:uuid', (req, res) => {
    if (req.params.uuid !== undefined && !validate(req.params.uuid)) {
        res.json({
            message: 'Sale Places cannot be updated. Check details message for more info',
            details: 'UUID format is invalid'
        });
        return;
    }

    const salePlacePhoneNumberFormatted = helpers.formatPhoneNumber(req.body.phone);

    SalePlace.putSalePlace(req.params.uuid, salePlacePhoneNumberFormatted, req.body, (err, rows) => {
        if (err) {
            res.json({
                message: 'Sale Places cannot be register. Check details message for more info',
                details: err.sqlMessage
            });
        } else {
            res.json({
                message: 'Sale Places successfully updated',
                details: rows
            });
        }
    });
});

module.exports = router;
