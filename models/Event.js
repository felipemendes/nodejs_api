const db = require('../db-connect');

const Event = {

    getEvents: function (uuid, search, page = 1, quantity = 10, callback) {

        var query = "SELECT * FROM events ";

        const validPage = page != 0 ? page : 1;
        const validQuantity = quantity != 0 ? quantity : 10;
        const currentPage = (validPage - 1) * validQuantity;
        const eventByUuid = uuid == undefined ? "" : " uuid='" + uuid + "'";
        const eventBySearch = search == undefined ? "" : " place LIKE '%" + search + "%' or address LIKE '%" + search + "%' or city LIKE '%" + search + "%' or sale_place LIKE '%" + search + "%'";

        var whereClause = "";
        if (eventByUuid != "" && eventBySearch != "") whereClause = "WHERE" + eventByUuid + " AND" + eventBySearch;
        if (eventByUuid != "" && eventBySearch == "") whereClause = "WHERE" + eventByUuid;
        if (eventByUuid == "" && eventBySearch != "") whereClause = "WHERE" + eventBySearch;

        query += whereClause + " LIMIT " + validQuantity + " OFFSET " + currentPage + "";
        return db.query(query, callback);
    },

    postEvent: function (Event, Uuid, PlacePhoneNumber, dateFormatted, SalePlacePhoneNumber, callback) {

        const sql = "INSERT INTO `events` (`uuid`, `user_email`, `created_at`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`) VALUES ?";

        const values = [
            [Uuid, Event.user_email, new Date(), Event.url_image, Event.place, PlacePhoneNumber, dateFormatted, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber]
        ];
        
        return db.query(sql, [values], callback);
    },

    putEvent: function (Uuid, PlacePhoneNumber, SalePlacePhoneNumber, Event, callback) {
        
        const sql = "UPDATE events SET user_email=?, updated_at=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, sale_place=?, sale_place_phone=? where uuid=?";

        const values = [Event.user_email, new Date(), Event.url_image, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Uuid];

        return db.query(sql, values, callback);
    },

    deleteEvent: function (Uuid, callback) {

        const sql = "DELETE FROM events WHERE uuid=?";
        
        return db.query(sql, [Uuid], callback);
    }
};

module.exports = Event;