const express = require('express');
const router = express.Router();
var app = express();
var admin =express();
var Summary = require('../models/summary');
var fs = require('fs');

app.use(express.static('public'));
//register
// router.get('/', (req, res, next) => {
//     res.send('Index');
// });
//app.locals.a = 'achal';
//console.log('name'+app.locals);
admin.get('/',function(req,res){
   // var r = {hello :req.query.a};
    console.log(admin.mountpath);
    res.send('admin');//+this.a);
});
admin.post('/',function(req,res){
    console.log(admin.mountpath);
    res.send('admin post');//+this.a);
});
app.use('/admin',admin);

app.get('/txtRead',function (req, res){
    fs.readFile('public/read.txt', function(err, data){
        if(err)
            throw arr;
       // debugger;
        res.send(data.toString());
    })
})

app.listen(2000);

router.get('/register', (req, res, next) => {
    res.send('Register');
});

module.exports = router;