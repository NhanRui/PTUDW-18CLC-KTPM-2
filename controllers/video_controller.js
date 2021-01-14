const express = require('express');
const vd_info=require('../models/video_site.mode');
const coursesModel = require('../models/coursesModel');
const { authCanWatch } = require('../middleware/auth.mdw');

const router = express.Router();

router.get('/:id/:chapter/:video', async function (req, res) {
  var found = false;
  const list_bill_video=await coursesModel.courseBillByID(req.session.authUser.user_id);
  //console.log(list_bill_video);
  //console.log(req.params.id);
  if(list_bill_video !== null){
      for(var i=0;i<list_bill_video.length;i++){
          if(list_bill_video[i].course_id === req.params.id)   found=true;
      }
  }
  if(found===false){
      res.render('vwError/cannot_access',{
          layout: false,
          error: 'Bạn chưa mua khóa học này mà, sao mà xem được',
          retURL: req.headers.retUrl
      });
      return;
  }
  const course_id=req.params.id;
  const chapter=req.params.chapter;
  const video=req.params.video;
  const link_access = `/${course_id}/${chapter}/${video}`;
  list_infor=await vd_info.getInfor(course_id);
  list_chapter=await vd_info.getChapter(course_id);
  list_video=await vd_info.getListVideo(course_id);
  vd_info.setSTTVideo(list_video);
  url=await vd_info.get_url(course_id,chapter,video);
  url.url=vd_info.getVideoId(url.url);
  prevVideo=vd_info.getPreviousVideo(chapter,video,list_video);
  nextVideo=vd_info.getNextVideo(chapter,video,list_video);
  curVideo=vd_info.getCurrentVideo(chapter,video,list_video);
  allChapter=[];
  //console.log(curVideo);
  for (const i of list_chapter)
  {
    const item={
      list_id: i.list_id,
      chapter_number: i.chapter_number,
      chapter_name: i.chapter_name,
      course_id: i.course_id,
      list_video: []
    }
    allChapter.push(item);
  }
  const list_complete=await vd_info.getCompleteList(req.session.authUser.user_id);
  for (const i of list_video)
  {
    for (j=0;j<allChapter.length;j++)
    {
      if (allChapter[j].list_id === i.list_id)
      {
        vd_info.checkCompleteList(i,list_complete);
        console.log(i);
        allChapter[j].list_video.push(i)
      }
    }
  }
  res.render('layouts/video_site', {
      list_infor: list_infor,
      allChapter: allChapter,
      link: url,
      prevVideo: prevVideo,
      nextVideo: nextVideo,
      currentVideo: curVideo,
      layout: "video_site.hbs",
      link_access
  });
})

router.post('/:id/:chapter/:video/rating-by-video', async (req, res) => {
  const course_id=req.params.id;
  const chapter=req.params.chapter;
  const video=req.params.video;
  let comment = {
    user_id : req.session.authUser.user_id,
    course_id : req.params.id,
    num_star : req.body.rate,
    comment : req.body.cmReview
  };
  await coursesModel.addComment(comment);
  //console.log(req.body)
  const link_access = `/${course_id}/${chapter}/${video}`;
  res.redirect(`/watch-video${link_access}`);
})

router.post('/save', async (req, res) => {
  list_complete=await vd_info.getCompleteList(req.session.authUser.user_id);
  let check=vd_info.checkComplete(req.body.idVideo,list_complete);
  if (check===false)
  {
    await vd_info.add_complete(req.session.authUser.user_id,req.body.idVideo);
  }
  res.redirect(req.body.link);
})


module.exports = router;