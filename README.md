# JavaScript PurAí API for Node.js
CRUD operation in Node.js, Express and MySQL that provides an RESTful API.

This lib library package the following functions:
- [ ] Login
- [x] Events CRUD

 ## Installation
Get via git clone:
```
$ git clone https://github.com/felipemendes/purai-nodejs.git
$ cd purai-nodejs
```

Create database and set the config at `db-connect.js`:
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
| `search` | string | Optional | GET filtered by term in event title, address, city name or sale place |
| `page` | int | Optional |GET filtered by page. By default page is 1 |
| `limit` | int | Optional | GET filtered by limit. By default limit is 10 |
| `upcoming` | string | Optional | GET filtered by upcoming events. By default only events with a date greater than or equal to the current date will be returned. Date format yyyy-MM-dd |

#### Response body
```json
{
  "events": [
    {
      "event_id": 1,
      "uuid": "955b9575-e542-461c-939a-5ef41e733859",
      "status": 1,
      "user_email": "api@purai.io",
      "created_at": "2018-08-09T01:11:28.000Z",
      "updated_at": null,
      "url_image": "uploads/welcometocat.png",
      "place": "Apple Infinite Loop",
      "place_phone": "+1 408-961-1560",
      "date": "2022-01-01T02:00:00.000Z",
      "address": "Apple Campus, Cupertino, CA 95014, EUA",
      "city": "Cupertino",
      "sale_place": "Apple Park Visitor Center",
      "sale_place_phone": "+1 408-961-1560",
      "sale_places_id": 1,
      "name": "Sample place",
      "phone": "+1 408-961-1560",
      "id_event": 1
    }
  ]
}
```

#### DELETE `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get deleted |

#### Response body
```json
{
  "message": "Event successfully removed",
  "details": "Affected rows 1"
}
```

#### POST `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `body` | object | Yes | Pass event data object in body |

#### Response body
```json
{
  "message": "Event successfully registered",
  "details": "New UUID: 73c1f090-9c40-11e8-981e-317b7184bb89"
}
```

#### PUT `http://localhost:3000/events`
| Parameter | Type | Required | Description
| --------- | ---- | -------- | ----------- |
| `uuid` | string | Yes | Event's UUID to get changed |
| `body` | object | Yes | Pass event data object in body |

#### Response body
```json
{
  "message": "Event successfully updated",
  "details": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 34,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
  }
}
```

### Event data object example
```json
{
  "status": 1,
  "user_email": "user@example.com",
  "url_image": "path",
  "place": "string",
  "place_phone": "string",
  "date": "2018-08-10 01:00",
  "address": "string",
  "city": "string",
  "sale_place": "string",
  "sale_place_phone": "string"
}
```

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details

Created by [Felipe Mendes](https://github.com/felipemendes).
