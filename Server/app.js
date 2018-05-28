const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const favicon = require('serve-favicon');
const session = require('express-session');
const compression = require('compression');

const config = require('./config');
const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 's.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/taxiShare', index);

app.set('port', config.server.port);
app.set('host', config.server.host);
const server = http.createServer(app).listen(app.get('port'), app.get('host'), () =>
    console.log(`TaxiShare Server listening on port ${app.get('port')} at host ${app.get('host')}`)
);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('404', {
        current: [-1, -1],
        msg: err.message
    });
});

module.exports = app;
