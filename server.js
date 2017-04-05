'use strict';

let express = require('express');
let app = express();
app.disable('x-powered-by');

let path = require('path');

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app.use('/lib', express.static('node_modules'));

app.use('/', express.static('dist'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
    console.log('Listening on port %s', port);
});
