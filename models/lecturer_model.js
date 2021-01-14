const db = require('../utils/db');

module.exports ={
    async category(){
        const sql = `select * from category where parent_id is null`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },
    async sub_category(cat_id){
        const sql = `select * from category where parent_id= ${cat_id}`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },

    async add(course){
        const [result, fields] = await db.add(course,'course');
        return result;
    },

    async courses(user_id){
        const sql = `select * from course where lecturer_id = '${user_id}'`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },

    async getLessonList(course_id){
        const sql = `select * from lesson_list where course_id = '${course_id}' order by chapter_number`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },

    async addLessonList(lesson){
        const [rows, fields] = await db.add(lesson,'lesson_list');
        return rows;
    },

    async delLessonList(course_id){
        const sql = `delete from lesson_list where course_id = '${course_id}'`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },

    async getVideoList(lesson_id){
        const sql = `select * from video where list_id = '${lesson_id}' order by video_number`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },

    async addVideoList(video){
        const [rows, fields] = await db.add(video,'video');
        return rows;
    },

    async delVideoList(lesson_id){
        const sql = `delete from video where list_id = '${lesson_id}'`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },

    async getCourse(course_id){
        const sql = `select * from course where course_id = '${course_id}'`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows;
    },

    async patchStatus(status){
        const condition = {course_id: status.course_id};
        const [rows,fields] = await db.patch(status,condition,'course');
        return rows;
    }
}