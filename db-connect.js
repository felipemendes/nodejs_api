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
    //addRow(connection);
});

function createTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS `events` (`id` int(10) NOT NULL AUTO_INCREMENT,\n"+
                    "`uuid` varchar(36) NOT NULL,\n"+
                    "`status` TINYINT(1) NOT NULL,\n"+
                    "`user_email` varchar(255) NOT NULL,\n"+
                    "`created_at` DATETIME NULL,\n"+
                    "`updated_at` DATETIME NULL,\n"+
                    "`url_image` varchar(255) NOT NULL,\n"+
                    "`place` varchar(255) NOT NULL,\n"+
                    "`place_phone` varchar(255) NOT NULL,\n"+
                    "`date` DATETIME NOT NULL,\n"+
                    "`address` varchar(255) NOT NULL,\n"+
                    "`city` varchar(255) NOT NULL,\n"+
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

    const sql = "INSERT INTO `events` (`uuid`, `status`, `user_email`, `created_at`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`) VALUES ?";

    const values = [
        ['955b9575-e542-461c-939a-5ef41e733859', 1, 'api@purai.io', new Date(), 'uploads/welcometocat.png', 'Apple Infinite Loop', `+1 408-961-1560`, '2018-07-25', 'Apple Campus, Cupertino, CA 95014, EUA', `Cupertino`, 'Apple Park Visitor Center', '+1 408-961-1560']
    ];
    
    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Row added');
    });
}

module.exports = connection;