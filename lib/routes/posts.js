var express = require( "express" );
var router = express.Router();
var Post = require( "../models/Post" );

/* GET all posts by type. */
router.get( "/:type", function ( req, res, next )
{
    let { type } = req.params;
    Post.find( { type } )
        .populate( "author", "_id first_name last_name" )
        .populate( "categories", "_id name" )
        .populate( "tags", "_id tag" )
        .exec( ( err, posts ) =>
        {
            if ( err )
            {
                console.log( err );
                res.json( {
                    result: "Error!",
                } );
            } else
            {
                res.json( posts );
            }
        } );
} );

/* GET a post by id. */
router.get( "/id/:_id", function ( req, res, next )
{
    let { _id } = req.params;
    Post.findOne( { _id } )
        .populate( "author", "_id first_name last_name" )
        .populate( "categories", "_id name" )
        .populate( "tags", "_id tag" )
        .exec( ( err, post ) =>
        {
            if ( err )
            {
                console.log( err );
                res.json( {
                    result: "Error!",
                } );
            } else
            {
                res.json( post );
            }
        } );
} );

/* Add a post */
router.post( "/add", function ( req, res, next )
{
    let {
        title,
        type,
        content,
        categories,
        tags,
        image,
        membership_plans } = req.body;

    new Post( {
        title,
        author: req.current_user?.id,
        type,
        content,
        categories,
        tags,
        image,
        membership_plans,
        status: 'published'
    } )
        .save( ( err, post ) =>
        {
            if ( err )
            {
                console.log( err );
                res.json( {
                    result: "Error!",
                } );
            } else
            {
                res.json( post );
            }
        } );
} );


/* Update a post */
router.put( "/update", function ( req, res, next )
{
    let {
        _id,
        title,
        type,
        content,
        categories,
        tags,
        image,
        membership_plans
     } = req.body;

     Post.findOneAndUpdate({_id}, {
        title,
        author: req.current_user.id,
        type,
        content,
        categories,
        tags,
        image,
        membership_plans,
        status: 'published'
    } )
        .exec( ( err, post ) =>
        {
            if ( err )
            {
                console.log( err );
                res.json( {
                    result: "Error!",
                } );
            } else
            {
                res.json( post );
            }
        } );
} );



/* Update a post */
router.delete( "/delete", function ( req, res, next )
{
    let {
        _id,
    } = req.body;

     Post.findOneAndUpdate({_id}, {
        status: 'deleted'
    } )
        .exec( ( err, post ) =>
        {
            if ( err )
            {
                console.log( err );
                res.json( {
                    result: "Error!",
                } );
            } else
            {
                res.json( post );
            }
        } );
} );


module.exports = router;
