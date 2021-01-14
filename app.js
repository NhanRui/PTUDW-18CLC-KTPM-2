const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral=require('numeral');
var mongoose=require('mongoose');
var path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config/default.json');
const auth=require('./middleware/auth.mdw');
const { category } = require('./models/lecturer_model');
const cartModel=require('./models/cart.model');
const { log } = require('console');

const app = express();

//-----------------------------------middle ware------------------------------
app.use(express.static('public'));
app.use('/public',express.static('public'));
app.use('/upload',express.static('upload'));
app.use(morgan('dev'));

//store session
const sessionStore = new MySQLStore(config.mysql);

app.set('trust proxy', 1)
app.use(session({
  secret: 'SECRET_KEY',
  resave: false,
  saveUnitialized: true,
  //store: sessionStore,
  cookie: {
    //secure: true
  }
}));

var handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'index',
  extname: 'hbs',
  helpers:{
    format_number(val){
      return numeral(val).format('0,0') + " đ";
    }
  }
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

const hbs = exphbs.create({});

  hbs.handlebars.registerHelper( "when",function(operand_1, operator, operand_2, options) {
    var operators = {
     'eq': function(l,r) { return l == r; },
     'noteq': function(l,r) { return l != r; },
     'gt': function(l,r) { return Number(l) > Number(r); },
     'or': function(l,r) { return l || r; },
     'and': function(l,r) { return l && r; },
     '%': function(l,r) { return (l % r) === 0; }
    }
    , result = operators[operator](operand_1,operand_2);

    if (result) return options.fn(this);
    else  return options.inverse(this);
  });

app.use(express.urlencoded({
  extended: true
}));

//---local---
require('./middleware/locals.mdw')(app);
app.use(async function (req,res,next){
  if(typeof(req.session.auth) === 'undefined'){
    req.session.auth = false;
  }
  if (req.session.auth===false){
    req.session.cart=[];
    req.session.shopCart=[];
  }
  else{
    req.session.cart=await cartModel.getFaCartById(req.session.authUser.user_id);
    req.session.shopCart= await cartModel.getBuyCartById(req.session.authUser.user_id)
  }
  res.locals.cid = null;
  res.locals.auth = req.session.auth;
  res.locals.authUser = req.session.authUser;
  res.locals.cartSummary=cartModel.getNumberOfItems(req.session.cart);
  res.locals.shopCartSummary=cartModel.getNumberOfItems(req.session.shopCart);
  res.locals.cartTotal=cartModel.getPriceOfItems(req.session.cart);
  res.locals.shopcartTotal=cartModel.getPriceOfItems(req.session.shopCart);
  next();
})

//--------------------------------view------------------------------------------
app.all('/',auth.authIndex,require('./controllers/product_controller'));
app.use('/index',auth.authIndex, require('./controllers/product_controller'));
app.use('/', require('./controllers/course_detail_controller'));
app.use('/cart/',auth.authIndexCart,require('./controllers/cart_fa_controller'));

app.use('/account',require('./controllers/account.route'));
app.use('/search',auth.authIndex,require('./controllers/product_search_controller'));
app.use('/watch-video'/*,auth.auth*/,require('./controllers/video_controller'));
app.get('/signin', function (req, res) {
  res.render('home', { layout: 'SignIn.hbs' });
});

app.get('/signup', function (req, res) {
  res.render('home', { layout: 'SignUp.hbs' });
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

/*app.get('/search_course', function (req, res) {
  //Can render for this layout
  res.render('search_site.hbs',{layout: 'search-item.hbs'});
});*/

// app.get('/MyCourse', function (req, res) {
//   //Can render for this layout
//   res.render('home',{layout: 'MyCourses.hbs'});
// });

app.use('/lecturer',auth.authLecturer, require('./controllers/lecturer_controller'));
app.use('/admin',auth.authAdmin, require('./controllers/admin_controller'));
app.use('/MyCourse',auth.authIndexCart, require('./controllers/courses_controller'));

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce app is listening at http://localhost:${PORT}`)
})