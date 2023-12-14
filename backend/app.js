const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

// heslo Q8ons8eN5hTLAp3T, login: blahaondra

const app = express();

mongoose.connect('mongodb+srv://blahaondra:Q8ons8eN5hTLAp3T@cluster0.kuklgfi.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // * means any domain can access
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // which kind of headers we want to accept
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS"); // which kind of methods we want to accept
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app

