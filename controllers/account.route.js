const express = require('express');
const db = require('../utils/db');
const router = express.Router();
const bcrypt = require('bcryptjs');
router.use(express.static('public'));
const uniqid = require('uniqid');
const userModel = require('../models/user.model');
const auth = require('../middleware/auth.mdw');
const moment = require('moment');
const speakeasy = require('speakeasy');
const menuCategory=require('../models/category-menu.model');
const categoryModel = require('../models/product_modle');

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: "localhost:3000", // hostname
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  service: 'gmail',
  tls: {
    rejectUnauthorized: false
  },

  auth: {
    user: 'tt5335084@gmail.com',
    pass: 'PHUC&123'
  }
});

router.get('/sendtoken',function(req,res){
  //generate token
  var secret = speakeasy.generateSecret({length:20});
  req.session.tempsecret = secret.base32;
  req.session.token = speakeasy.totp({
    secret: req.session.tempsecret,
    encoding: 'base32',
    step: 20
  });
  let mailOptions = {
    from: 'tt5335084@gmail.com',
    to: req.body.email,
    subject: 'Verify code', 
    html: `<span>Your verification code is </span><h1>${req.session.token}</h1><br><p>This verification code will expires after 10mins.`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Email sent: '+ info.response);
    }
  })
  req.session.authUser.password_lvl2 = req.session.token;
  console.log(req.session.token);
  res.json(true);
})

router.get('/register',function(req, res, next){
    res.render('layouts/SignUp',{layout:false});
})

router.post('/register',function(req, res, next){
    const hash = bcrypt.hashSync(req.body.pass, 10);
    const fullname = req.body.ho +" "+ req.body.ten;

    const user = {
        user_id: uniqid('U'),
        name: fullname,
        gender: null,
        dob: null,
        phone_number: null,
        email: req.body.email,
        password: hash,
        password_lvl2: req.session.token,
        avatar: null,
        description: null,
        role: 0
    }
    let mailOptions = {
      from: 'tt5335084@gmail.com',
      to: req.body.email,
      subject: 'Verify code', 
      html: `<span>Your verification code is </span><h1>${user.password_lvl2}</h1><br><p>This verification code will expires after 10mins.`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }else{
        console.log('Email sent: '+ info.response);
      }
    })
    //await userModel.add(user);
    //req.session.auth = true;
    req.session.authUser = user;
    res.redirect('/account/verification');
})

router.get('/verification', function(req,res){
  if(req.session.auth === true){
    res.redirect('/');
  }else{
    res.render('layouts/verification',{
      email: req.session.authUser.email,
      layout: false
    });
  }
})

router.post('/verification',async function(req,res){
    var tokenValidates = speakeasy.totp.verify({
      secret: req.session.tempsecret,
      encoding: 'base32',
      token: req.body.verification,
      step:20,
      window: 5
    });
    if(tokenValidates){
      await userModel.add(req.session.authUser);
      req.session.auth = true;
      res.redirect('/');
    }
    else res.render('layouts/verification',{
      email: req.session.authUser.email,
      err_message: 'Mã xác nhận chưa chính xác',
      layout: false
    })
})

router.get('/is-available', async function(req,res,next){
    const email = req.query.email;
    const user = await userModel.singleByEmail(email);
    if(user === null){
        return res.json(true);
    }
    res.json(false);
})

