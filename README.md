# JavaScript PurAí API for Node.js
Module in Node.js, Express and MySQL that provides an RESTful API. Made with MVC pattern. Support for authorization and authentication with [JWT](https://tools.ietf.org/html/rfc7519) tokens.

This project package the following functions:
- [x] Events
- [x] Categories
- [x] Sale Places
- [x] User
- [x] Login

## Installation
Get via git clone:
```
$ git clone https://github.com/felipemendes/purai-nodejs.git
$ cd purai-nodejs
```

Create a MySQL database and set the config at `db-connect.js`:
```javascript
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
Run with `yarn start` or `npm start`.

The application will automatically restart when files get changed due [nodemon](https://github.com/remy/nodemon).

![nodemon](/screenshots/nodemon.png "nodemon")

And the application will start at `http://localhost:3000`.

## Documentation
Used [Swagger](https://swagger.io/) framework to document and test.
```
http://localhost:3000/documentation/
```

## Login Endpoints

To use login JWT tokens rename file `.env-sample` to `.env` and define a new key.

#### POST `http://localhost:3000/login`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass login data object in body |

#### Login data object example
```json
{
    "email": "string",
    "password": "string"
}
```

## User Endpoints

#### GET `http://localhost:3000/user`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | GET filtered by UUID. (e.g.: dbfdd3d0-a808-11e8-aa56-a3de1ec713c5) |

#### DELETE `http://localhost:3000/user/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | User UUID to get deleted |

#### POST `http://localhost:3000/user/signup`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass user data object in body |

#### PUT `http://localhost:3000/user/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | User UUID to get changed |
| `body` | object | Yes | Pass user data object in body |

#### User data object example
```json
{
    "status": 1,
    "name": "string",
    "email": "string@mail.com",
    "password": "string"
}
```

## Events Endpoints

#### GET `http://localhost:3000/events`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `status` | int | Optional | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | Optional | GET filtered by UUID. (e.g.: 955b9575-e542-461c-939a-5ef41e733859) |
| `search` | string | Optional | GET filtered by term in event title, place, address and city |
| `page` | int | Optional |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | Optional | GET filtered by limit informed. (Default value is 10) |
| `upcoming` | string | Optional | GET filtered by upcoming events. By default only events with a date greater than or equal to the current date will be returned. Date format yyyy-MM-dd |
| `category` | string | Optional | GET filtered by terms in category name |
| `saleplace` | string | Optional | GET filtered by terms in sale places name |

#### DELETE `http://localhost:3000/events/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get deleted |

#### POST `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass event data object in body |

#### PUT `http://localhost:3000/events/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get changed |
| `body` | object | Yes | Pass event data object in body |

#### Event data object example
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

## Categories Endpoints

#### GET `http://localhost:3000/categories`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `status` | int | Optional | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | Optional | GET filtered by UUID. (e.g.: 1670d1f8-8d9e-46bb-8a19-b85cdd27e016) |
| `search` | string | Optional | GET filtered by term in category title |
| `page` | int | Optional |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | Optional | GET filtered by limit informed. (Default value is 10) |

#### DELETE `http://localhost:3000/categories/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Category's UUID to get deleted |

#### POST `http://localhost:3000/categories`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass category data object in body |

#### PUT `http://localhost:3000/categories/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Category's UUID to get changed |
| `body` | object | Yes | Pass category data object in body |

#### Category data object example
```json
{
    "status": 1,
    "title": "string",
    "url_image": "uploads/image.jpg"
}
```

## Sale Places Endpoints

#### GET `http://localhost:3000/salePlaces`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `status` | int | Optional | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | Optional | GET filtered by UUID. (e.g.: ffd9d343-585a-40ee-bc58-c1e6935dcbdd) |
| `search` | string | Optional | GET filtered by term in sale place title |
| `page` | int | Optional |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | Optional | GET filtered by limit informed. (Default value is 10) |

#### DELETE `http://localhost:3000/salePlaces/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Sale Places' UUID to get deleted |

#### POST `http://localhost:3000/salePlaces`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass sale place data object in body |

#### PUT `http://localhost:3000/salePlaces/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Sale Places' UUID to get changed |
| `body` | object | Yes | Pass sale place data object in body |

#### Sale Place data object example
```json
{
    "status": 1,
    "title": "string",
    "phone": "string"
}
```

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details

Made with :heart: by [Felipe Mendes](https://github.com/felipemendes).
