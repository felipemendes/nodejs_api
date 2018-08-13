# JavaScript PurAí API for Node.js
CRUD operation in Node.js, Express and MySQL that provides an RESTful API.

This project package the following CRUD functions:
- [ ] Login
- [x] Events
- [x] Categories
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

Get dependencies with [Yarn](https://github.com/yarnpkg/yarn):
```
$ yarn
```

Or with [NPM](http://npmjs.org/):
```
$ npm install
```

## Usage
To automatically restart the application when files get changed run with [nodemon](https://github.com/remy/nodemon).
And the application will start at `localhost:3000`.

```
$ nodemon
```
![nodemon](/screenshots/nodemon.png "nodemon")

## Documentation
Used [Swagger](https://swagger.io/) framework to document and test.
```
http://localhost:3000/documentation/
```

## Event Routes

#### GET `http://localhost:3000/events`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Optional | GET filtered by UUID. (e.g.: 955b9575-e542-461c-939a-5ef41e733859) |
| `search` | string | Optional | GET filtered by term in event title, place, address and city |
| `page` | int | Optional |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | Optional | GET filtered by limit informed. (Default value is 10) |
| `upcoming` | string | Optional | GET filtered by upcoming events. By default only events with a date greater than or equal to the current date will be returned. Date format yyyy-MM-dd |
| `category` | string | Optional | GET filtered by terms in category name |
| `saleplace` | string | Optional | GET filtered by terms in sale places name |

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

## Data object example

#### Event
```json
{
  "status": 1,
  "title": "string",
  "url_image": "uploads/image.jpg",
  "place": "string",
  "place_phone": "string",
  "date": "2022-01-01 20:00",
  "address": "string",
  "city": "string",
  "id_category": 1,
  "id_sale_place": 1
}
```

#### Category
```json
{
  "status": 1,
  "title": "string",
  "url_image": "uploads/image.jpg"
}
```

#### Sale Place
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
