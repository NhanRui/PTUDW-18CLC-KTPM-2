const express = require('express');
const router = express.Router();
const lecturerModel = require('../models/lecturer_model');
const userModel = require('../models/user.model');
const moment = require('moment');
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

module.exports = router;