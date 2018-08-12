const db = require('../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Event = {

    getEvents: function (category, upcoming, status = 1, uuid, search, page = 1, limit = 10, callback) {

        var categoryWhere = category == undefined ? "" : categoryWhere = "category.title='" + category + "'";
        var upcomingFilter = upcoming != undefined ? upcoming : new Date().toJSON().slice(0, 10);
        var statusWhere = "event.status='" + status + "'";
        var uuidWhere = uuid == undefined ? "" : uuidWhere = "event.uuid='" + uuid + "'";
        var searchWhere = search == undefined ? "" : searchWhere = "event.title LIKE '%" + search + "%' or event.place LIKE '%" + search + "%' or event.address LIKE '%" + search + "%' or event.city LIKE '%" + search + "%' or event.sale_place LIKE '%" + search + "%'";

        const valuesForWhere = new Array(categoryWhere, uuidWhere, searchWhere, statusWhere).filter(item => item != "");
        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page != 0 ? page : 1;
        const validLimit = limit != 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = "SELECT * FROM event INNER JOIN category ON event.id_category=category.id" + whereClause + " AND date >= '" + upcomingFilter + "' ORDER BY date LIMIT " + validLimit + " OFFSET " + currentPage + "";
        
        //return db.query(query, callback);
        //return db.query(sqlString, function (err, rows) {});
        var options = { sql: query, nestTables: true };
        return db.query(options, callback);
    },

    postEvent: function (Event, Uuid, PlacePhoneNumber, SalePlacePhoneNumber, callback) {

        const sql = "INSERT INTO `event` (`uuid`, `status`, `created_at`, `title`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`, `id_category`) VALUES ?";

        const values = [
            [Uuid, Event.status, new Date(), Event.title, Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Event.id_category]
        ];

        return db.query(sql, [values], callback);
    },

    putEvent: function (Uuid, PlacePhoneNumber, SalePlacePhoneNumber, Event, callback) {

        const sql = "UPDATE events SET status=?, updated_at=?, title=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, sale_place=?, sale_place_phone=?, id_category=? where uuid=?";

        const values = [Event.status, new Date(), Event.title, Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Event.id_category, Uuid];

        return db.query(sql, values, callback);
    },

    deleteEvent: function (Uuid, callback) {

        const sql = "DELETE FROM events WHERE uuid=?";

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Event;