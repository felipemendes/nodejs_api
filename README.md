# JavaScript PurAí API for Node.js
CRUD operation in Node.js, Express and MySQL that provides an RESTful API.

This lib library package the following functions:
- [ ] Login
- [ ] Logout
- [x] Get list of events    

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

![Server](/screenshots/server.png "Server")

To automatically restart the application when file changes use [nodemon](https://github.com/remy/nodemon).

First install nodemon:
```
$ npm install -g nodemon
```

Then run:
```
$ nodemon purai-nodejs
```
![nodemon](/screenshots/nodemon.png "nodemon")


## Endpoints
| Path        | Request Type           
| ------------------------------ | ------------------------ |
| http://localhost:3000/Events   | GET                      |
| http://localhost:3000/Events/1 | GET                      |
| http://localhost:3000/Events/1 | DELETE                   |
| http://localhost:3000/Events   | POST (pass data in body) |
| http://localhost:3000/Events/1 | PUT (pass data in body)  |

## Testing
To test use any API development environment like Postman or via cURL:
```
curl -X GET http://localhost:3000/Events
```
![GET](/screenshots/curl-get.png "GET")