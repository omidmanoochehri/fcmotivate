var fs = require('fs');
const util = require('util');
const fileRename = util.promisify(fs.rename);

module.exports = async ( files, path, callback ) =>
{
    let mediaDir = __dirname + `/../media/`;
    let dir = __dirname + `/../media/${path}/`;
    
    if (!fs.existsSync(mediaDir)){
        fs.mkdirSync(mediaDir);
    }
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    for ( let key in files )
    {
        var uploadError;
        var imageTempPath = files[ key ].path;
        var imagesPath = __dirname + `/../media/${path}/` + files[ key ].name;
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