const http = require('http');
const express = require('express');
const db = require('./db')

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)