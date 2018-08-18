const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'purai_app'
});

connection.connect((err) => {
    if (err) return console.log(err);
    console.log('DB connected');

    createSalePlaceTable(connection);
    createCategoryTable(connection);
    createEventTable(connection);

    //addSalePlaceSampleData(connection);
    //addCategorySampleData(connection);
    //addEventSampleData(connection);
});

function createSalePlaceTable(conn) {
    const sql = 'CREATE TABLE IF NOT EXISTS `sale_place` (\n' +
        '`id` int(10) NOT NULL AUTO_INCREMENT,\n' +
        '`uuid` varchar(36) NOT NULL,\n' +
        '`status` TINYINT(1) NOT NULL,\n' +
        '`title` varchar(255) NOT NULL,\n' +
        '`phone` varchar(255) NOT NULL,\n' +
        'PRIMARY KEY (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

    conn.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Table created: sale_place');
    });
}

function createCategoryTable(conn) {
    const sql = 'CREATE TABLE IF NOT EXISTS `category` (\n' +
        '`id` int(10) NOT NULL AUTO_INCREMENT,\n' +
        '`uuid` varchar(36) NOT NULL,\n' +
        '`status` TINYINT(1) NOT NULL,\n' +
        '`title` varchar(255) NOT NULL,\n' +
        '`url_image` varchar(255) NOT NULL,\n' +
        'PRIMARY KEY (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

    conn.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Table created: category');
    });
}

function createEventTable(conn) {
    const sql = 'CREATE TABLE IF NOT EXISTS `event` (\n' +
        '`id` int(10) NOT NULL AUTO_INCREMENT,\n' +
        '`uuid` varchar(36) NOT NULL,\n' +
        '`status` TINYINT(1) NOT NULL,\n' +
        '`created_at` DATETIME NULL,\n' +
        '`updated_at` DATETIME NULL,\n' +
        '`title` varchar(255) NOT NULL,\n' +
        '`url_image` varchar(255) NOT NULL,\n' +
        '`place` varchar(255) NOT NULL,\n' +
        '`place_phone` varchar(255) NOT NULL,\n' +
        '`date` DATETIME NOT NULL,\n' +
        '`address` varchar(255) NOT NULL,\n' +
        '`city` varchar(255) NOT NULL,\n' +
        '`sale_place` varchar(255) DEFAULT NULL,\n' +
        '`sale_place_phone` varchar(255) DEFAULT NULL,\n' +
        '`id_category` int(11) DEFAULT NULL,\n' +
        '`id_sale_place` int(11) DEFAULT NULL,\n' +
        'PRIMARY KEY (`id`),\n' +
        'KEY `id_category` (`id_category`),\n' +
        'KEY `id_sale_place` (`id_sale_place`),\n' +
        'CONSTRAINT `event_category_fk` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`),\n' +
        'CONSTRAINT `event_sale_place_fk` FOREIGN KEY (`id_sale_place`) REFERENCES `sale_place` (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

    conn.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Table created: event');
    });
}

function addSalePlaceSampleData(conn) {
    const sql = 'INSERT INTO `sale_place` (`uuid`, `status`, `title`, `phone`) VALUES ?';

    const values = [
        ['ffd9d343-585a-40ee-bc58-c1e6935dcbdd', 1, 'Apple Infinite Loop', '+1 408-961-1560']
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: sale_place');
    });
}

function addCategorySampleData(conn) {
    const sql = 'INSERT INTO `category` (`uuid`, `status`, `title`, `url_image`) VALUES ?';

    const values = [
        ['1670d1f8-8d9e-46bb-8a19-b85cdd27e016', 1, 'Festa e Show', 'uploads/sample-category.png'],
        ['2ddbd4bd-527a-428b-b640-d3f9318b06b8', 1, 'Curso e Workshop', 'uploads/sample-category.png'],
        ['f5c0330f-3975-466f-bd13-69264aafe03a', 1, 'Esportivo', 'uploads/sample-category.png'],
        ['4fd37ef8-a1b3-48cb-b22f-9aeb5d23bc19', 1, 'Congresso e Seminário', 'uploads/sample-category.png'],
        ['18093681-f35a-4345-bbd6-5880cdffa347', 1, 'Gastronômico', 'uploads/sample-category.png'],
        ['68000d0d-20cb-4328-840f-565ac1932e5e', 1, 'Encontro e Networking', 'uploads/sample-category.png']
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: category');
    });
}

function addEventSampleData(conn) {
    const sql = 'INSERT INTO `event` (`uuid`, `status`, `created_at`, `title`, `url_image`, `place`, `place_phone`, `date`, `address`, `city`, `sale_place`, `sale_place_phone`, `id_category`, `id_sale_place`) VALUES ?';

    const values = [
        ['955b9575-e542-461c-939a-5ef41e733859', 1, new Date(), 'Sample Event', 'uploads/sampleevent.png', 'Apple Infinite Loop', '+1 408-961-1560', '2022-01-01', 'Apple Campus, Cupertino, CA 95014, EUA', 'Cupertino', 'Apple Park Visitor Center', '+1 408-961-1560', 1, 1]
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: event');
    });
}

module.exports = connection;
