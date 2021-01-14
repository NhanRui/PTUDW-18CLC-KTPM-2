const express = require('express');
const router = express.Router();
const lecturerModel = require('../models/lecturer_model');
const userModel = require('../models/user.model');
const moment = require('moment');
const db = require('../utils/db');
const uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
router.use(express.static('public'));
router.use(express.static('upload'));

router.get('/', function (req, res) {  //Nhan them de test
    res.render('vwAdmin/adminLayout',{layout: false});
  });

router.get('/student', async function(req,res){
  const list = await userModel.brief();
  const lock = await userModel.lock();
  var length = 0;
  var length1 = 0;
  if(lock !== null){
    length = lock.length;
  }
  if(list !== null){
    length1 = list.length;
  }
  res.render('vwAdmin/manageStudent', {
    layout: './../vwAdmin/adminLayout',
    list: list,
    list_empty: list === null,
    lock: lock,
    lock_empty: lock === null,
    lock_length: length,
    list_length: length1
  })
})

router.get('/student/lock/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 3;
  await userModel.patch(user);
  res.json(user);
})

router.get('/student/open/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 0;
  await userModel.patch(user);
  res.json(user);
})

router.get('/student/delete/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 5;
  await userModel.patch(user);
  res.json(user);
})

router.get('/student/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  if(user.dob !== null) user.dob = moment(user.dob).format("DD/MM/YYYY");
  res.json(user);
})

router.get('/lecturer', async function(req,res){
  const list = await userModel.briefLect();
  const lock = await userModel.lockLect();
  var length = 0;
  var length1 = 0;
  if(lock !== null){
    length = lock.length;
  }
  if(list !== null){
    length1 = list.length;
  }
  res.render('vwAdmin/manageLecturer', {
    layout: './../vwAdmin/adminLayout',
    list: list,
    list_empty: list === null,
    lock: lock,
    lock_empty: lock === null,
    lock_length: length,
    list_length: length1
  })
})

router.get('/lecturer/lock/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 4;
  await userModel.patch(user);
  res.json(user);
})

router.get('/lecturer/open/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 1;
  await userModel.patch(user);
  res.json(user);
})

router.post('/lecturer/add',async function(req,res){
  const hash = bcrypt.hashSync(req.body.password, 10);
    const user = {
        user_id: uniqid('U'),
        name: req.body.name,
        gender: null,
        dob: null,
        phone_number: null,
        email: req.body.email,
        password: hash,
        password_lvl2: req.session.token || null,
        avatar: '/images/male_lecturer.jpg' || null,
        description: null,
        role: 1
    }
    db.add(user,'user');
    res.redirect('/admin/lecturer');
})

router.get('/lecturer/delete/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  user.role = 5;
  await userModel.patch(user);
  res.json(user);
})

router.get('/lecturer/:id', async function(req,res){
  const user = await userModel.singleById(req.params.id);
  if(user.dob !== null) user.dob = moment(user.dob).format("DD/MM/YYYY");
  res.json(user);
})

router.get('/category',async function(req,res){
  const cat = await userModel.cat();
  res.render('vwAdmin/manageCategory',{
    layout: './../vwAdmin/adminLayout',
    cat: cat,
    cat_empty: cat.length === 0
  })
})

router.post('/category/add',async function(req,res){
  const id= uniqid('CAT');
  const cat = {
    category_id : id,
    category_name : req.body.name1,
    parent_id : req.body.parent_id
  }
  await userModel.addCat(cat);
  res.redirect('/admin/category');
})

router.post('/category/addCat',async function(req,res){
  const id= uniqid('CAT');
  const cat = {
    category_id : id,
    category_name : req.body.name2,
    parent_id: null
  }
  await userModel.addCat(cat);
  res.redirect('/admin/category');
})

router.get('/category/delete/:id', async function(req,res){
  const condition = {category_id: req.params.id};
  const user = await db.del(condition, 'category');
  res.json(true);
})

router.get('/courses',async function(req,res){
  const sql='select course_id,course_name from course where active=0';
  const [rows,fields] = await db.load(sql);
  res.render('vwAdmin/manageCourse',{
    layout: './../vwAdmin/adminLayout',
    cou: rows,
    cou_empty: rows.length === 0,
  })
})

router.get('/course/delete/:id', async function(req,res){
  const condition = {course_id: req.params.id};
  const active = {active: 1};
  /*
  const [rows,fields] = await db.load(`select list_id from lesson_list where course_id ='${req.params.id}'`);
  for(var i=0;i<rows.length;i++){
    var temp = {list_id: rows[i].list_id};
    const[rows1, fields1] = await db.load(`select video_id from video where list_id='${temp.list_id}'`);
    for(var j=0;j<rows1.length;j++){
      var temp1={video_id: rows1[j].video_id};
      await db.del(temp1,'complete_video');
    }
    await db.del(temp, 'video');
  }
  await db.del(condition,'lesson_list');
  await db.del(condition,'favourite');
  await db.del(condition,'bill');
  // khoong bieet nen xoa final bill ko, taij vi no con chua may bill khac nua
  await db.del(condition,'shopping_cart');
  await db.del(condition,'star_rating');
  await db.del(condition, 'course');
  */
  await db.patch(active,condition,'course');
  res.json(true);
})

module.exports = router;