/*
router.get('/is-available-usname', async function (req, res) {
    const username = req.query.user;
    const user = await userModel.singleByUserName(username);
    if (user === null) {
      return res.json(true);
    }
    res.json(false);
  })
*/  

  router.get('/login', function (req, res) {
    res.render('layouts/SignIn', {
      layout: false
    });
  })
  
  router.post('/login', async function (req, res) {
    const user = await userModel.singleByEmail(req.body.email);
    if (user === null) {
      return res.render('layouts/SignIn', {
        layout: false,
        err_message: 'Tài khoản không hợp lệ !!!'
      });
    }
    if(user.role === 3 || user.role === 4){
      return res.render('layouts/SignIn', {
        layout: false,
        err_message: 'Tài khoản này đang bị quản trị viên khóa !!!'
      });
    }
    if(user.role === 5){
      const condition = {user_id: user.user_id};
      await db.del(condition,'user');
      return res.render('layouts/SignIn', {
        layout: false,
        err_message: 'Tài khoản này đã bị xóa !!!'
      });
    }
  
    const ret = bcrypt.compareSync(req.body.pass, user.password);
    if (ret === false) {
      return res.render('layouts/SignIn', {
        layout: false,
        err_message: 'Invalid password.'
      });
    }

    req.session.auth = true;
    req.session.authUser = user;
    var sql = `select course_id from bill where user_id = '${user.user_id}'`;
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      req.session.courses = null;
    }
    else req.session.courses = rows;
    console.log(req.session.courses);
  
    const url = req.session.retUrl || '/';
    res.redirect(url);
  })

  router.post('/logout', async function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;
    console.log("Logging out");
  
    const url = req.headers.referer || '/';
    console.log(url);
    res.redirect(url);
  })

  router.get('/logout', async function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;
    console.log("Logging out");
  
    res.redirect('/');
  })

  router.get('/profile',auth.auth, async function(req, res, next){
    if (req.session.authUser.role===1)
    {
        return res.redirect('/lecturer');
    }
    if (req.session.authUser.role===2)
    {
        return res.redirect('/admin');
    }
    const shopping_list=req.session.shopCart;
    const menuList=await menuCategory.getCateMenu();
    const submenuList=await menuCategory.getCateSubMenu();
    const allListMenu=[];
    const items=req.session.cart;
    const listHot=await categoryModel.all();
    const listNew=await categoryModel.getNewList();
    for (const i of menuList)
    {
      const menu_list=await categoryModel.allById(i.category_id);
      categoryModel.checkIsHaving(items,menu_list);
      if (req.session.authUser!=null)
      {
        const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
        await categoryModel.checkBill(menu_list,listBuy);
      }
      await categoryModel.checkHot(menu_list,listHot);
      await categoryModel.checkNew(menu_list,listNew);
      const item={
        menu: i.category_id,
        name: i.category_name,
        submenu: [],
        top4_course_menu: menu_list
      };
      allListMenu.push(item);
    }
  
    for (const j of submenuList)
    {
      for (i=0;i<allListMenu.length;i++)
      {
        if (allListMenu[i].menu===j.parent_id)
        {
          allListMenu[i].submenu.push(j);
        }
      }
    }

    const user = req.session.authUser;
    const firstName = user.name.substr(user.name.indexOf(' ')+1);
    const lastName = user.name.substr(0, user.name.indexOf(' '));
    res.render('layouts/AccountInformation',{
      shopping_list,
      items,
      menuList: menuList,
      empty_menu: menuList.length!==0,
      allListMenu: allListMenu,
      layout:false,
      user,
      firstName,
      lastName
    });
  })

  router.get('/wishlist',auth.auth, async function(req, res){
    if (req.session.authUser.role===1)
    {
        return res.redirect('/lecturer');
    }
    if (req.session.authUser.role===2)
    {
        return res.redirect('/admin');
    }
    const shopping_list=req.session.shopCart;
    const menuList=await menuCategory.getCateMenu();
    const submenuList=await menuCategory.getCateSubMenu();
    const allListMenu=[];
    const items=req.session.cart;
    const listHot=await categoryModel.all();
    const listNew=await categoryModel.getNewList();
    for (const i of menuList)
    {
      const menu_list=await categoryModel.allById(i.category_id);
      categoryModel.checkIsHaving(items,menu_list);
      if (req.session.authUser!=null)
      {
        const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
        await categoryModel.checkBill(menu_list,listBuy);
      }
      await categoryModel.checkHot(menu_list,listHot);
      await categoryModel.checkNew(menu_list,listNew);
      const item={
        menu: i.category_id,
        name: i.category_name,
        submenu: [],
        top4_course_menu: menu_list
      };
      allListMenu.push(item);
    }
  
    for (const j of submenuList)
    {
      for (i=0;i<allListMenu.length;i++)
      {
        if (allListMenu[i].menu===j.parent_id)
        {
          allListMenu[i].submenu.push(j);
        }
      }
    }

    const user = req.session.authUser;
    const firstName = user.name.substr(user.name.indexOf(' ')+1);
    const lastName = user.name.substr(0, user.name.indexOf(' '));
    const fa_list=req.session.cart;

    await categoryModel.checkHot(fa_list,listHot);
    await categoryModel.checkNew(fa_list,listNew);

    const cart_list=req.session.shopCart;
    //console.log(fa_list[0].course_id);
    for (i=0;i<cart_list.length;i++)
    {
      for (j=0;j<fa_list.length;j++)
      {
        if (cart_list[i].course_id===fa_list[j].course_id)
        {
          fa_list[j].isHaving=1;
          break;
        }
      }
    }
    res.render('layouts/AccountFaCart',{
      shopping_list,
      items,
      menuList: menuList,
      empty_menu: menuList.length!==0,
      allListMenu: allListMenu,
      user,
      firstName,
      lastName,
      fa_list: fa_list,
      layout:false,
    });
  })

  router.post('/profile', async (req, res) => {
    console.log(req.body)
    const date = moment(req.body.dob).format("YYYY-MM-DD");
    const changedUser = {
      name:  req.body.ho + ' ' + req.body.ten,
      email: req.body.email,
      phone_number: req.body.phone_number,
      dob: date,
      gender: req.body.gender
    };
    await userModel.changeInfo(changedUser);
    const newUser = await userModel.singleByEmail(req.body.email);
    req.session.authUser = newUser;
    console.log(newUser);
    res.redirect('/account/profile');
  })


  router.post('/password-change', async function (req, res) {
    const user = req.session.authUser;
    console.log(user)
    const firstName = user.name.substr(user.name.indexOf(' ')+1);
    const lastName = user.name.substr(0, user.name.indexOf(' '));
    const ret = bcrypt.compareSync(req.body.old_ps, user.password);
    if (ret === false) {
      return res.render('layouts/AccountInformation', {
        layout: false,
        error_message: "Incorrect password",
        user,
        firstName, lastName
      })
    }

    if (req.body.new_ps !== req.body.confirm_ps) {
      return res.render('layouts/AccountInformation', {
        layout: false,
        error_message: "Confirmed password must be similar to new password",
        user,
        firstName, lastName
      })
    }
    console.log(user)

    const newPassword = bcrypt.hashSync(req.body.new_ps, 10);
    await userModel.changePassword(user.user_id, newPassword);
    const newUser = await userModel.singleByEmail(user.email);
    req.session.authUser = newUser;
    res.redirect('/account/profile');
  })

module.exports = router;