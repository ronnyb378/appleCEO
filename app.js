const http = require('http');
const express = require('express');
const db = require('./model/db');
const exp = require('constants');

const hostname = '127.0.0.1';
const port = 3000;

let id = 9

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('home' , {
        title: "Home"
    })})

app.get('/new', (req,res) => {
    res.render('new', {
        title: 'New CEO'
    })
})

app.post('/new', (req, res) => {
    const newCEO = {
        id: id++,
        slug: req.body.ceo_name.toLowerCase().split(' ').join('_'),
        name: req.body.ceo_name,
        year: req.body.ceo_year,
    }
    db.push(newCEO)
    console.log('New CEO received', newCEO)
    res.redirect('/ceos')
})

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