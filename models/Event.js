const db = require('../db-connect');
const helpers = require('../helpers/PurAiHelpers');

const Event = {

    getEvents: function (status = 1, uuid, search, page = 1, quantity = 10, callback) {

        var statusWhere = "status='" + status + "'";
        var uuidWhere = uuid == undefined ? "" : uuidWhere = "uuid='" + uuid + "'";
        var searchWhere = search == undefined ? "" : searchWhere = "place LIKE '%" + search + "%' or address LIKE '%" + search + "%' or city LIKE '%" + search + "%' or sale_place LIKE '%" + search + "%'";
        
        const valuesForWhere = new Array(uuidWhere, searchWhere, statusWhere).filter(item => item != "");
        const whereClause = helpers.buildSqlWhereClause(valuesForWhere);

        const validPage = page != 0 ? page : 1;
        const validQuantity = quantity != 0 ? quantity : 10;
        const currentPage = (validPage - 1) * validQuantity;

        const query = "SELECT * FROM events" + whereClause + " ORDER BY date LIMIT " + validQuantity + " OFFSET " + currentPage + "";
        return db.query(query, callback);
    },

    postEvent: function (Event, Uuid, PlacePhoneNumber, SalePlacePhoneNumber, callback) {

        const sql = "INSERT INTO `events` (`uuid`, `status`, `user_email`, `created_at`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`) VALUES ?";

        const values = [
            [Uuid, Event.status, Event.user_email, new Date(), Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber]
        ];

        return db.query(sql, [values], callback);
    },

    putEvent: function (Uuid, PlacePhoneNumber, SalePlacePhoneNumber, Event, callback) {

        const sql = "UPDATE events SET status=?, user_email=?, updated_at=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, sale_place=?, sale_place_phone=? where uuid=?";

        const values = [Event.status, Event.user_email, new Date(), Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Uuid];

        return db.query(sql, values, callback);
    },

    deleteEvent: function (Uuid, callback) {

        const sql = "DELETE FROM events WHERE uuid=?";

        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Event;