const db = require('../db-connect');

const Event = {

    getEvents: function (id, search, page = 1, quantity = 10, callback) {

        var query = "SELECT * FROM events ";

        const validPage = page != 0 ? page : 1;
        const validQuantity = quantity != 0 ? quantity : 10;
        const currentPage = (validPage - 1) * validQuantity;
        const eventById = id == undefined ? "" : " id=" + id;
        const eventBySearch = search == undefined ? "" : " place LIKE '%" + search + "%' ";

        var whereClause = "";
        if (eventById != "" && eventBySearch != "") whereClause = "WHERE" + eventById + " AND" + eventBySearch;
        if (eventById != "" && eventBySearch == "") whereClause = "WHERE" + eventById;
        if (eventById == "" && eventBySearch != "") whereClause = "WHERE" + eventBySearch;

        query += whereClause + " LIMIT " + validQuantity + " OFFSET " + currentPage + "";
        return db.query(query, callback);
    },

    addEvent: function (Event, File, Uuid, callback) {

        return db.query("INSERT INTO events (uuid, user_login, update_time, url_image, place, date, address, sale_place, sale_place_phone) VALUES (?,?,?,?,?,?,?,?,?)", [Uuid, Event.user_login, new Date().toLocaleString(), File.path, Event.place, Event.date, Event.address, Event.sale_place, Event.sale_place_phone], callback);
    },

    deleteEvent: function (id, callback) {

        return db.query("DELETE FROM events WHERE id=?", [id], callback);
    },

    updateEvent: function (id, Event, File, callback) {

        return db.query("UPDATE events SET user_login=?, update_time=?, url_image=?, place=?, date=?, address=?, sale_place=?, sale_place_phone=? where Id=?", [Event.user_login, new Date().toLocaleString(), File.path, Event.place, Event.date, Event.address, Event.sale_place, Event.sale_place_phone, id], callback);
    },
};

module.exports = Event;