const db = require('../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Event = {

    getEvents: function (upcoming, status = 1, uuid, search, page = 1, limit = 10, callback) {

        var upcomingFilter = upcoming != undefined ? upcoming : new Date().toJSON().slice(0, 10);
        var statusWhere = "status='" + status + "'";
        var uuidWhere = uuid == undefined ? "" : uuidWhere = "uuid='" + uuid + "'";
        var searchWhere = search == undefined ? "" : searchWhere = "title LIKE '%" + search + "%' or place LIKE '%" + search + "%' or address LIKE '%" + search + "%' or city LIKE '%" + search + "%' or sale_place LIKE '%" + search + "%'";
        
        const valuesForWhere = new Array(uuidWhere, searchWhere, statusWhere).filter(item => item != "");
        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page != 0 ? page : 1;
        const validLimit = limit != 0 ? limit : 10;
        const currentPage = (validPage - 1) * validLimit;

        const query = "SELECT *, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at, DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updated_at, DATE_FORMAT(date, '%d/%m/%Y %H:%i') as date FROM events" + whereClause + " AND date >= '"+ upcomingFilter +"' ORDER BY date LIMIT " + validLimit + " OFFSET " + currentPage + "";
        return db.query(query, callback);
    },

    postEvent: function (Event, Uuid, PlacePhoneNumber, SalePlacePhoneNumber, callback) {

        const sql = "INSERT INTO `events` (`uuid`, `status`, `created_at`, `title`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`) VALUES ?";

        const values = [
            [Uuid, Event.status, new Date(), Event.title, Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber]
        ];

        return db.query(sql, [values], callback);
    },

    putEvent: function (Uuid, PlacePhoneNumber, SalePlacePhoneNumber, Event, callback) {

        const sql = "UPDATE events SET status=?, updated_at=?, title=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, sale_place=?, sale_place_phone=? where uuid=?";

        const values = [Event.status, new Date(), Event.title, Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Uuid];

        return db.query(sql, values, callback);
    },

    deleteEvent: function (Uuid, callback) {

        const sql = "DELETE FROM events WHERE uuid=?";

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Event;