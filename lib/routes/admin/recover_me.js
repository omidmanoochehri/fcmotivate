var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Post = require('../../models/Post');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllQuotes, uploadFiles, getAllPostCategories, getAllPostTags } = require('../../helpers/dbQueris');

/* GET add quote page. */
router.get('/add', getAllQuotes, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { quotes, categories, tags } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addQuote",
        title: 'Add New Quote',
        action: "add",
        quotes,
        categories,
        tags,
        currentUser: req.currentUser
    })
});

/* GET edit quote page. */
router.get('/edit/:quote_id', getAllQuotes, getAllPostCategories, getAllPostTags, function(req, res, next) {
    let { quotes, categories, tags } = req;
    let { quote_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addQuote",
        title: 'Edit Quote',
        action: "edit",
        quote: quotes.filter(c => c._id == quote_id)[0],
        quotes,
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
            Post.find({ type: "quote" })
                .populate("author", "_id first_name last_name")
                .exec((error, quotes) => {
                    error ?
                        console.log(error) :
                        res.render('admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "quotes",
                            title: 'Quotes List',
                            quotes,
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
                            type: "quote",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }, function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "quote" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, quotes) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "quotes",
                                            title: 'Quotes List',
                                            quotes,
                                            response: { result },
                                            currentUser
                                        });
                                });
                        }) :
                        new Post({
                            type: "quote",
                            title,
                            content,
                            categories: categories == [""] ? null : categories,
                            tags: tags == [""] ? null : tags,
                            author: currentUser._id,
                            image: files["post_image"].name ? files["post_image"].name : ''
                        }).save(function(error, result) {
                            error ?
                                console.log(error) :
                                Post.find({ type: "quote" })
                                .populate("author", "_id first_name last_name")
                                .exec((err, quotes) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "quotes",
                                            title: 'Quotes List',
                                            quotes,
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

/* GET quotes list page. */
router.get('/', getAllQuotes, function(req, res, next) {
    let { currentUser, quotes } = req;
    console.log(quotes)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "quotes",
        title: 'Quotes List',
        quotes,
        response: null,
        currentUser
    });
})

module.exports = router;