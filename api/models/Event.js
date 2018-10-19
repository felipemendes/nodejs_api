const db = require('../../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Event = {

    getEvents(saleplace, category, upcoming, status = 1, uuid, search, page = 1, limit = 10, callback) {
        let salePlaceWhere;
        if (saleplace === undefined) {
            salePlaceWhere = '';
        } else {
            salePlaceWhere = `sale_place.title LIKE '%${saleplace}%'`;
        }

        let categoryWhere;
        if (category === undefined) {
            categoryWhere = '';
        } else {
            categoryWhere = `category.title LIKE '%${category}%'`;
        }

        let upcomingFilter;
        if (upcoming !== undefined) {
            upcomingFilter = upcoming;
        } else {
            upcomingFilter = new Date().toJSON().slice(0, 10);
        }

        const statusWhere = `event.status='${status}'`;

        let uuidWhere;
        if (uuid === undefined) {
            uuidWhere = '';
        } else {
            uuidWhere = `event.uuid='${uuid}'`;
        }

        let searchWhere;
        if (search === undefined) {
            searchWhere = '';
        } else {
            searchWhere = `event.title LIKE '%${search}%' or event.place LIKE '%${search}%' or event.address LIKE '%${search}%' or event.city LIKE '%${search}%'`;
        }

        const valuesForWhere = Array(
                salePlaceWhere,
                categoryWhere,
                uuidWhere,
                searchWhere,
                statusWhere
            ).filter(item => item !== '');

        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page !== 0 ? page : 1;
        const validLimit = limit !== 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = `SELECT * FROM event INNER JOIN category ON event.id_category=category.id INNER JOIN sale_place ON event.id_sale_place=sale_place.id ${whereClause} AND date >= '${upcomingFilter}' ORDER BY date LIMIT ${validLimit} OFFSET ${currentPage}`;

        const options = {
            sql: query,
            nestTables: true
        };
        return db.query(options, callback);
    },

    postEvent(Body, File, Uuid, PlacePhoneNumber, callback) {
        const sql = 'INSERT INTO `event` (`uuid`, `status`, `created_at`, `title`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `id_category`, `id_sale_place`) VALUES ?';

        const values = [
            [Uuid, Body.status, new Date(), Body.title, File.path, Body.place, PlacePhoneNumber, Body.date, Body.address, Body.city, Body.id_category, Body.id_sale_place]
        ];

        return db.query(sql, [values], callback);
    },

    putEvent(Uuid, PlacePhoneNumber, Body, File, callback) {
        const sql = 'UPDATE event SET status=?, updated_at=?, title=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, id_category=?, id_sale_place=? where uuid=?';

        const values = [Body.status, new Date(), Body.title, File.path, Body.place, PlacePhoneNumber, Body.date, Body.address, Body.city, Body.id_category, Body.id_sale_place, Uuid];

        return db.query(sql, values, callback);
    },

    deleteEvent(Uuid, callback) {
        const sql = 'DELETE FROM event WHERE uuid=?';

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Event;
