const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', routes);

app.listen(port, () => console.log('Listening on port: ' + port));