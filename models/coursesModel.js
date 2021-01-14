const db = require("../utils/db");

const listCourses = [
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình ABC từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình AĂÂ từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình XYZ từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình LMN từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình QRS từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình TUV từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
  {
    courseImage: "images/ad1.jpg",
    courseName: "Xếp hình WX từ cơ bản đến nâng cao",
    author: "Triến xĩ Lưu Thiện Nhân",
  },
];

module.exports = {
  async allCourse(user_id) {
    const sql = `select course_id from bill where user_id = '${user_id}'`;
    const [result, fields] = await db.load(sql);
    if (result === null)
      return null;
    return result;
  },

  async courseByID(courseID) {
    const sql = `select * from course where course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0];
  },

  async courseBillByID(userID) {
    const sql = `SELECT course_id FROM bill WHERE user_id= '${userID}'`;
    const [result, fields] = await db.load(sql);
    return result;
  },

  async lecturerByID(userID) {
    const sql = `select name from user where user_id = '${userID}'`;
    const [result, fields] = await db.load(sql);
    return result[0];
  },

  async addComment(entity) {
    const sql = `select * from star_rating where user_id = '${entity.user_id}' and course_id = '${entity.course_id}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      await db.add(entity, 'star_rating');
    else {
      const sql1 = `update star_rating set user_id='${entity.user_id}', course_id='${entity.course_id}', num_star='${entity.num_star}', comment='${entity.comment}' where user_id='${entity.user_id}' and course_id='${entity.course_id}'`;
      const [rows, fields] = await db.load(sql1);
    }
  },

  async getCompleteVideos(courseID) {
    let sql = `select count(*) as c from complete_video
    join video on complete_video.video_id = video.video_id
    join lesson_list on video.list_id = lesson_list.list_id
    where lesson_list.course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAllVideosByCourseID(courseID) {
    let sql = `select count(*) as c from video
    join lesson_list on video.list_id = lesson_list.list_id
    where lesson_list.course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  }
};
