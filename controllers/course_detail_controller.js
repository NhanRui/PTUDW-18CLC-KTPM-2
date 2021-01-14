const express = require("express");
const course_detail_Model = require("../models/course_detail_Model");
const courses_detail_Model = require("../models/course_detail_Model");
const categoryModel = require('../models/product_modle');
const menuCategory=require('../models/category-menu.model');

const router = express.Router();

router.get("/course-detail/:id", async function (req, res) {
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

  let id = req.params.id;
  await course_detail_Model.increaseView(id);

  const course_detail = await courses_detail_Model.singleFromSql(id);
  categoryModel.checkisHaving(req.session.cart,course_detail);
  if (req.session.authUser!=null)
    {
    const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
    await categoryModel.checkBill(course_detail,listBuy);
    await categoryModel.checkIsInCart(course_detail,req.session.shopCart);
    }
  const lecturer = await courses_detail_Model.course_lecturer(id);

  let new_price = (course_detail[0].price * course_detail[0].deal_value / 100);

  const [main, parent] = await course_detail_Model.course_cate(id);

  const chapters = await course_detail_Model.course_chapter(id);
  const chapter_name = [];
  const videos = [];
  let videos_duration = 0;
  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }
  for (const property of chapters) {
    chapter_name.push({chapter_name : property.chapter_name, chapter_number : property.chapter_number});
    videos.push({video_name : property.video_name, url : property.url, video_number : property.video_number, chapter_number : property.chapter_number, duration : (property.video_duration ? property.video_duration.toString().toHHMMSS() : 0)});
    videos_duration += property.video_duration;
  }
  videos_duration = videos_duration.toString().toHHMMSS();
  let lesson = chapter_name.filter(function({chapter_number}) {
    return !this.has(chapter_number) && this.add(chapter_number);
  }, new Set)

  let num_of_students = await course_detail_Model.getAllStudents(id);
  let num_of_courses = await course_detail_Model.getAllCourse(id);  
  let num_of_lessons = await course_detail_Model.getAllLessons(id);
  let all5Stars = await course_detail_Model.getAll5Stars(id);
  let all4Stars = await course_detail_Model.getAll4Stars(id);
  let all3Stars = await course_detail_Model.getAll3Stars(id);
  let all2Stars = await course_detail_Model.getAll2Stars(id);
  let all1Stars = await course_detail_Model.getAll1Stars(id);
  let stars = [];
  let allStars = all5Stars + all4Stars + all3Stars + all2Stars + all1Stars;
  if (allStars === 0)
    stars.push({'i' : 5, 'stars' : 0, 'percent' : 0}, {'i' : 4, 'stars' : 0, 'percent' : 0}, {'i' : 3, 'stars' : 0, 'percent' : 0}, {'i' : 2, 'stars' : 0, 'percent' : 0}, {'i' : 1, 'stars' : 0, 'percent' : 0});
  else
    stars.push({'i' : 5, 'stars' : all5Stars, 'percent' : all5Stars*100/allStars}, {'i' : 4, 'stars' : all4Stars, 'percent' : all4Stars*100/allStars}, {'i' : 3, 'stars' : all3Stars, 'percent' : all3Stars*100/allStars}, {'i' : 2, 'stars' : all2Stars, 'percent' : all2Stars*100/allStars}, {'i' : 1, 'stars' : all1Stars*100, 'percent' : all1Stars/allStars});
  let overallStar = (all5Stars*5 + all4Stars*4 + all3Stars*3 + all2Stars*2 + all1Stars*1)/allStars;
  if (allStars === 0)
    overallStar = 0;


  const comments = await course_detail_Model.course_comment(id);
  for (const property of comments) {
    let user = await course_detail_Model.course_commentator(property.user_id);
    property['user_name'] = user.name;
    property['user_avatar'] = user.avatar;
  }

  let catId=await categoryModel.getCateId(id);
  console.log(catId);
  const list_top5=await categoryModel.Top5ById(catId.categoty_id);
  categoryModel.setListStt(list_top5);
  if (req.session.authUser!=null)
  {
    const listBuy=await categoryModel.getBuyList(req.session.authUser.user_id);
    await categoryModel.checkBill(list_top5,listBuy);
    await categoryModel.checkisHaving(req.session.cart,list_top5);
  }
  await categoryModel.checkHot(list_top5,listHot);
  await categoryModel.checkNew(list_top5,listNew);
  categoryModel.setListFirst(list_top5);
  res.render('partials/course_detail', {
    layout: 'CourseDetail.hbs',
    course_detail: course_detail[0],
    new_price,
    lecturer : lecturer[0],
    num_of_students,
    num_of_courses,
    num_of_lessons,
    videos_duration,
    stars,
    overallStar,
    main,
    parent,
    videos,
    lesson,
    comments,
    shopping_list,
    items,
    menuList: menuList,
    empty_menu: menuList.length!==0,
    allListMenu: allListMenu,
    list_top5
  })
})

module.exports = router;