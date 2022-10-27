var fs = require( 'fs' );
const util = require( 'util' );
const fileRename = util.promisify( fs.rename );
const Post = require( '../models/Post' );
const PostCategory = require( '../models/PostCategory' );
const PostTag = require( '../models/PostTag' );
const User = require( '../models/User' );

exports.getAllQuotes = ( req, res, next ) =>
{
    Post.find( { type: "quote" } )
        .populate( "author", "_id first_name last_name" )
        .exec( ( err, quotes ) =>
        {
            req.quotes = err ? err : quotes;
            next();
        } )
};

exports.getAllNews = ( req, res, next ) =>
{
    Post.find( { type: "news" } )
        .populate( "author", "_id first_name last_name" )
        .exec( ( err, news ) =>
        {
            req.news = err ? err : news;
            next();
        } )
};

exports.getAllPostCategories = ( req, res, next ) =>
{
    PostCategory.find( {} )
        .exec( ( err, categories ) =>
        {
            req.categories = err ? err : categories;
            next();
        } )
};

exports.getAllPostTags = ( req, res, next ) =>
{
    PostTag.find( {} )
        .exec( ( err, tags ) =>
        {
            req.tags = err ? err : tags;
            next();
        } )
};

exports.getAllAdmins = ( req, res, next ) =>
{
    User.find( { role: "admin" } )
        .exec( ( err, admins ) =>
        {
            req.admins = err ? err : admins;
            next();
        } )
};


exports.uploadFiles = async ( files, callback ) =>
{
    for ( let key in files )
    {
        var uploadError;
        var imageTempPath = files[ key ].path;
        var imagesPath = __dirname + ( key === "track" ? `/../media/${key}s/` : `/../public/${key}s/` ) + files[ key ].name;
        if ( files[ key ].name )
        {
            await fileRename( imageTempPath, imagesPath )
                .then( function ( uploadResult ) { } )
                .catch( function ( err ) { uploadError = err; } );
        } else
        {
            uploadError = false;
        }
        if ( uploadError )
        {
            console.log( uploadError )
            return callback( false )
        }
    };

    return callback( true )
}