var express = require('express');
var router = express.Router();
var app = express();
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken');

app.use(expressJWT({secret : 'abc'}).unless({path: '/data'}));

router.get('/data', function(req, res){
    var mytoken =jwt.sign({abc : 'abc'}, 'abc');
    res.send('Got data '+ mytoken);
});

router.post('/data', function(req, res){
    res.send('Post data');
})

router.post('/Unless', function(req, res){
    res.send('Post data  unless');
})

module.exports= router;