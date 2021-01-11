const express = require('express');
const categoryModel = require('../models/product_modle');
const router = express.Router();
const {paginate}=require('../config/default.json');
const menuCategory=require('../models/category-menu.model');

router.get('/keyword/:txt',async function (req, res){
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

  const txtSearch=req.params.txt
  //chưa xong
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countBySearch(txtSearch);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  const list = await categoryModel.getCateBySearch(txtSearch,offset);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id: txtSearch,
      categoryById: false
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    layout: "search-item.hbs",
  });
})

router.post('/',async function (req, res,next){
  const link='/search/keyword/'+req.body.contentSearch;
  res.redirect(link);
})




router.get('/:id', async function (req, res) {
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

  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  const list = await categoryModel.getCateListByPage(catId,offset);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  const listHot=await categoryModel.all();
  await categoryModel.checkHot(list,listHot);
  const listNew=await categoryModel.getNewList();
  await categoryModel.checkNew(list,listNew);
  console.log(req.session.cart);
  await categoryModel.checkisHaving(req.session.cart,list);
  console.log(list);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      categoryById: true
    },
    page_numbers,
    previousPage,
    nextPage,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/:condition', async function (req, res) {
  let cd="";
  const condition=req.params.condition;
  var active_5=true;
  var active_up_4= true;
  var active_up_3= true;
  var active_down_3= true;
  if (condition==="rating-5")
  {
    cd="=5";
    active_5=true;
    active_up_4= false;
    active_up_3= false;
    active_down_3= false;
  }
  if (condition==="rating-up-4")
  {
    cd=">=4";
    active_5=false;
    active_up_4= true;
    active_up_3= false;
    active_down_3= false;
  }
  if (condition==="rating-up-3")
  {
    cd=">=3";
    active_5=false;
    active_up_4= false;
    active_up_3= true;
    active_down_3= false;
  }
  if (condition==="rating-down-3")
  {
    cd="<3";
    active_5=false;
    active_up_4= false;
    active_up_3= false;
    active_down_3= true;
  }
  const at_5=active_5;
  const at_up_4=active_up_4;
  const at_up_3=active_up_3;
  const at_down_3=active_down_3;

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

  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCatCondition(catId,cd);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  
  const list = await categoryModel.getStarCourseCondition(catId,offset,cd);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      categoryById: true,
      active_5:at_5,
      active_up_4:at_up_4,
      active_up_3:at_up_3,
      active_down_3:at_down_3
    },
    page_numbers,
    previousPage,
    nextPage,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/keyword/:id/:condition', async function (req, res) {
  let cd="";
  const condition=req.params.condition;
  var active_5=true;
  var active_up_4= true;
  var active_up_3= true;
  var active_down_3= true;
  if (condition==="rating-5")
  {
    cd="=5";
    active_5=true;
    active_up_4= false;
    active_up_3= false;
    active_down_3= false;
  }
  if (condition==="rating-up-4")
  {
    cd=">=4";
    active_5=false;
    active_up_4= true;
    active_up_3= false;
    active_down_3= false;
  }
  if (condition==="rating-up-3")
  {
    cd=">=3";
    active_5=false;
    active_up_4= false;
    active_up_3= true;
    active_down_3= false;
  }
  if (condition==="rating-down-3")
  {
    cd="<3";
    active_5=false;
    active_up_4= false;
    active_up_3= false;
    active_down_3= true;
  }
  const at_5=active_5;
  const at_up_4=active_up_4;
  const at_up_3=active_up_3;
  const at_down_3=active_down_3;

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

  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCatSearchCondition(catId,cd);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  
  const list = await categoryModel.getStarCourseSearchCondition(catId,offset,cd);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      categoryById: false,
      active_5:at_5,
      active_up_4:at_up_4,
      active_up_3:at_up_3,
      active_down_3:at_down_3
    },
    page_numbers,
    previousPage,
    nextPage,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/mode/:condition', async function (req, res) {
  const condition=req.params.condition;
  let cd=""
  let mode="";
  let ms=false;
  let mo=false;
  let pd=false;
  let pa=false;
  let n=false

  if (condition==="most-study")
  {
    cd="number_student";
    mode="DESC"
    ms=true;
    mo=false;
    pd=false;
    pa=false;
    n=false
  }
  if (condition==="most-overall")
  {
    cd="overall_star";
    mode="DESC"
    ms=false;
    mo=true;
    pd=false;
    pa=false;
    n=false
  }
  if (condition==="price-descend")
  {
    cd="reduce_price";
    mode="DESC"
    ms=false;
    mo=false;
    pd=true;
    pa=false;
    n=false
  }
  if (condition==="price-ascend")
  {
    cd="reduce_price";
    mode="ASC"
    ms=false;
    mo=false;
    pd=false;
    pa=true;
    n=false
  }
  if (condition==="newest")
  {
    cd="create_date";
    mode="DESC"
    ms=false;
    mo=false;
    pd=false;
    pa=false;
    n=true;
  }
  const mosts=ms;
  const mosto=mo;
  const priced=pd;
  const pricea=pa;
  const ne=n;

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

  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.mostByCatIDCondition(catId, offset,cd,mode);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      categoryById: true,
      active_m_st: mosts,
      active_m_ov: mosto,
      active_new: ne,
      active_m_dp: priced,
      active_m_ap: pricea,
    },
    page_numbers,
    previousPage,
    nextPage,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/keyword/:id/mode/:condition', async function (req, res) {
  const condition=req.params.condition;
  let cd=""
  let mode="";
  let ms=false;
  let mo=false;
  let pd=false;
  let pa=false;
  let n=false

  if (condition==="most-study")
  {
    cd="number_student";
    mode="DESC"
    ms=true;
    mo=false;
    pd=false;
    pa=false;
    n=false
  }
  if (condition==="most-overall")
  {
    cd="overall_star";
    mode="DESC"
    ms=false;
    mo=true;
    pd=false;
    pa=false;
    n=false
  }
  if (condition==="price-descend")
  {
    cd="reduce_price";
    mode="DESC"
    ms=false;
    mo=false;
    pd=true;
    pa=false;
    n=false
  }
  if (condition==="price-ascend")
  {
    cd="reduce_price";
    mode="ASC"
    ms=false;
    mo=false;
    pd=false;
    pa=true;
    n=false
  }
  if (condition==="newest")
  {
    cd="create_date";
    mode="DESC"
    ms=false;
    mo=false;
    pd=false;
    pa=false;
    n=true;
  }
  const mosts=ms;
  const mosto=mo;
  const priced=pd;
  const pricea=pa;
  const ne=n;

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

  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countBySearch(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.mostMenuChooseSearch(catId, offset,cd,mode);
  const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
  await categoryModel.checkBill(list,listBuy);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      categoryById: false,
      active_m_st: mosts,
      active_m_ov: mosto,
      active_new: ne,
      active_m_dp: priced,
      active_m_ap: pricea,
    },
    page_numbers,
    previousPage,
    nextPage,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

module.exports = router;  