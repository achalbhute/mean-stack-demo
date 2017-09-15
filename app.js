const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

const users = require('./routers/users');
const tasks = require('./routers/tasks');
const jwtPoc = require('./routers/JWTpoc');

// port no.
const port = 3000;

 app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));
// Body parser middleware
app.use('/user', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', tasks);

app.use('/jwt', jwtPoc);

// index Route
app.get('/achal', (req, res) =>{
    res.send('+222+2 endpoint')
});


mongoose.connect('mongodb://10.51.235.20:27017/naharPariyojnaDB')
 // .then(() =>  console.log('connection succesful'))
//  .catch((err) => console.error(err));
mongoose.connection.on('connected', () => {
 	console.log('Connected to database ');
});

// var user = require('./summary');
// app.get('/summary', user.seeResults);






// start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});