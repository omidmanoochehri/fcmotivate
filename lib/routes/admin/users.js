var express = require( 'express' );
var router = express.Router();
var formidable = require( 'formidable' );
var fs = require( 'fs' );
const User = require( '../../models/User' );
const { ROUTE_CONFIG } = require( "../../helpers/routesConfig" );
const { getAllAdmins } = require( '../../helpers/dbQueris' );

router.get( '/add', getAllAdmins, function ( req, res, next )
{
    let { admins } = req;
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addUser",
        title: 'Add New User',
        action: "add",
        users: admins,
        currentUser: req.currentUser
    } );
} );

/* GET edit user page. */
router.get( '/edit/:user_id', getAllAdmins, function ( req, res, next )
{
    let { user_id } = req.params;
    let { admins } = req;
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "addUser",
        title: 'Add New User',
        action: "edit",
        user: admins.filter( c => c.id == user_id )[ 0 ],
        users: admins,
        currentUser: req.currentUser
    } );

} );

router.post( '/', function ( req, res, next )
{
    let { id, action } = req.body;
    if ( action === "delete" )
    {

        User.deleteUser( { id }, result =>
        {
            User.getUsers( function ( users )
            {
                res.render( 'admin/containers/index', {
                    ...ROUTE_CONFIG,
                    page: "users",
                    title: 'Users',
                    users,
                    users_role: "admin",
                    response: { result },
                    currentUser: req.currentUser
                } );
            } );
        } )


    } else
    {

        var form = new formidable.IncomingForm();
        form.parse( req, async function ( err, fields, files )
        {
            let { id, action, name, slug } = fields;

            action === "edit" ?
                User.updateUser( { name, slug }, { "ID": id }, function ( result )
                {
                    User.getUsers( function ( users )
                    {
                        res.render( 'admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "users",
                            title: 'Users',
                            users,
                            users_role: "admin",
                            response: { result },
                            currentUser: req.currentUser
                        } );

                    } )
                } ) :
                User.createUser( { name, slug }, function ( result )
                {
                    User.getUsers( function ( users )
                    {
                        res.render( 'admin/containers/index', {
                            ...ROUTE_CONFIG,
                            page: "users",
                            title: 'Users',
                            users,
                            users_role: "admin",
                            response: { result },
                            currentUser: req.currentUser
                        } );
                    } )
                } );


        } );
    }
} );

router.get( '/', getAllAdmins, function ( req, res, next )
{
    let { currentUser, admins } = req;
    res.render( 'admin/containers/index', {
        ...ROUTE_CONFIG,
        page: "users",
        title: 'Users',
        users: admins,
        users_role: "admin",
        response: null,
        currentUser
    } );

} )

module.exports = router;