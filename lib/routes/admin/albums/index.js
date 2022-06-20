var express = require( 'express' );
var router = express.Router();
var formidable = require( 'formidable' );
var fs = require( 'fs' );
const Album = require( '../../../models/Album' );
const { ROUTE_CONFIG } = require( "../../../helpers/routesConfig" );
const { getAllArtists, getAllGenres, getAllAlbums, uploadFiles } = require( '../../../helpers/dbQueris' );

var tracksRouter = require( "./tracks" );
router.use( "/tracks", tracksRouter );

/* GET add album page. */
router.get( '/add', getAllArtists, getAllGenres, getAllAlbums, function ( req, res, next )
{
    let { artists, genres, albums } = req;
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addAlbum",
        title: 'Add New Album',
        action: "add",
        albums,
        artists,
        genres,
        currentUser: req.currentUser
    } )
} );

/* GET edit album page. */
router.get( '/edit/:album_id', getAllArtists, getAllGenres, getAllAlbums, function ( req, res, next )
{
    let { artists, genres, albums } = req;
    let { album_id } = req.params;

    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addAlbum",
        title: 'Edit Album',
        action: "edit",
        artists,
        genres,
        album: albums.filter( c => c._id == album_id )[ 0 ],
        albums,
        currentUser: req.currentUser
    } );


} );


router.post( '/', function ( req, res, next )
{
    let { currentUser } = req;
    let { _id, action } = req.body;
    if ( action === "delete" )
    {
        Album.find( { _id } ).remove( ( err, result ) =>
        {
            Album.find( {} )
                .populate( "artist", "_id name first_name last_name" )
                .exec( ( err, albums ) =>
                {
                    err ?
                        console.log( err ) :
                        res.render( 'admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "albums",
                            title: 'Albums List',
                            albums,
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
            let { _id, action, name, artist, genre, description, release_date } = fields;
            console.log( fields )
            uploadFiles( files, imagesUploadResult =>
            {
                if ( imagesUploadResult )
                {
                    console.log( imagesUploadResult )
                    action === "edit" ?
                        Album.updateOne( { _id }, {
                            _id,
                            name,
                            artist: artist ? artist : null,
                            genre: genre ? genre : null,
                            description,
                            release_date,
                            author: currentUser._id,
                            gallery: Object.keys( files ).filter( key => files[ key ] ).name,
                            cover: files[ "cover" ].name ? files[ "cover" ].name : ''
                        }, function ( error, result )
                        {
                            error ?
                                console.log( error ) :
                                Album.find( {} )
                                    .populate( "artist", "_id name first_name last_name" )
                                    .exec( ( err, albums ) =>
                                    {
                                        err ?
                                            console.log( err ) :
                                            res.render( 'admin/containers/index', {
                                                ...ROUTE_CONFIG,
                                                page: "albums",
                                                title: 'Albums List',
                                                albums,
                                                response: { result },
                                                currentUser
                                            } );
                                    } );
                        } ) :
                        new Album( {
                            name,
                            artist: artist ? artist : null,
                            genre: genre ? genre : null,
                            description,
                            release_date,
                            author: currentUser._id,
                            gallery: Object.keys( files ).filter( key => files[ key ] ).name,
                            cover: files[ "cover" ].name ? files[ "cover" ].name : ''
                        } ).save( function ( error, result )
                        {
                            error ?
                                console.log( error ) :
                                Album.find( {} )
                                    .populate( "artist", "_id name first_name last_name" )
                                    .exec( ( err, albums ) =>
                                    {
                                        err ?
                                            console.log( err ) :
                                            res.render( 'admin/containers/index', {
                                                ...ROUTE_CONFIG,
                                                page: "albums",
                                                title: 'Albums List',
                                                albums,
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

/* GET albums list page. */
router.get( '/', getAllAlbums, function ( req, res, next )
{
    let { currentUser, albums } = req;
    console.log( albums )
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "albums",
        title: 'Albums List',
        albums,
        response: null,
        currentUser
    } );
} )

module.exports = router;