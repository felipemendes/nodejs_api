
![Wercker](https://img.shields.io/wercker/ci/wercker/go-wercker-api.svg)
![AUR](https://img.shields.io/aur/license/yaourt.svg) 
![GitHub last commit](https://img.shields.io/github/last-commit/felipemendes/purai_nodejs.svg)
![GitHub contributors](https://img.shields.io/github/contributors/felipemendes/purai_nodejs.svg)

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
$ git clone https://github.com/felipemendes/purai_nodejs.git
$ cd purai_nodejs
```

Create a MySQL database without any tables. Then just set the database config at `db-connect.js` file:
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'purai_app'
});
```
All tables will be add when server get started. You can, optionally, uncomment this call method at `db-connect.js` to add sample data in the tables: `addSampleData(connection)`

Get dependencies with [Yarn](https://github.com/yarnpkg/yarn):
```
$ yarn install
```

## Usage

Start the server with `yarn start`.

The application will automatically restart when files get changed due [nodemon](https://github.com/remy/nodemon).

![server](/screenshots/server.png "server")

And the application will start at `http://localhost:3000`.

## Documentation
Used [Swagger](https://swagger.io/) framework to document and test.
```
http://localhost:3000/documentation/
```

## Getting a Token

Send a `POST` request to `http://localhost:3000/login` with user parameters. 
```json
{
    "email": "string",
    "password": "string"
}
```

To request locked methods set the header key `Authorization` and the token as value.

#### Curl request example with token
```curl
curl -X POST "http://localhost:3000/events" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BzdHJpbmcuY29tIiwidXNlcklkIjoiZDViNzJjMDAiLCJpYXQiOjE1MzUyMjcwNTh9.OcIZ0EMDale9Ry5PvDYQAKtup1znaQc2Iti1iBPaBlE"
```

## Login Endpoints

#### POST `http://localhost:3000/login`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | :white_check_mark: | Pass login data object in body |

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
| `uuid` | string | :white_check_mark: | GET filtered by UUID. (e.g.: dbfdd3d0-a808-11e8-aa56-a3de1ec713c5) |

#### DELETE `http://localhost:3000/user/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | User UUID to get deleted |

#### POST `http://localhost:3000/user/signup`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | :white_check_mark: | Pass user data object in body |

#### PUT `http://localhost:3000/user/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | User UUID to get changed |
| `body` | object | :white_check_mark: | Pass user data object in body |

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
| `status` | int | :x: | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | :x: | GET filtered by UUID. (e.g.: 955b9575-e542-461c-939a-5ef41e733859) |
| `search` | string | :x: | GET filtered by term in event title, place, address and city |
| `page` | int | :x: |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | :x: | GET filtered by limit informed. (Default value is 10) |
| `upcoming` | string | :x: | GET filtered by upcoming events. By default only events with a date greater than or equal to the current date will be returned. Date format yyyy-MM-dd |
| `category` | string | :x: | GET filtered by terms in category name |
| `saleplace` | string | :x: | GET filtered by terms in sale places name |

#### DELETE `http://localhost:3000/events/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Event's UUID to get deleted |

#### POST `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | :white_check_mark: | Pass event data object in body |

#### PUT `http://localhost:3000/events/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Event's UUID to get changed |
| `body` | object | :white_check_mark: | Pass event data object in body |

#### Event data object example
```json
{
    "status": 1,
    "title": "string",
    "url_image": File,
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
| `status` | int | :x: | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | :x: | GET filtered by UUID. (e.g.: 1670d1f8-8d9e-46bb-8a19-b85cdd27e016) |
| `search` | string | :x: | GET filtered by term in category title |
| `page` | int | :x: |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | :x: | GET filtered by limit informed. (Default value is 10) |

#### DELETE `http://localhost:3000/categories/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Category's UUID to get deleted |

#### POST `http://localhost:3000/categories`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | :white_check_mark: | Pass category data object in body |

#### PUT `http://localhost:3000/categories/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Category's UUID to get changed |
| `body` | object | :white_check_mark: | Pass category data object in body |

#### Category data object example
```json
{
    "status": 1,
    "title": "string",
    "url_image": File
}
```

## Sale Places Endpoints

#### GET `http://localhost:3000/salePlaces`

| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `status` | int | :x: | GET filtered by status. (1: Active, 0: Inactive) |
| `uuid` | string | :x: | GET filtered by UUID. (e.g.: ffd9d343-585a-40ee-bc58-c1e6935dcbdd) |
| `search` | string | :x: | GET filtered by term in sale place title |
| `page` | int | :x: |GET filtered by page number considering limit value. (Default page is 1) |
| `limit` | int | :x: | GET filtered by limit informed. (Default value is 10) |

#### DELETE `http://localhost:3000/salePlaces/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Sale Places' UUID to get deleted |

#### POST `http://localhost:3000/salePlaces`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | :white_check_mark: | Pass sale place data object in body |

#### PUT `http://localhost:3000/salePlaces/{uuid}`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | :white_check_mark: | Sale Places' UUID to get changed |
| `body` | object | :white_check_mark: | Pass sale place data object in body |

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
