const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // * means any domain can access
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // which kind of headers we want to accept
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"); // which kind of methods we want to accept
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "Post added successfully"
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        { id: '154154', title: 'First server-side post', content: 'This is first content'},
        { id: '154154', title: 'Second server-side post', content: 'This is second content'}
    ];
    res.json({
        message: 'Posts fetched properly',
        posts: posts
    })
});

module.exports = app

