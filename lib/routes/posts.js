var express = require('express');
var router = express.Router();
var Post = require("../models/Post");

/* GET all posts by type. */
router.get('/:type', function(req, res, next) {
    let { type } = req.params;
    Post.find({ type })
        .populate("author", "_id first_name last_name")
        .populate("categories", "_id name")
        .populate("tags", "_id tag")
        .exec((err, posts) => {
            if (err) {
                console.log(err);
                res.json({
                    result: "Error!"
                })
            } else {
                res.json(posts)
            }
        })
});

/* GET a post by id. */
router.get('/id/:_id', function(req, res, next) {
    let { _id } = req.params;
    Post.findOne({ _id })
        .populate("author", "_id first_name last_name")
        .populate("categories", "_id name")
        .populate("tags", "_id tag")
        .exec((err, post) => {
            if (err) {
                console.log(err);
                res.json({
                    result: "Error!"
                })
            } else {
                res.json(post)
            }
        })
});

module.exports = router;