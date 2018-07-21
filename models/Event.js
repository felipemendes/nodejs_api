const db = require('../db-connect');

const Event = {

    getAllEvents: function (callback) {

        return db.query("SELECT * FROM events", callback);
    },

    getEventById: function (id, callback) {

        return db.query("SELECT * FROM events WHERE id=?", [id], callback);
    },

    addEvent: function (Event, File, callback) {

        return db.query("INSERT INTO events (uuid, user_login, update_time, url_image, place, date, address, sale_place, sale_place_phone) VALUES (?,?,?,?,?,?,?,?,?)", [Event.uuid, Event.user_login, Event.update_time, File.path, Event.place, Event.date, Event.address, Event.sale_place, Event.sale_place_phone], callback);
    },

    deleteEvent: function (id, callback) {

        return db.query("DELETE FROM events WHERE id=?", [id], callback);
    },

    updateEvent: function (id, Event, File, callback) {
        return db.query("UPDATE events SET user_login=?, update_time=?, url_image=?, place=?, date=?, address=?, sale_place=?, sale_place_phone=? where Id=?", [Event.user_login, Event.update_time, File.path, Event.place, Event.date, Event.address, Event.sale_place, Event.sale_place_phone, id], callback);
    },

    deleteAll: function (item, callback) {

        var delete_array = [];
        for (i = 0; i < item.length; i++) {

            delete_array[i] = item[i].Id;
        }

        return db.query("DELETE FROM events WHERE id in (?)", [delete_array], callback);
    }
};

module.exports = Event;