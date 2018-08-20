const db = require('../../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Category = {

    getCategories(status = 1, uuid, search, page = 1, limit = 10, callback) {
        const statusWhere = `category.status='${status}'`;
        
        let uuidWhere;
        if (uuid === undefined) {
            uuidWhere = '';
        } else {
            uuidWhere = `category.uuid='${uuid}'`;
        }

        let searchWhere;
        if (search === undefined) {
            searchWhere = '';
        } else {
            searchWhere = `category.title LIKE '%${search}%'`;
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

        const query = `SELECT * FROM category ${whereClause} LIMIT ${validLimit} OFFSET ${currentPage}`;

        return db.query(query, callback);
    },

    postCategory(Body, Uuid, callback) {
        const sql = 'INSERT INTO `category` (`uuid`, `status`, `title`, `url_image`) VALUES ?';

        const values = [
            [Uuid, Body.status, Body.title, Body.url_image]
        ];

        return db.query(sql, [values], callback);
    },

    putCategory(Uuid, Body, callback) {
        const sql = 'UPDATE category SET status=?, title=?, url_image=? where uuid=?';

        const values = [Body.status, Body.title, Body.url_image, Uuid];

        return db.query(sql, values, callback);
    },

    deleteCategory(Uuid, callback) {
        const sql = 'DELETE FROM category WHERE uuid=?';

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Category;
