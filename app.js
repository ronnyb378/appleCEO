const http = require('http');
const express = require('express');
const db = require('./model/db')

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.get('/', (req,res) => {
    res.render('home' , {
        title: "Home"
    })})

app.get('/ceos', (req,res) => {
    res.render('ceo-list', {
        title: "CEOs",
        ceos: db
    })
})

app.get('/ceos/:slug', (req,res) => {
    const foundCEO = db.find((ceo) => {
        return ceo.slug === req.params.slug
    })
    res.render('ceo-details', {
        title: 'CEO',
        ceo: foundCEO,
    })
})



server.listen(port, hostname, () => {
    console.log(`Server running: http://${hostname}:${port}`)
})