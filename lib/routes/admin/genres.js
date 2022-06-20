var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Genre = require('../../models/Genre');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllGenres, uploadFiles } = require('../../helpers/dbQueris');

/* GET add genre page. */
router.get('/add', getAllGenres, function(req, res, next) {
    let { genres } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addGenre",
        title: 'Add New Genre',
        action: "add",
        genres,
        currentUser: req.currentUser
    })
});

/* GET edit genre page. */
router.get('/edit/:genre_id', getAllGenres, function(req, res, next) {
    let { genres } = req;
    let { genre_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addGenre",
        title: 'Add New Genre',
        action: "edit",
        genres,
        genre: genres.filter(c => c.id == genre_id)[0],
        currentUser: req.currentUser
    });


});


router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        Genre.find({ _id }).remove((err, result) => {
            Genre.find({}).exec((err, genres) => {
                err ?
                    console.log(err) :
                    res.render('admin/containers/index', {
                        ...ROUTE_CONFIG,
                        page: "genres",
                        title: 'Genres List',
                        genres,
                        response: { result: result ? result : err },
                        currentUser
                    });
            });
        });

    } else {

        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            let { _id, action, name, description } = fields;
            action === "edit" ?
                Genre.updateOne({ _id }, {
                    _id,
                    name,
                    description,
                }, function(error, result) {
                    error ?
                        console.log(error) :
                        Genre.find().exec((err, genres) => {
                            err ?
                                console.log(err) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "genres",
                                    title: 'Genres List',
                                    genres,
                                    response: { result },
                                    currentUser
                                });
                        });
                }) :
                new Genre({
                    name,
                    description,
                }).save(function(error, result) {
                    error ?
                        console.log(error) :
                        Genre.find({}).exec((err, genres) => {
                            err ?
                                console.log(err) :
                                res.render('admin/containers/index', {
                                    ...ROUTE_CONFIG,
                                    page: "genres",
                                    title: 'Genres List',
                                    genres,
                                    response: { result },
                                    currentUser
                                });
                        });

                });

        });
    }
});

/* GET genres list page. */
router.get('/', getAllGenres, function(req, res, next) {
    let { currentUser, genres } = req;
    console.log(genres)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "genres",
        title: 'Genres List',
        genres,
        response: null,
        currentUser
    });
})

module.exports = router;