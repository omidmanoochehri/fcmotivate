var express = require( 'express' );
var router = express.Router();
var formidable = require( 'formidable' );
var fs = require( 'fs' );
const Music = require( '../../../models/Music' );
const { ROUTE_CONFIG } = require( "../../../helpers/routesConfig" );
const { getAllArtists, getAllGenres, getAllTracks, uploadFiles, getAllAlbums } = require( '../../../helpers/dbQueris' );

/* GET add track page. */
router.get( '/add/:album_id', getAllArtists, getAllGenres, getAllTracks, function ( req, res, next )
{
    let { album_id } = req.params;
    let { artists, genres, tracks } = req;
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addAlbumTrack",
        title: 'Add New Track',
        action: "add",
        tracks: tracks.filter( t => t.album._id == album_id ),
        album_id,
        artists,
        genres,
        currentUser: req.currentUser
    } )
} );

/* GET edit track page. */
router.get( '/edit/:track_id', getAllArtists, getAllGenres, getAllTracks, function ( req, res, next )
{
    let { artists, genres, tracks } = req;
    let { track_id } = req.params;
    let track = tracks.filter( c => c._id == track_id )[ 0 ];
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addAlbumTrack",
        title: 'Edit Track',
        action: "edit",
        artists,
        genres,
        track: track,
        tracks: tracks.filter( t => t.album._id == track.album_id ),
        currentUser: req.currentUser
    } );


} );


router.post( '/', getAllAlbums, function ( req, res, next )
{
    let { currentUser, albums } = req;
    let { _id, action, album_id } = req.body;

    if ( action === "delete" )
    {
        Music.find( { _id } ).remove( ( err, result ) =>
        {
            Music.find( { type: "albumTrack" } )
                .populate( "artist", "_id name first_name last_name" )
                .exec( ( err, tracks ) =>
                {
                    err ?
                        console.log( err ) :
                        res.render( 'admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "albumTracks",
                            title: 'Tracks List',
                            tracks: tracks.filter( t => t.album._id == album_id ),
                            album_id,
                            response: { result: result ? result : err },
                            currentUser
                        } );
                } );
        } );

    } else
    {

        var form = new formidable.IncomingForm();
        form.parse( req, async function ( err, fields, files )
        {
            let { _id, action, name, artist, genre, trackURL, description, album_id } = fields;
            console.log( fields )
            uploadFiles( files, imagesUploadResult =>
            {
                if ( imagesUploadResult )
                {
                    console.log( imagesUploadResult )
                    action === "edit" ?
                        Music.updateOne( { _id }, {
                            _id,
                            name,
                            artist: albums.filter( a => a._id == album_id )[ 0 ].artist._id,
                            type: "albumTrack",
                            genre: genre ? genre : null,
                            album: album_id,
                            description,
                            author: currentUser._id,
                            trackURL,
                            cover: files[ "cover" ].name ? files[ "cover" ].name : ''
                        }, function ( error, result )
                        {
                            error ?
                                console.log( error ) :
                                Music.find( { type: "albumTrack" } )
                                    .populate( "artist", "_id name first_name last_name" )
                                    .exec( ( err, tracks ) =>
                                    {
                                        err ?
                                            console.log( err ) :
                                            res.render( 'admin/containers/index', {
                                                ...ROUTE_CONFIG,
                                                page: "albumTracks",
                                                title: 'Tracks List',
                                                tracks: tracks.filter( t => t.album._id == album_id ),
                                                album_id,
                                                response: { result },
                                                currentUser
                                            } );
                                    } );
                        } ) :
                        new Music( {
                            name,
                            artist: albums.filter( a => a._id == album_id )[ 0 ].artist._id,
                            type: "albumTrack",
                            genre: genre ? genre : null,
                            trackURL,
                            album: album_id,
                            description,
                            author: currentUser._id,
                            cover: files[ "cover" ].name ? files[ "cover" ].name : ''
                        } ).save( function ( error, result )
                        {
                            error ?
                                console.log( error ) :
                                Music.find( { type: "albumTrack" } )
                                    .populate( "artist", "_id name first_name last_name" )
                                    .populate( "album", "_id name" )
                                    .exec( ( err, tracks ) =>
                                    {
                                        err ?
                                            console.log( err ) :
                                            res.render( 'admin/containers/index', {
                                                ...ROUTE_CONFIG,
                                                page: "albumTracks",
                                                title: 'Tracks List',
                                                tracks: tracks.filter( t => t.album._id == album_id ),
                                                album_id,
                                                response: { result },
                                                currentUser
                                            } );
                                    } );

                        } );
                }
            } );

        } );
    }
} );

/* GET tracks list page. */
router.get( '/:album_id', getAllTracks, function ( req, res, next )
{
    let { album_id } = req.params;
    let { currentUser, tracks } = req;
    console.log( tracks )
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "albumTracks",
        title: 'Tracks List',
        tracks: tracks.filter( t => t.album._id == album_id ),
        album_id,
        response: null,
        currentUser
    } );
} )

module.exports = router;