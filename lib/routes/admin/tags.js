var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const PostTag = require('../../models/PostTag');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllPostTags } = require('../../helpers/dbQueris');

/* GET add tag page. */
router.get('/add', getAllPostTags, function(req, res, next) {
    let { tags } = req;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addPostTag",
        title: 'Add New Tag',
        action: "add",
        tags,
        currentUser: req.currentUser
    });

});

/* GET edit tag page. */
router.get('/edit/:tag_id', getAllPostTags, function(req, res, next) {
    let { tag_id } = req.params;
    let { tags } = req;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addPostTag",
        title: 'Edit Tag',
        action: "edit",
        tag: tags.filter(c => c._id == tag_id)[0],
        tags,
        currentUser: req.currentUser
    });

});

/* GET add tag page. */
router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        PostTag.findOne({ _id }).remove((err, result) => {
            err ?
                console.log(err) :
                PostTag.find({}).exec(function(error, tags) {
                    res.render('admin/containers/index', {
                        ...ROUTE_CONFIG,
                        page: "tags",
                        title: 'Tags List',
                        tags,
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
                PostTag.updateOne({ _id }, { name, slug }, function(err, result) {
                    err ?
                        console.log(err) :
                        PostTag.find({}).exec(function(error, tags) {
                            error ?
                                console.log(error) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "tags",
                                    title: 'Tags List',
                                    tags,
                                    response: { result },
                                    currentUser
                                });

                        })
                }) :
                new PostTag({ name, slug }).save(function(err, result) {
                    err ?
                        console.log(err) :
                        PostTag.find({}).exec(function(error, tags) {
                            error ?
                                console.log(error) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "tags",
                                    title: 'Tags List',
                                    tags,
                                    response: { result },
                                    currentUser
                                });
                        })
                });


        });
    }
});

/* GET add tag page. */
router.get('/', getAllPostTags, function(req, res, next) {
    let { currentUser, tags } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "tags",
        title: 'Tags List',
        tags,
        response: null,
        currentUser
    });

})

module.exports = router;