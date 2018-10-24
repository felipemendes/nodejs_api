const db = require('../../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const User = {

    getUser(status = 1, uuid, callback) {
        const statusWhere = `user.status='${status}'`;

        let uuidWhere;
        if (uuid === undefined) {
            uuidWhere = '';
        } else {
            uuidWhere = `user.uuid='${uuid}'`;
        }

        const valuesForWhere = Array(
            uuidWhere,
            statusWhere
        ).filter(item => item !== '');

        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);
        const query = `SELECT user.uuid, user.status, user.name, user.email FROM user ${whereClause}`;
        
        return db.query(query, callback);
    },

    login(email, callback) {
        const query = 'SELECT * FROM user WHERE user.email=?';
        const values = [email];
        return db.query(query, values, callback);
    },

    postUser(Body, Uuid, Hash, callback) {
        const sql = 'INSERT INTO `user` (`uuid`, `status`, `name`, `email`, `password`) VALUES ?';

        const values = [
            [Uuid, Body.status, Body.name, Body.email, Hash]
        ];

        return db.query(sql, [values], callback);
    },

    checkEmailExists(email, uuid, callback) {
        let query = 'SELECT * FROM user WHERE user.email=?';
        if (uuid) {
            query += ' AND user.uuid <>?';
        }
        const values = [email, uuid];
        console.log(query);
        return db.query(query, values, callback);
    },

    putUser(Body, Uuid, callback) {
        const sql = 'UPDATE user SET status=?, name=?, email=?, password=? where uuid=?';

        const values = [Body.status, Body.name, Body.email, Body.password, Uuid];

        return db.query(sql, values, callback);
    },

    deleteUser(Uuid, callback) {
        const sql = 'DELETE FROM user WHERE uuid=?';

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = User;
