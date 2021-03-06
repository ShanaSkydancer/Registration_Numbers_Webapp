'use strict';

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const $ = require("jquery");
const format = require("util").format;

var app = express();

//Folders being accessed
//'public' is the folder that styling, fonts, images are in
app.use(express.static('public'));
//'views' is the folder where my layouts are in
app.use(express.static('views'));
//'routes' is where my specific handlebar templates and js functions are
app.use(express.static('routes'));

//Connect Mongoose to your .js and have it access the MongoBD
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registration_numbers";
mongoose.connect(mongoURL);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the DB!');
});

var regiSchema = mongoose.Schema({
  regiNum: String
});
const regiNumModel = mongoose.model('regiNumModel', regiSchema);

//Port and environment variable
app.set('port', (process.env.PORT || 3000));

//Use ExpressHandlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Use bodyParser
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Use flash for error messages
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(flash());

//Functions being accessed
const RegiListRoutes = require("./regiNumbers");

//Access the function
const regiListRoutes = RegiListRoutes(regiNumModel);

//Using "/" makes it the "index page" i.e. it has no route
app.get('/', (req, res) => {
    res.render("index");
});

//Showing the reginumbers
app.get('/reginumbers', regiListRoutes.index);
//Route to add regitnumbers
app.get('/reginumbers/add', regiListRoutes.add);
//Route that filters witht the radio buttons
app.get('/reginumbers/filter', regiListRoutes.filter);
//Post data
app.post('/reginumbers/add', regiListRoutes.add);
app.post('/reginumbers/filter', regiListRoutes.filter);

//Hosts my server
  var server = app.listen(app.get("port"), () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Registration Numbers Webapp listening at http://%s:%s', host, port);
});