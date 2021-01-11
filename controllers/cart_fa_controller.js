const express = require('express');
const cartModel=require('../models/cart.model');
const router = express.Router();
const menuCategory=require('../models/category-menu.model');
const categoryModel = require('../models/product_modle');

router.get('/',async function(req,res){
    const shopping_list=req.session.shopCart;
    const menuList=await menuCategory.getCateMenu();
    const submenuList=await menuCategory.getCateSubMenu();
    const allListMenu=[];
    const items=req.session.cart;
    for (const i of menuList)
    {
      const menu_list=await categoryModel.allById(i.category_id);
      categoryModel.checkIsHaving(items,menu_list);
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

    const shoppingCart=req.session.shopCart;
    res.render('../views/layouts/user_Cart.hbs', {
        shopping_list,
        items,
        menuList: menuList,
        empty_menu: menuList.length!==0,
        allListMenu: allListMenu,
        shoppingCart,
        layout: false
    })
})

router.post('/add', async function(req, res){
    //console.log(req.session.authUser.user_id);
    faCart=await cartModel.getFaCartById(req.session.authUser.user_id);
    let flag=true;
    const item = await cartModel.getFaItem(req.body.id);
    for (const i of faCart)
    {
        if (i.course_id===req.body.id)
        {
            await cartModel.removeByID(req.session.cart,item.course_id,req.session.authUser.user_id)
            flag=false;
            break;
        }
    }
    if (flag){
        await cartModel.add(req.session.cart,req.session.authUser.user_id, item);
    }
    //cartModel.add(req.session.cart, item);
    res.redirect(req.headers.referer)
})

router.post('/addCart', async function(req, res){
    //console.log(req.session.authUser.user_id);
    shopCart=await cartModel.getBuyCartById(req.session.authUser.user_id);
    let flag=true;
    const item = await cartModel.getCartItem(req.body.id);
    for (const i of shopCart)
    {
        if (i.course_id===req.body.id)
        {
            //await cartModel.removeByID(req.session.shopCart,item.course_id,req.session.authUser.user_id)
            res.redirect('/cart');
            break;
        }
    }
    if (flag){
        await cartModel.addCart(req.session.shopCart,req.session.authUser.user_id, item);
        await cartModel.removeByID(req.session.cart,item.course_id,req.session.authUser.user_id);
    }
    //cartModel.add(req.session.cart, item);
    res.redirect(req.headers.referer)
})

router.post('/BuyAll', async function(req, res){
    //shopCart=await cartModel.getBuyCartById(req.session.authUser.user_id);
    if (req.session.shopCart.length===0)
    {
        res.redirect(req.headers.referer);
    }
    const id=await cartModel.addBillTotal(req.session.shopCart);
    await cartModel.addBill(req.session.shopCart,id,req.session.authUser.user_id);
    res.redirect(req.headers.referer);
})

router.post('/del', async function(req, res){
    //console.log(req.session.authUser.user_id);
    await cartModel.removeByIDCart(req.session.shopCart,req.body.id,req.session.authUser.user_id);
    //cartModel.add(req.session.cart, item);
    res.redirect(req.headers.referer)
})

module.exports=router;