const express = require('express');
const categoryModel = require('../models/product_modle');
const router = express.Router();
const menuCategory=require('../models/category-menu.model');

router.get('/', async function (req, res) {
    const list_music_menu=categoryModel.all_music_menu();
    const menuList=await menuCategory.getCateMenu();
    const submenuList=await menuCategory.getCateSubMenu();
    let numberOfitems=0;
    const items=req.session.cart;
    //console.log(submenuList);
    const allListMenu=[];
    for (const i of menuList)
    {
      const menu_list=await categoryModel.allById(i.category_id);
      numberOfitems+=categoryModel.checkIsHaving(items,menu_list);
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
      //console.log(j);
      for (i=0;i<allListMenu.length;i++)
      {
        if (allListMenu[i].menu===j.parent_id)
        {
          allListMenu[i].submenu.push(j);
        }
        //console.log(allListMenu[i].top4_course_menu);
      }
    }
    var rank_view_1=0;
    var rank_view_2=4;
    var rank_view_3=8;
    const list = await categoryModel.all();
    const top10_view_1=await categoryModel.top10_view_1();
    const top10_view_2=await categoryModel.top10_view_2();
    const top10_view_3=await categoryModel.top10_view_3();

    const top10_new_1=await categoryModel.top10_new_1();
    const top10_new_2=await categoryModel.top10_new_2();
    const top10_new_3=await categoryModel.top10_new_3();

    numberOfitems+=categoryModel.checkIsHaving(items,list);
    numberOfitems+=categoryModel.checkIsHaving(items,top10_view_1);
    numberOfitems+=categoryModel.checkIsHaving(items,top10_view_2);
    numberOfitems+=categoryModel.checkIsHaving(items,top10_view_3);

    numberOfitems+=categoryModel.checkIsHaving(items,top10_new_1);
    numberOfitems+=categoryModel.checkIsHaving(items,top10_new_2);
    numberOfitems+=categoryModel.checkIsHaving(items,top10_new_3);

    categoryModel.rank_view(top10_view_1,rank_view_1);
    categoryModel.rank_view(top10_view_2,rank_view_2);
    categoryModel.rank_view(top10_view_3,rank_view_3);

    categoryModel.rank_view(top10_new_1,rank_view_1);
    categoryModel.rank_view(top10_new_2,rank_view_2);
    categoryModel.rank_view(top10_new_3,rank_view_3);

    const list_top8=categoryModel.all_top8();
    const list_top8bs=categoryModel.all_top8bs();
    const list_english_menu=categoryModel.all_english_menu();
    const list_IT_menu=categoryModel.all_IT_menu();

    res.render('layouts/index', {
      product_popular: list,
      empty: list.length === 0,
      product_top8: list_top8,
      empty_top8: list_top8.length === 0,
      product_top8bs: list_top8bs,
      empty_top8bs: list_top8bs.length === 0,
      product_menu_eng: list_english_menu,
      empty_menu_eng: list_english_menu.length===0,
      product_menu_music: list_music_menu,
      empty_menu_music: list_music_menu.length===0,
      product_menu_IT: list_IT_menu,
      empty_menu_IT: list_IT_menu.length===0,
      items,
      numberOfitems: numberOfitems!==0,
      top10_view_1: top10_view_1,
      empty_view_1: top10_view_1.length!==0,
      top10_view_2: top10_view_2,
      empty_view_2: top10_view_2.length!==0,
      top10_view_3: top10_view_3,
      empty_view_3: top10_view_3.length!==0,
      top10_new_1: top10_new_1,
      empty_new_1: top10_new_1.length!==0,
      top10_new_2: top10_new_2,
      empty_new_2: top10_new_2.length!==0,
      top10_new_3: top10_new_3,
      empty_new_3: top10_new_3.length!==0,
      menuList: menuList,
      empty_menu: menuList.length!==0,
      allListMenu: allListMenu
    });
  })

module.exports = router;  