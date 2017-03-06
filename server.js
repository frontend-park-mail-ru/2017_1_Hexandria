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


app.use('/', express.static('public'));


const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
    console.log('Listening on port %s', port);
});
