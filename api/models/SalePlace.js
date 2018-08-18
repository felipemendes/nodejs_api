const db = require('../../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const SalePlace = {

    getSalePlaces(status = 1, uuid, search, page = 1, limit = 10, callback) {
        const statusWhere = `sale_place.status='${status}'`;
        
        let uuidWhere;
        if (uuid === undefined) {
            uuidWhere = '';
        } else {
            uuidWhere = `sale_place.uuid='${uuid}'`;
        }

        let searchWhere;
        if (search === undefined) {
            searchWhere = '';
        } else {
            searchWhere = `sale_place.title LIKE '%${search}%'`;
        }

        const valuesForWhere = Array(
                uuidWhere,
                searchWhere,
                statusWhere
            ).filter(item => item !== '');

        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page !== 0 ? page : 1;
        const validLimit = limit !== 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = `SELECT * FROM sale_place${whereClause} LIMIT ${validLimit} OFFSET ${currentPage}`;

        return db.query(query, callback);
    },

    postSalePlace(Body, Uuid, SalePlacePhoneNumber, callback) {
        const sql = 'INSERT INTO `sale_place` (`uuid`, `status`, `title`, `phone`) VALUES ?';

        const values = [
            [Uuid, Body.status, Body.title, SalePlacePhoneNumber]
        ];

        return db.query(sql, [values], callback);
    },

    putSalePlace(Uuid, SalePlacePhoneNumber, Body, callback) {
        const sql = 'UPDATE sale_place SET status=?, title=?, phone=? where uuid=?';

        const values = [Body.status, Body.title, SalePlacePhoneNumber, Uuid];

        return db.query(sql, values, callback);
    },

    deleteSalePlace(Uuid, callback) {
        const sql = 'DELETE FROM sale_place WHERE uuid=?';

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = SalePlace;
