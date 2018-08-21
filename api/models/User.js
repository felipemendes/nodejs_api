const db = require('../../db-connect');

const User = {

    getUser(uuid, callback) {
        const query = 'SELECT * FROM user WHERE user.uuid=?';
        const values = [uuid];
        return db.query(query, values, callback);
    },

    postUser(Body, Uuid, callback) {
        const sql = 'INSERT INTO `user` (`uuid`, `status`, `name`, `email`, `password`) VALUES ?';

        const values = [
            [Uuid, Body.status, Body.name, Body.email, Body.password]
        ];

        return db.query(sql, [values], callback);
    },

    checkUserExists(email, callback) {
        const query = 'SELECT * FROM user WHERE user.email=?';
        const values = [email];
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
