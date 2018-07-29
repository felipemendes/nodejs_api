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

    postEvent: function (Event, File, Uuid, PlacePhoneNumber, SalePlacePhoneNumber, callback) {

        return db.query("INSERT INTO events (uuid, user_email, created_at, url_image, place, place_phone, date, address, city, sale_place, sale_place_phone) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [Uuid, Event.user_email, new Date(), File.path, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber], callback);
    },

    putEvent: function (Uuid, PlacePhoneNumber, SalePlacePhoneNumber, Event, File, callback) {

        return db.query("UPDATE events SET user_email=?, updated_at=?, url_image=?, place=?, place_phone=?, date=?, address=?, city=?, sale_place=?, sale_place_phone=? where uuid=?", [Event.user_email, new Date(), File.path, Event.place, PlacePhoneNumber, Event.date, Event.address, Event.city, Event.sale_place, SalePlacePhoneNumber, Uuid], callback);
    },

    deleteEvent: function (Uuid, callback) {

        return db.query("DELETE FROM events WHERE uuid=?", [Uuid], callback);
    }
};

module.exports = Event;