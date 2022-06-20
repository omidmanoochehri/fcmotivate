var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Post = require('../../models/Post');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllTutorials, uploadFiles, getAllPostCategories, getAllPostTags } = require('../../helpers/dbQueris');

/* GET add tutorial page. */
router.get('/add', getAllTutorials, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { tutorials, categories, tags } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addTutorial",
        title: 'Add New Tutorial',
        action: "add",
        tutorials,
        categories,
        tags,
        currentUser: req.currentUser
    })
});

/* GET edit tutorial page. */
router.get('/edit/:tutorial_id', getAllTutorials, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { tutorials, categories, tags } = req;
    let { tutorial_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addTutorial",
        title: 'Edit Tutorial',
        action: "edit",
        tutorial: tutorials.filter(c => c._id == tutorial_id)[0],
        tutorials,
        categories,
        tags,
        currentUser: req.currentUser
    });


});


router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        Post.find({ _id }).remove((err, result) => {
            Post.find({ type: "tutorial" })
                .populate("author", "_id first_name last_name")
                .exec((error, tutorials) => {
                    error ?
                        console.log(error) :
                        res.render('admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "tutorials",
                            title: 'Tutorials List',
                            tutorials,
                            response: { result: result ? result : error },
                            currentUser
                        });
                });
        });

    } else {

        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            let { _id, action, title, content, categories, tags, author } = fields;
            uploadFiles(files, imagesUploadResult => {
                if (imagesUploadResult) {
                    action === "edit" ?
                        Post.updateOne({ _id }, {
                            _id,
                            type: "tutorial",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }, function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "tutorial" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, tutorials) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "tutorials",
                                            title: 'Tutorials List',
                                            tutorials,
                                            response: { result },
                                            currentUser
                                        });
                                });
                        }) :
                        new Post({
                            type: "tutorial",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author: currentUser._id,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }).save(function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "tutorial" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, tutorials) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "tutorials",
                                            title: 'Tutorials List',
                                            tutorials,
                                            response: { result },
                                            currentUser
                                        });
                                });

                        });
                }
            });

        });
    }
});

/* GET tutorials list page. */
router.get('/', getAllTutorials, function(req, res, next) {
    let { currentUser, tutorials } = req;
    console.log(tutorials)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "tutorials",
        title: 'Tutorials List',
        tutorials,
        response: null,
        currentUser
    });
})

module.exports = router;