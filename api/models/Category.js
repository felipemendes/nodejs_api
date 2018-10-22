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

        let query = `SELECT * FROM category ${whereClause}`;

        if (limit != 0) {
            const validPage = page !== 0 ? page : 1;
            const currentPage = (validPage - 1) * limit;
            query += ` LIMIT ${limit} OFFSET ${currentPage}`;
        }
        
        return db.query(query, callback);
    },

    postCategory(Body, File, Uuid, callback) {
        const sql = 'INSERT INTO `category` (`uuid`, `status`, `title`, `url_image`) VALUES ?';

        const values = [
            [Uuid, Body.status, Body.title, File.path]
        ];

        return db.query(sql, [values], callback);
    },

    putCategory(Uuid, Body, File, callback) {
        let sql = '';
        let values = '';

        if (File !== undefined) {
            sql += 'UPDATE category SET status=?, title=?, url_image=? where uuid=?';
            values = [Body.status, Body.title, File.path, Uuid];
        } else {
            sql += 'UPDATE category SET status=?, title=? where uuid=?';
            values = [Body.status, Body.title, Uuid];
        }

        return db.query(sql, values, callback);
    },

    deleteCategory(Uuid, callback) {
        const sql = 'DELETE FROM category WHERE uuid=?';

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Category;
