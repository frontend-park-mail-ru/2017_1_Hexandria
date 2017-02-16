'use strict';

let express = require('express');
let app = express();
const staticPath = __dirname + '/public';

app.disable('x-powered-by');

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(express.static(staticPath));
app.use('/lib', express.static('node_modules'));


app.get('/', function(req, res){
    res.sendFile('index.html', {root: staticPath});
});

app.get('/login', function(req, res){
    res.sendFile('login.html', {root: staticPath});
});

app.get('/signup', function(req, res){
    res.sendFile('signup.html', {root: staticPath});
});

app.get('/scoreboard', function(req, res){
    res.sendFile('scoreboard.html', {root: staticPath});
});

app.get('/singleplayer', function(req, res){
    res.sendFile('singleplayer.html', {root: staticPath});
});

app.get('/multiplayer', function(req, res){
    res.sendFile('multiplayer.html', {root: staticPath});
});

app.get('/about', function(req, res){
    res.sendFile('about.html', {root: staticPath});
});

app.get('/test', function(req, res){
    res.sendFile('test.html', {root: staticPath});
});


const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
    console.log('Listening on port %s', port);
})
