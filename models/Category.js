const db = require('../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Category = {

    getCategories: function (status = 1, uuid, search, page = 1, limit = 10, callback) {

        var statusWhere = "category.status='" + status + "'";
        var uuidWhere = uuid == undefined ? "" : uuidWhere = "category.uuid='" + uuid + "'";
        var searchWhere = search == undefined ? "" : searchWhere = "category.title LIKE '%" + search + "%'";

        const valuesForWhere = new Array(uuidWhere, searchWhere, statusWhere).filter(item => item != "");
        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page != 0 ? page : 1;
        const validLimit = limit != 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = "SELECT * FROM category" + whereClause + " LIMIT " + validLimit + " OFFSET " + currentPage;

        return db.query(query, callback);
    },

    postCategory: function (Category, Uuid, callback) {

        const sql = "INSERT INTO `category` (`uuid`, `status`, `title`, `url_image`) VALUES ?";

        const values = [
            [Uuid, Category.status, Category.title, Category.url_image]
        ];

        return db.query(sql, [values], callback);
    },

    putCategory: function (Uuid, Category, callback) {

        const sql = "UPDATE category SET status=?, title=?, url_image=? where uuid=?";

        const values = [Category.status, Category.title, Category.url_image, Uuid];

        return db.query(sql, values, callback);
    },

    deleteCategory: function (Uuid, callback) {

        const sql = "DELETE FROM category WHERE uuid=?";

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Category;