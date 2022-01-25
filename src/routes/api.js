const express = require('express');
const routes = express.Router();

//default /api/ call
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        res.send("No data for default endpoint");
    });
});
//API ROUTES
//Book list
routes.get('/book/list', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM book', (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//Genres List
routes.get('/genre/list', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM genre', (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//Corridor List
routes.get('/corridor/list', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM corridor', (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//Users List
routes.get('/user/list', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM user', (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//Borrow List
routes.get('/borrow/list/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM borrow WHERE user = ?', req.params.id, (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//Borrowed Books
routes.get('/borrow/books/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT book.genre,book.corridor,book.id,book.author,book.title,book.pubDate,book.status FROM book INNER JOIN borrow on book.id=borrow.book WHERE borrow.user= ?', req.params.id, (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//BOOK ENDPOINTS 
//create
routes.post('/book/save', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO book SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err);
            res.send('Book added.');
        });
    });
});
//read
routes.get('/book/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM book WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//delete
routes.put('/book/delete/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE book SET status = ? WHERE id = ?', [3, req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.send(rows);
        });
    });
});
//update
routes.put('/book/update/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE book SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});
//book borrow 1
routes.put('/book/borrow/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE book SET status= 1 WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});
//book borrow 2
routes.put('/book/back/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE book SET status= 2 WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});
//USER ENDPOINTS'
//create
routes.post('/user/save', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO user SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err);
            res.send('user added.');
        });
    });
});
//read
routes.get('/user/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//delete
routes.delete('/user/delete/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('DELETE FROM user WHERE id = ?', req.params.id, (err, rows) => {
            if (err) return res.send(err);
            res.send(rows);
        });
    });
});
//update
routes.put('/user/update/:id', (req, res) => {
    console.log("PUT req body", req.body);
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE user SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});
//GENRE ENDPOINTS'
//create
routes.post('/genre/save', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO genre SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err);
            res.send('genre added.');
        });
    });
});
//read
routes.get('/genre/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM genre WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//delete
routes.put('/genre/delete/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE genre SET status = ? WHERE id = ?', [3, req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.send(rows);
        });
    });
});
//update
routes.put('/genre/update/:id', (req, res) => {
    console.log("PUT req body", req.body);
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE genre SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});
//BORROW ENDPOINTS'
//create
routes.post('/borrow/save', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO borrow SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err);
            res.send('genre added.');
        });
    });
});
//read
routes.get('/borrow/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM borrow WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});
//delete
routes.delete('/borrow/delete/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('DELETE FROM borrow WHERE book = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.send(rows);
        });
    });
});
//update
routes.put('/borrow/update/:id', (req, res) => {
    console.log("PUT req body", req.body);
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE borrow SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log(rows);
            res.send(rows);
        });
    });
});

module.exports = routes;