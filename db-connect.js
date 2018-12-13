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

    createUserTable(connection);
    createSalePlaceTable(connection);
    createCategoryTable(connection);
    createEventTable(connection);

    /* uncomment this call method to add sample data */
    // addSampleData(connection);
});

function createUserTable(conn) {
    const sql = 'CREATE TABLE IF NOT EXISTS `user` (\n' +
        '`id` int(10) NOT NULL AUTO_INCREMENT,\n' +
        '`uuid` varchar(36) NOT NULL,\n' +
        '`status` TINYINT(1) NOT NULL,\n' +
        '`name` varchar(255) NOT NULL,\n' +
        '`email` varchar(255) NOT NULL,\n' +
        '`password` varchar(255) NOT NULL,\n' +
        'PRIMARY KEY (`id`)\n' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';

    conn.query(sql, (error) => {
        if (error) return console.log(error);
        console.log('Table created: user');
    });
}

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
        '`category_image` varchar(255) NOT NULL,\n' +
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
        '`image` varchar(255) NOT NULL,\n' +
        '`date` DATETIME NOT NULL,\n' +
        '`address` varchar(255) NOT NULL,\n' +
        '`city` varchar(255) NOT NULL,\n' +
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

function addSampleData(conn) {
    addUserSampleData(connection);
    addSalePlaceSampleData(connection);
    addCategorySampleData(connection);
    addEventSampleData(connection);
}

function addUserSampleData(conn) {
    const sql = 'INSERT INTO `user` (`uuid`, `status`, `name`, `email`, `password`) VALUES ?';

    const values = [
        ['dbfdd3d0-a808-11e8-aa56-a3de1ec713c5', 1, 'admin', 'admin@mail.com', '$2b$10$bbE8Fn5K8PZYrThPnI25JefkHYermyOJq5Xim3ToxAijDR9ngPDSO']
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: user');
    });
}

function addSalePlaceSampleData(conn) {
    const sql = 'INSERT INTO `sale_place` (`uuid`, `status`, `title`, `phone`) VALUES ?';

    const values = [
        ['ffd9d343-585a-40ee-bc58-c1e6935dcbdd', 1, 'Entre em contato para mais detalhes', '']
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: sale_place');
    });
}

function addCategorySampleData(conn) {
    const sql = 'INSERT INTO `category` (`uuid`, `status`, `title`, `category_image`) VALUES ?';

    const values = [
        ['1670d1f8-8d9e-46bb-8a19-b85cdd27e016', 1, 'Festa e Show', 'uploads/categories/sample-category.jpg'],
        ['2ddbd4bd-527a-428b-b640-d3f9318b06b8', 1, 'Curso e Workshop', 'uploads/categories/sample-category.jpg'],
        ['f5c0330f-3975-466f-bd13-69264aafe03a', 1, 'Esportivo', 'uploads/categories/sample-category.jpg'],
        ['4fd37ef8-a1b3-48cb-b22f-9aeb5d23bc19', 1, 'Congresso e Seminário', 'uploads/categories/sample-category.jpg'],
        ['18093681-f35a-4345-bbd6-5880cdffa347', 1, 'Gastronômico', 'uploads/categories/sample-category.jpg'],
        ['68000d0d-20cb-4328-840f-565ac1932e5e', 1, 'Encontro e Networking', 'uploads/categories/sample-category.jpg']
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: category');
    });
}

function addEventSampleData(conn) {
    const sql = 'INSERT INTO `event` (`uuid`, `status`, `created_at`, `updated_at`, `title`, `image`, `date`, `address`, `city`, `id_category`, `id_sale_place`) VALUES ?';

    const values = [
        ['955b9575-e542-461c-939a-5ef41e733859', 1, new Date(), new Date(), 'Sample Event', 'uploads/events/sample-event.jpg', '2022-01-01', 'Apple Campus, Cupertino, CA 95014, EUA', 'Cupertino', 1, 1]
    ];

    conn.query(sql, [values], (error) => {
        if (error) return console.log(error);
        console.log('Sample data added: event');
    });
}

module.exports = connection;
