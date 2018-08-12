const db = require('../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const SalePlace = {

    getSalePlaces: function (status = 1, uuid, search, page = 1, limit = 10, callback) {

        var statusWhere = "sale_place.status='" + status + "'";
        var uuidWhere = uuid == undefined ? "" : uuidWhere = "sale_place.uuid='" + uuid + "'";
        var searchWhere = search == undefined ? "" : searchWhere = "sale_place.title LIKE '%" + search + "%'";

        const valuesForWhere = new Array(uuidWhere, searchWhere, statusWhere).filter(item => item != "");
        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page != 0 ? page : 1;
        const validLimit = limit != 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = "SELECT * FROM sale_place" + whereClause + " LIMIT " + validLimit + " OFFSET " + currentPage;

        return db.query(query, callback);
    },

    postSalePlace: function (SalePlace, Uuid, SalePlacePhoneNumber, callback) {

        const sql = "INSERT INTO `sale_place` (`uuid`, `status`, `title`, `phone`) VALUES ?";

        const values = [
            [Uuid, SalePlace.status, SalePlace.title, SalePlacePhoneNumber]
        ];

        return db.query(sql, [values], callback);
    },

    putSalePlace: function (Uuid, SalePlacePhoneNumber, SalePlace, callback) {

        const sql = "UPDATE sale_place SET status=?, title=?, phone=? where uuid=?";

        const values = [SalePlace.status, SalePlace.title, SalePlacePhoneNumber, Uuid];

        return db.query(sql, values, callback);
    },

    deleteSalePlace: function (Uuid, callback) {

        const sql = "DELETE FROM sale_place WHERE uuid=?";

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = SalePlace;