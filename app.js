var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

var posts = [
    { tittle: "My tittle", content: "Test content" },
    { tittle: "My tittle 1", content: "Test content 1" },
    { tittle: "My tittle 2", content: "Test content 2" }
];

app.get( "/", function ( req, res) {
    res.render( 'index.ejs', { posts: posts } );
} );

app.get( "/post/:id", function ( req, res ) {
    var id = req.params.id;
    res.render( 'post.ejs', { post: posts[ id - 1 ] });
} );

app.get( '/write', function ( req, res ) {
    res.render( 'write.ejs' );
});

app.post( '/write', function ( req, res ) {
    var tittle = req.body.tittle,
        content = req.body.content;

    posts.push( { tittle: tittle, content: content } );

    res.redirect( '/' );
});

app.get('/deleted/:id', function ( req, res ){
    var id = req.params.id;

    posts.splice(id, 1);

    res.redirect( '/' );
});

app.listen( 3000, function () {
    console.log( " Work on port : 3000 " );
} );