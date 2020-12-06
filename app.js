const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
var path = require('path');

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));

var handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  //partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'index',
  extname: 'hbs'
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use(express.urlencoded({
  extended: true
}));

app.get('/SignIn', function (req, res) {
  res.render('home',{layout: 'SignIn.hbs'});
});

app.get('/SignUp', function (req, res) {
  res.render('home',{layout: 'SignUp.hbs'});
});

/*
app.get('/lecturer', function (req, res) {  //Nhan them de test
  res.render('information.hbs',{layout: 'lecturer.hbs'});
});

app.get('/faq', function (req, res) {
  res.render('home',{layout: 'faq.hbs'});
});

app.get('/CourseActivate', function (req, res) {
  res.render('home',{layout: 'CourseActivate.hbs'});
});

app.get('/BecomeInstructor', function (req, res) {
  res.render('home',{layout: 'BecomeInstructor.hbs'});
});

app.get('/AccountInformation', function (req, res) {
  res.render('home',{layout: 'AccountInformation.hbs'});
});

app.get('/search_course', function (req, res) {
  //Can render for this layout
  res.render('search_site.hbs',{layout: 'search-item.hbs'});
});

// app.get('/MyCourse', function (req, res) {
//   //Can render for this layout
//   res.render('home',{layout: 'MyCourses.hbs'});
// });

//app.use('/lecturer', require('./controllers/lecturer_controller'));
app.use('/MyCourse', require('./controllers/courses_controller'));

*/
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce app is listening at http://localhost:${PORT}`)
})