const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post=  require('./models/post');

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

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    }); // empty object
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    })   // save to database);
});

app.put("/api/posts/:id", (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, { title: req.body.title, content: req.body.content })
        .then(result => {
            if (result.nModified === 0) {
                return res.status(404).json({ message: "Post not found!" });
            }
            console.log(result);
            res.status(200).json({ message: "Update successful!" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "An error occurred while updating the post." });
        });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetched properly',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Post not found!" });
            }
            console.log(result);
            res.status(200).json({ message: "Post deleted!" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "An error occurred while deleting the post." });
        });
});

module.exports = app

