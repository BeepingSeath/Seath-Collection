const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();


router.get('/', function (req, res, next) {
    res.render('index.njk', {
        title: 'Home Page',
    });
});
router.get('/manga', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM SCManga");
    res.render('manga.njk', {
        rows: rows,
        title: 'Manga'
    });
});

module.exports = router;