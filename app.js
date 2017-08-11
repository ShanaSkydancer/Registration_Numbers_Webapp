'use strict';

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const $ = require("jquery");
const format = require("util").format;

//Connect Mongoose to your .js and have it access the MongoBD
// mongoose.createConnection('mongodb://localhost/registration_numbers');


var app = express();

//Folders being accessed
//'public' is the folder that styling, fonts, images are in
app.use(express.static('public'));
//'views' is the folder where my layouts are in
app.use(express.static('views'));
//'routes' is where my specific handlebar templates and js functions are
app.use(express.static('routes'));

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
// const FilterListRoutes = require("./filterList");

//Access the function
const regiListRoutes = RegiListRoutes();
// const filterListRoutes = FilterListRoutes();

//Using "/" makes it the "index page" ie it has no route
app.get('/', (req, res) => {
    res.render("index");
});

//Showing the reginumbers
app.get('/reginumbers', regiListRoutes.index);
//Route to add regitnumbers
app.get('/reginumbers/add', regiListRoutes.add);
//Route that filters witht the radio buttons
app.get('/reginumbers', regiListRoutes.filter);
//Post data
app.post('/reginumbers/add', regiListRoutes.add);

//Use debugger with node-inspector
//Used it at the beginning of my code but it can go anywhere or I can create a break in the inspector
debugger;

//Hosts my server
  var server = app.listen(app.get("port"), () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Registration Numbers Webapp listening at http://%s:%s', host, port);
});

//app.post registratonnumbers
    // regiData = {regiDisplay : regiinput};
  // var getRegiNumber = (regiinput, (err, result) => {
  //   if (result){
  //     console.log("Error 1");
  //     regiData = {regiDisplay : regiinput};
  //     res.render("index", regiData);
  //     req.flash('info', 'Registration number added!');
  //   }
  //   if (!result){
  //     console.log("Error 1");
  //     regiData = {regiDisplay : regiinput};
  //     res.render("index", regiData);
  //     req.flash('error', 'Do no leave the Registration number blank!');
  //   }
  //   if (err){
  //     console.log("Error 1");
  //     regiData = {regiDisplay : regiinput};
  //     res.render("index", regiData);
  //     req.flash('error', 'Enter a reigstration number!');
  //   } else {
  //       console.log("Error 1");
  //       res.render("index", regiData);
  //       req.flash('error', 'Something went wrong...!');
  //   }
  // })
  // var regiList = FilterList(allregiinputs, radioButt)
  //   regiData = {regiDisplay : regiList};
  //   res.render("index", regiData)
  //   res.redirect('/reginumbers')