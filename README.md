# JavaScript PurAí API for Node.js
CRUD operation in Node.js, Express and MySQL that provides an RESTful API.

This project package the following functions:
- [ ] Login
- [x] Events
- [x] Categoies
- [x] Sale Places

 ## Installation
Get via git clone:
```
$ git clone https://github.com/felipemendes/purai-nodejs.git
$ cd purai-nodejs
```

Create a MySQL database and set the config at `db-connect.js`:
```
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'purai_app'
});
```
All tables will be add when server get started.

Get dependencies with the [Node Package Manager](http://npmjs.org/):
```
$ npm install
```

## Usage
Run `npm start` and the application will start at `localhost:3000`. Whoa! That was fast!

To automatically restart the application when file changes use [nodemon](https://github.com/remy/nodemon).

```
$ nodemon
```
![nodemon](/screenshots/nodemon.png "nodemon")

## Documentation
Used [Swagger](https://swagger.io/) framework to document and test.
```
http://localhost:3000/documentation/
```

## Routes

#### GET `http://localhost:3000/events`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Optional | GET filtered by UUID |
| `search` | string | Optional | GET filtered by term in event title, address, city name and sale place |
| `page` | int | Optional |GET filtered by page. By default page is 1 |
| `limit` | int | Optional | GET filtered by limit. By default limit is 10 |
| `upcoming` | string | Optional | GET filtered by upcoming events. By default only events with a date greater than or equal to the current date will be returned. Date format yyyy-MM-dd |
| `category` | string | Optional | GET filtered by category names |
| `saleplace` | string | Optional | GET filtered by sale place names |

#### DELETE `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get deleted |

#### POST `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass event data object in body |

#### PUT `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get changed |
| `body` | object | Yes | Pass event data object in body |

### Event data object example
```json
{
  "status": 1,
  "title": "Sample Event",
  "url_image": "uploads/image.jpg",
  "place": "string",
  "place_phone": "string",
  "date": "2022-01-01 20:00",
  "address": "string",
  "city": "string",
  "id_category": 0,
  "id_sale_place": 0
}
```

### Category data object example
```json
{
  "status": 1,
  "title": "string",
  "url_image": "string"
}
```

### Category data object example
```json
{
  "status": 1,
  "title": "string",
  "phone": "string"
}
```

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details

Created by [Felipe Mendes](https://github.com/felipemendes).
