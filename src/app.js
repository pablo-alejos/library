const express = require('express');
const path = require('path')
const morgan = require('morgan');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const api = require('./routes/api.js');
const statics = require('./routes/statics.js');
const app = express();
const dbOptions = {
    host: process.env.HOSTNAME || '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'toor',
    database: 'library'
}

//midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.static(path.join(__dirname, 'www')))

//settings
app.set('port', process.env.PORT || 3000);
app.set('hostname', process.env.HOSTNAME || '127.0.0.1');
app.set('view engine', 'ejs')

//routes
app.use('/api', api);
app.use('/', statics);

//srtart server
app.listen(app.get('port'), app.get('hostname'), () => {
    console.log(`Server running at http://${app.get('hostname')}:${app.get('port')}/`);
});