const db = require('../utils/db')
module.exports = {
  async singleFromSql(courseID) {
    let sql = `select *,0 as IsHaving,0 as IsBuy,0 IsInCart from course where course_id = '${courseID}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async course_lecturer(courseID) {
    let sql = `select u.* from user as u left join course as c on u.user_id = c.lecturer_id where c.course_id = '${courseID}' `;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async course_cate(courseID) {
    let sql = `select c.* from category as c left join course as co on c.category_id = co.categoty_id where co.course_id = '${courseID}'`;
    const [cate, fields] = await db.load(sql);
    let getNameSql = `select category_name from category where category_id = '${cate[0].category_id}'`;
    let getParentSql = `select category_name from category where category_id = '${cate[0].parent_id}'`;
    const [main, fields1] = await db.load(getNameSql);
    const [parent, fields2] = await db.load(getParentSql);
    return [main[0].category_name, parent[0].category_name];
  },

  async course_chapter(courseID) {
    let sql = `select * from lesson_list join video on lesson_list.list_id = video.list_id where course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result;
  },

  async course_comment(courseID) {
    let sql = `select * from star_rating where course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result;
  },

  async course_commentator(id) {
    let sql = `select name, avatar from user where user_id = '${id}'`;
    const [result, fields] = await db.load(sql);
    return result[0];
  },

  async getAllStudents(courseID) {
    let sql = `select count(*) as c from bill where course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAllCourse(lecturerID) {
    let sql = `select count(*) as c from course where lecturer_id='${lecturerID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAll5Stars(courseID) {
    let sql = `select count(*) as c from star_rating where num_star=5 and course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAll4Stars(courseID) {
    let sql = `select count(*) as c from star_rating where num_star=4 and course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAll3Stars(courseID) {
    let sql = `select count(*) as c from star_rating where num_star=3 and course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAll2Stars(courseID) {
    let sql = `select count(*) as c from star_rating where num_star=2 and course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAll1Stars(courseID) {
    let sql = `select count(*) as c from star_rating where num_star=1 and course_id='${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async getAllLessons(courseID) {
    let sql = `select count(*) as c from lesson_list join video on lesson_list.list_id = video.list_id where lesson_list.course_id = '${courseID}'`;
    const [result, fields] = await db.load(sql);
    return result[0].c;
  },

  async increaseView(courseID) {
    let sql = `select num_view from course where course_id='${courseID}'`;
    const[result, fields] = await db.load(sql);
    let views = result[0].num_view + 1;
    await db.patch({'num_view' : views}, {'course_id' : courseID}, 'course')
  }
};
