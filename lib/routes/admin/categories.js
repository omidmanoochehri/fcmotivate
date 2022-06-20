var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const PostCategory = require('../../models/PostCategory');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllPostCategories } = require('../../helpers/dbQueris');

/* GET add category page. */
router.get('/add', getAllPostCategories, function(req, res, next) {
    let { categories } = req;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addPostCategory",
        title: 'Add New Category',
        action: "add",
        categories,
        currentUser: req.currentUser
    });

});

/* GET edit category page. */
router.get('/edit/:category_id', getAllPostCategories, function(req, res, next) {
    let { category_id } = req.params;
    let { categories } = req;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addPostCategory",
        title: 'Edit Category',
        action: "edit",
        category: categories.filter(c => c._id == category_id)[0],
        categories,
        currentUser: req.currentUser
    });

});

/* GET add category page. */
router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        PostCategory.findOne({ _id }).remove((err, result) => {
            err ?
                console.log(err) :
                PostCategory.find({}).exec(function(error, categories) {
                    res.render('admin/containers/index', {
                        ...ROUTE_CONFIG,
                        page: "categories",
                        title: 'Categories List',
                        categories,
                        response: { result },
                        currentUser
                    });
                });
        })


    } else {

        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            let { _id, action, name, slug } = fields;

            action === "edit" ?
                PostCategory.updateOne({ _id }, { name, slug }, function(err, result) {
                    err ?
                        console.log(err) :
                        PostCategory.find({}).exec(function(error, categories) {
                            error ?
                                console.log(error) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "categories",
                                    title: 'Categories List',
                                    categories,
                                    response: { result },
                                    currentUser
                                });

                        })
                }) :
                new PostCategory({ name, slug }).save(function(err, result) {
                    err ?
                        console.log(err) :
                        PostCategory.find({}).exec(function(error, categories) {
                            error ?
                                console.log(error) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "categories",
                                    title: 'Categories List',
                                    categories,
                                    response: { result },
                                    currentUser
                                });
                        })
                });


        });
    }
});

/* GET add category page. */
router.get('/', getAllPostCategories, function(req, res, next) {
    let { currentUser, categories } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "categories",
        title: 'Categories List',
        categories,
        response: null,
        currentUser
    });

})

module.exports = router;