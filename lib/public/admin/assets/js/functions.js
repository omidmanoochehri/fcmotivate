const API_URL = window.location.origin.indexOf( "localhost" ) > -1 ? 'http://localhost:9000' : "https://cactusgroup.nl";
const MEDIA_URL = window.location.origin.indexOf( "localhost" ) > -1 ? 'http://localhost:9000/media' : "https://cactusgroup.nl/media";

function getCategories ( callback )
{
    jQuery.ajax( {
        url: API_URL + "/categories",
        cache: false,
        contentType: "JSON",
        success: callback,
        error: function ( err )
        {
            console.log( err );
        }
    } )
}

function doLogin ( username, password, callback )
{
    jQuery.ajax( {
        url: API_URL + "/users/login",
        method: "POST",
        data: {
            username,
            password
        },
        cache: false,
        dataType: "JSON",
        success: function ( result )
        {
            if ( result.token )
            {
                localStorage.setItem( "token", result.token );
                setCookie( 'token', result.token );
            }
            return callback( result );
        },
        error: function ( err )
        {
            console.log( err );
            showErrorAlert( "شماره همراه یا رمز عبور اشتباه است!" );
        }
    } )
}

function doLogOut ()
{
    eraseCookie( "token" );
    window.location = window.location.origin + "/admin/login";
}

function showErrorAlert ( message )
{
    Swal.fire( {
        title: 'خطا',
        text: message,
        confirmButtonText: "بسیار خب",
        confirmButtonColor: "#EC2027",
        animation: true
    } )
}

function showSuccessAlert ( message, confirmEvent = null )
{
    Swal.fire( {
        title: 'پیام',
        text: message,
        confirmButtonText: "بسیار خب",
        confirmButtonColor: "#EC2027",
        animation: true
    } ).then( confirmEvent ).catch( confirmEvent );
}

function unserializeFormData ( query )
{
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if ( query.slice( 0, 1 ) === '?' )
    {
        query = query.slice( 1 );
    }
    if ( query !== '' )
    {
        pairs = query.split( '&' );
        for ( i = 0; i < pairs.length; i += 1 )
        {
            keyValuePair = pairs[ i ].split( '=' );
            key = decodeURIComponent( keyValuePair[ 0 ] );
            value = ( keyValuePair.length > 1 ) ? decodeURIComponent( keyValuePair[ 1 ] ) : undefined;
            map[ key ] = value;
        }
    }
    return map;
}

function setCookie ( key, value )
{
    document.cookie = `${key}=${value}`;
    return true;
}

function getCookie ( cname, type = "string" )
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent( document.cookie );
    var ca = decodedCookie.split( ";" );
    for ( var i = 0; i < ca.length; i++ )
    {
        var c = ca[ i ];
        while ( c.charAt( 0 ) == " " )
        {
            c = c.substring( 1 );
        }
        if ( c.indexOf( name ) == 0 )
        {
            if ( type == "json" )
            {
                return JSON.parse( c.substring( name.length, c.length ) );
            } else
            {
                return c.substring( name.length, c.length );
            }
        }
    }
    return false;
}

function eraseCookie ( name )
{
    document.cookie = name + "=; Max-Age=-99999999;";
}

function addCommas ( nStr )
{
    nStr += '';
    var x = nStr.split( '.' );
    var x1 = x[ 0 ];
    var x2 = x.length > 1 ? '.' + x[ 1 ] : '';
    var rgx = /(\d+)(\d{3})/;
    while ( rgx.test( x1 ) )
    {
        x1 = x1.replace( rgx, '$1' + ',' + '$2' );
    }
    return x1 + x2;
}

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each( a, function ()
    {
        if ( o[ this.name ] )
        {
            if ( !o[ this.name ].push )
            {
                o[ this.name ] = [ o[ this.name ] ];
            }
            o[ this.name ].push( this.value || '' );
        } else
        {
            o[ this.name ] = this.value || '';
        }
    } );
    return o;
};