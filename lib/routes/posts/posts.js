var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var formidable = require('formidable');
const Post = require("../../models/Post");
var authChecker = require('../../helpers/authChecker.js');

/* GET posts . */
router.get('/posts', function(req, res, next) {
    Post.find({})
        .populate("author", "first_name last_name")
        .populate("categories", "name slug")
        .populate("tags", "name slug")
        .exec((err, posts) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    result: "Unknown Error! :("
                })
            } else {
                res.json(posts);
            }
        })
});

/* GET a post . */
router.get('/posts/:post_id', function(req, res, next) {
    let { post_id } = req.params;
    Post.findOne({ _id: post_id })
        .populate("author", "first_name last_name")
        .populate("categories", "name slug")
        .populate("tags", "name slug")
        .exec((err, post) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    result: "Unknown Error! :("
                })
            } else {
                res.json(post);
            }
        })
});

/* add a post. */
router.post('/posts/add',
    authChecker,
    function(req, res, next) {
        let { currentUser } = req;
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(fields, files)
            const { author, title, slug, type, content, status, categories, tags } = fields;
            let image = files.image && files.image.type.indexOf("image") > -1 ? `data:${files.image.type};base64,` + Buffer.from(fs.readFileSync(files.image.path), 'binary').toString('base64') : "";

            new Post({ author: currentUser._id, title, slug, type, content, status, image, categories: categories.split(','), tags: tags.split(',') }).save().then(result => {
                res.json({
                    result: "OK",
                    post: result
                });
            }).catch(error => {
                console.log(error)
                res.status(400).json(error);
            })
        });
    });

/* update a post . */
router.put('/posts/update/:post_id', function(req, res, next) {
    let { post_id } = req.params;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const { title, slug, content, status, categories, tags } = fields;
        let image = files.image && files.image.type.indexOf("image") > -1 ? `data:${files.image.type};base64,` + Buffer.from(fs.readFileSync(files.image.path), 'binary').toString('base64') : "";

        Post.updateOne({ _id: post_id.trim() },
                image ? { title, slug, content, status, image, categories: categories.split(','), tags: tags.split(',') } :
                { title, slug, content, status, categories: categories.split(','), tags: tags.split(',') }
            )
            .exec().then(result => {
                res.json(result);
            }).catch(error => {
                console.log(error)
                res.status(400).json(error);
            })
    });
});

/* delete a post . */
router.delete('/posts/delete/:post_id', function(req, res, next) {
    const { post_id } = req.params;
    Post.findOne({ _id: post_id }).remove().exec().then(result => {
        res.json(result);
    }).catch(error => {
        console.log(error)
        res.status(400).json(error);
    })
});




module.exports = router;