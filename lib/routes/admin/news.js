var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Post = require('../../models/Post');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllNews, uploadFiles, getAllPostCategories, getAllPostTags } = require('../../helpers/dbQueris');

/* GET add currentNews page. */
router.get('/add', getAllNews, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { news, categories, tags } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addNews",
        title: 'Add New News',
        action: "add",
        allNews: news,
        categories,
        tags,
        currentUser: req.currentUser
    })
});

/* GET edit currentNews page. */
router.get('/edit/:currentNews_id', getAllNews, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { news, categories, tags } = req;
    let { currentNews_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addNews",
        title: 'Edit News',
        action: "edit",
        currentNews: news.filter(c => c._id == currentNews_id)[0],
        allNews: news,
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
            Post.find({ type: "news" })
                .populate("author", "_id first_name last_name")
                .exec((error, news) => {
                    error ?
                        console.log(error) :
                        res.render('admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "news",
                            title: 'News List',
                            allNews: news,
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
                            type: "news",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }, function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "news" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, news) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "news",
                                            title: 'News List',
                                            allNews: news,
                                            response: { result },
                                            currentUser
                                        });
                                });
                        }) :
                        new Post({
                            type: "news",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author: currentUser._id,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }).save(function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "news" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, news) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "news",
                                            title: 'News List',
                                            allNews: news,
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

/* GET news list page. */
router.get('/', getAllNews, function(req, res, next) {
    let { currentUser, news } = req;
    console.log(news)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "news",
        title: 'News List',
        allNews: news,
        response: null,
        currentUser
    });
})

module.exports = router;