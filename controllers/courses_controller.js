const express = require("express");
const coursesModel = require("../models/coursesModel");
const router = express.Router();

router.get("/", async function (req, res) {
  const list = await coursesModel.allCourse(req.session.authUser.user_id);
  const courses = [];
  for (const object of list) {
    let course = await coursesModel.courseByID(object.course_id);
    let lecturer = await coursesModel.lecturerByID(course.lecturer_id);
    let completeVideos = await coursesModel.getCompleteVideos(object.course_id,req.session.authUser.user_id);
    let allVideos = await coursesModel.getAllVideosByCourseID(object.course_id);
    let progress = Math.ceil(completeVideos/allVideos*100);
    if (allVideos === 0)
      progress = 0;
    course['lecturer_name'] = lecturer.name;
    course['progress'] = progress;
    course['IsDone']=(progress===100);
    courses.push(course);
  }
  console.log(courses);
  res.render("partials/courses", {
    allCourses: courses,
    empty: courses.length === 0,
    layout: "MyCourses.hbs",
  });
});

router.post('/rating', async (req, res) => {
  let comment = {
    user_id : req.session.authUser.user_id,
    course_id : req.body.courseID,
    num_star : req.body.rate,
    comment : req.body.review
  };
  await coursesModel.addComment(comment);
  console.log(req.body)
  res.redirect('/MyCourse');
})

module.exports = router;
