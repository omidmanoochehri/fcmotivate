var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const Music = require('../../models/Music');
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const { getAllArtists, getAllGenres, getAllFreeDownloads, uploadFiles } = require('../../helpers/dbQueris');

/* GET add freeDownload page. */
router.get('/add', getAllArtists, getAllGenres, getAllFreeDownloads, function(req, res, next) {
    let { artists, genres, freeDownloads } = req;
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addFreeDownload",
        title: 'Add New Free Download',
        action: "add",
        freeDownloads,
        artists,
        genres,
        currentUser: req.currentUser
    })
});

/* GET edit freeDownload page. */
router.get('/edit/:freeDownload_id', getAllArtists, getAllGenres, getAllFreeDownloads, function(req, res, next) {
    let { artists, genres, freeDownloads } = req;
    let { freeDownload_id } = req.params;

    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addFreeDownload",
        title: 'Edit Free Download',
        action: "edit",
        artists,
        genres,
        freeDownload: freeDownloads.filter(c => c._id == freeDownload_id)[0],
        freeDownloads,
        currentUser: req.currentUser
    });


});


router.post('/', function(req, res, next) {
    let { currentUser } = req;
    let { _id, action } = req.body;
    if (action === "delete") {
        Music.find({ _id }).remove((err, result) => {
            Music.find({ type: "freeDownload" })
                .populate("artist", "_id name first_name last_name")
                .exec((err, freeDownloads) => {
                    err ?
                        console.log(err) :
                        res.render('admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "freeDownloads",
                            title: 'FreeDownloads List',
                            freeDownloads,
                            response: { result: result ? result : err },
                            currentUser
                        });
                });
        });

    } else {

        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            let { _id, action, name, artist, genre, trackURL, description } = fields;
            console.log(fields)
            uploadFiles(files, imagesUploadResult => {
                if (imagesUploadResult) {
                    console.log(imagesUploadResult)
                    action === "edit" ?
                        Music.updateOne({ _id }, {
                            _id,
                            name,
                            artist: artist ? artist : null,
                            type: "freeDownload",
                            genre: genre ? genre : null,
                            description,
                            author: currentUser._id,
                            trackURL,
                            cover: files["cover"].name ? files["cover"].name : ''
                        }, function(error, result) {
                            error ?
                                console.log(error) :
                                Music.find({ type: "freeDownload" })
                                .populate("artist", "_id name first_name last_name")
                                .exec((err, freeDownloads) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "freeDownloads",
                                            title: 'FreeDownloads List',
                                            freeDownloads,
                                            response: { result },
                                            currentUser
                                        });
                                });
                        }) :
                        new Music({
                            name,
                            artist: artist ? artist : null,
                            type: "freeDownload",
                            genre: genre ? genre : null,
                            trackURL,
                            description,
                            author: currentUser._id,
                            cover: files["cover"].name ? files["cover"].name : ''
                        }).save(function(error, result) {
                            error ?
                                console.log(error) :
                                Music.find({ type: "freeDownload" })
                                .populate("artist", "_id name first_name last_name")
                                .exec((err, freeDownloads) => {
                                    err ?
                                        console.log(err) :
                                        res.render('admin/containers/index', {
                                            ...ROUTE_CONFIG,
                                            page: "freeDownloads",
                                            title: 'FreeDownloads List',
                                            freeDownloads,
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

/* GET freeDownloads list page. */
router.get('/', getAllFreeDownloads, function(req, res, next) {
    let { currentUser, freeDownloads } = req;
    console.log(freeDownloads)
    res.render('admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "freeDownloads",
        title: 'FreeDownloads List',
        freeDownloads,
        response: null,
        currentUser
    });
})

module.exports = router;