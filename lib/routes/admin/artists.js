var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Artist = require('../../models/Artist');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllArtists, getAllGenres, uploadFiles } = require('../../helpers/dbQueris');

/* GET add artist page. */
router.get('/add', getAllArtists, getAllGenres, function(req, res, next) {
    let { artists, genres } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addArtist",
        title: 'Add New Artist',
        action: "add",
        artists,
        genres,
        currentUser: req.currentUser
    })
});

/* GET edit artist page. */
router.get('/edit/:artist_id', getAllArtists, getAllGenres, function(req, res, next) {
    let { artists, genres } = req;
    let { artist_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addArtist",
        title: 'Add New Artist',
        action: "edit",
        artists,
        genres,
        artist: artists.filter(c => c.id == artist_id)[0],
        currentUser: req.currentUser
    });


});


router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        Artist.find({ _id }).remove((err, result) => {
            Artist.find({}).exec((err, artists) => {
                err ?
                    console.log(err) :
                    res.render('admin/containers/index', {
                        ...ROUTE_CONFIG,
                        page: "artists",
                        title: 'Artists List',
                        artists,
                        response: { result: result ? result : err },
                        currentUser
                    });
            });
        });

    } else {

        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            let { _id, action, first_name, last_name, description } = fields;

            uploadFiles(files, imagesUploadResult => {
                if (imagesUploadResult) {
                    console.log(imagesUploadResult)
                    action === "edit" ?
                        Artist.updateOne({ _id }, {
                            _id,
                            first_name,
                            last_name,
                            description,
                            image: files["artist_image"].name ? files["artist_image"].name : ''
                        }, function(error, result) {
                            error ?
                                console.log(error) :
                                Artist.find().exec((err, artists) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "artists",
                                            title: 'Artists List',
                                            artists,
                                            response: { result },
                                            currentUser
                                        });
                                });
                        }) :
                        new Artist({
                            first_name,
                            last_name,
                            description,
                            image: files["artist_image"].name ? files["artist_image"].name : ''
                        }).save(function(error, result) {
                            error ?
                                console.log(error) :
                                Artist.find({}).exec((err, artists) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "artists",
                                            title: 'Artists List',
                                            artists,
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

/* GET artists list page. */
router.get('/', getAllArtists, function(req, res, next) {
    let { currentUser, artists } = req;
    console.log(artists)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "artists",
        title: 'Artists List',
        artists,
        response: null,
        currentUser
    });
})

module.exports = router;