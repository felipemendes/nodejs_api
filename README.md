# JavaScript PurAí API for Node.js
CRUD operation in Node.js, Express and MySQL that provides an RESTful API.

This lib library package the following functions:
- [ ] Login
- [x] CRUD events

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
The table and sample data will be add when server get started.

Get dependencies with the [Node Package Manager](http://npmjs.org/):
```
$ npm install
```

## Usage
Run `npm start` and the application will start at `localhost:3000`

To automatically restart the application when file changes use [nodemon](https://github.com/remy/nodemon).

```
$ nodemon
```
![nodemon](/screenshots/nodemon.png "nodemon")

## Endpoints
| Path        | Request Type           
| ------------------------------ | ------------------------ |
| http://localhost:3000/Events   | GET all events           |
| http://localhost:3000/Events/{uuid}{search} | GET filtered by UUID or term            |
| http://localhost:3000/Events/{page}{quantity} | GET by page or quantity (default quantity is 10)            |
| http://localhost:3000/Events/{uuid} | DELETE by UUID           |
| http://localhost:3000/Events       | POST (pass data in body) |
| http://localhost:3000/Events/{uuid} | PUT (pass data in body)  |

## Testing
To test use [Swagger](https://swagger.io/) framework.
```
http://localhost:3000/api-docs/
```

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details

Created by [Felipe Mendes](https://github.com/felipemendes).