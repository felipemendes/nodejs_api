const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const indexRouter = require('./api/routes/index');
const eventsRouter = require('./api/routes/events');
const categoriesRouter = require('./api/routes/categories');
const salePlacesRouter = require('./api/routes/salePlaces');
const userRouter = require('./api/routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', indexRouter);

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/categories', categoriesRouter);
app.use('/salePlaces', salePlacesRouter);
app.use('/user', userRouter);
app.use('/login', userRouter);

app.use((req, res) => {
    res.status(500).json({
        error: 'Not found'
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
