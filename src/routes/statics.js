const express = require('express');
const routes = express.Router();
const path = require('path');
//default get /
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        console.log("wtf");
        res.sendFile('/src/www/index.html', { root: 'D:' });
    });
});
//borrow book menu 
routes.get('/borrow', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        res.sendFile('/src/www/borrow.html', { root: 'D:' });
    });
});
//user menu
routes.get('/users', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        res.sendFile('/src/www/user.html', { root: 'D:' });
    });
});
//books menu
routes.get('/books', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        res.sendFile('/src/www/book.html', { root: 'D:' });
    });
});
//genres menu
routes.get('/genres', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        res.sendFile('/src/www/genre.html', { root: 'D:' });
    });
});

module.exports = routes;