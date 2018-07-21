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
    
    createTable(connection);
    addRow(connection);
});

function createTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS `events` (`id` int(10) NOT NULL AUTO_INCREMENT,\n"+
                    "`uuid` varchar(36) NOT NULL,\n"+
                    "`user_login` varchar(255) NOT NULL,\n"+
                    "`update_time` varchar(255) NOT NULL,\n"+
                    "`url_image` varchar(255) NOT NULL,\n"+
                    "`place` varchar(255) NOT NULL,\n"+
                    "`date` varchar(255) NOT NULL,\n"+
                    "`address` varchar(255) DEFAULT NULL,\n"+
                    "`sale_place` varchar(255) DEFAULT NULL,\n"+
                    "`sale_place_phone` varchar(255) DEFAULT NULL,\n"+
                    "PRIMARY KEY (`id`)\n"+
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    conn.query(sql, function (error, results, fields) {

        if (error) return console.log(error);
        console.log('Table created');
    });
}

function addRow(conn) {

    const sql = "INSERT INTO `events` (`uuid`, `user_login`, `update_time`, `url_image`, `place`, `date`, `address`, `sale_place`, `sale_place_phone`) VALUES ?";

    const values = [
        ['955b9575-e542-461c-939a-5ef41e733859', 'api@purai.io', '2018-07-20', 'uploads/welcometocat.png', 'Apple Infinite Loop', '25/07/2018', 'Apple Campus, Cupertino, CA 95014, EUA', 'Apple Park Visitor Center', '+1 408-961-1560']
    ];
    
    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Row added');
    });
}

module.exports = connection;