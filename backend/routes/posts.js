const express = require('express');
const Post=  require('../models/post');
const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
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

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetched properly',
            posts: documents
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    })
});

router.delete("/:id", (req, res, next) => {
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

module.exports = router;