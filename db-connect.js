const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'purai_app'
});

connection.connect(function (err) {

    if (err) return console.log(err);
    console.log('DB connected');

    createCategoryTable(connection);
    createEventTable(connection);

    //addCategorySampleData(connection);
    //addEventSampleData(connection);
});

function createCategoryTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS `category` (\n" +
        "`id` int(10) NOT NULL AUTO_INCREMENT,\n" +
        "`uuid` varchar(36) NOT NULL,\n" +
        "`status` TINYINT(1) NOT NULL,\n" +
        "`title` varchar(255) NOT NULL,\n" +
        "`url_image` varchar(255) NOT NULL,\n" +
        "PRIMARY KEY (`id`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    conn.query(sql, function (error, results, fields) {

        if (error) return console.log(error);
        console.log('Table created: category');
    });
}

function createEventTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS `event` (\n" +
        "`id` int(10) NOT NULL AUTO_INCREMENT,\n" +
        "`uuid` varchar(36) NOT NULL,\n" +
        "`status` TINYINT(1) NOT NULL,\n" +
        "`created_at` DATETIME NULL,\n" +
        "`updated_at` DATETIME NULL,\n" +
        "`title` varchar(255) NOT NULL,\n" +
        "`url_image` varchar(255) NOT NULL,\n" +
        "`place` varchar(255) NOT NULL,\n" +
        "`place_phone` varchar(255) NOT NULL,\n" +
        "`date` DATETIME NOT NULL,\n" +
        "`address` varchar(255) NOT NULL,\n" +
        "`city` varchar(255) NOT NULL,\n" +
        "`sale_place` varchar(255) DEFAULT NULL,\n" +
        "`sale_place_phone` varchar(255) DEFAULT NULL,\n" +
        "`id_category` int(11) DEFAULT NULL,\n" +
        "PRIMARY KEY (`id`),\n" +
        "KEY `id_category` (`id_category`),\n" +
        "CONSTRAINT `event_fk` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    conn.query(sql, function (error, results, fields) {

        if (error) return console.log(error);
        console.log('Table created: event');
    });
}

function addCategorySampleData(conn) {

    const sql = "INSERT INTO `category` (`uuid`, `status`, `title`, `url_image`) VALUES ?";

    const values = [
        ['677bab32-8686-4201-a84c-390c0136f948', 1, 'Sample Category', 'uploads/samplecategory.png']
    ];

    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Sample data added: category');
    });
}

function addEventSampleData(conn) {

    const sql = "INSERT INTO `event` (`uuid`, `status`, `created_at`, `title`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`, `id_category`) VALUES ?";

    const values = [
        ['955b9575-e542-461c-939a-5ef41e733859', 1, new Date(), 'Sample Event', 'uploads/sampleevent.png', 'Apple Infinite Loop', `+1 408-961-1560`, '2022-01-01', 'Apple Campus, Cupertino, CA 95014, EUA', `Cupertino`, 'Apple Park Visitor Center', '+1 408-961-1560', 1]
    ];

    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Sample data added: event');
    });
}

module.exports = connection;