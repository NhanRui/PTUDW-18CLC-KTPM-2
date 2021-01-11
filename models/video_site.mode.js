const db = require('../utils/db');
module.exports={
    async getInfor(id){
        const sql=`SELECT u.name, u.description as lecturer_des,u.avatar,c.*
        FROM course c join user u on c.lecturer_id=u.user_id
        WHERE course_id='${id}'`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async getChapter(id){
        const sql=`SELECT *
        FROM lesson_list
        WHERE course_id='${id}'`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async getListVideo(id){
        const sql=`SELECT v.*,l.chapter_number,l.course_id, 0 as stt
        FROM video v join lesson_list l on v.list_id=l.list_id 
        WHERE l.course_id='${id}'`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async get_url(course_id,chapter,video){
        const sql=`SELECT url
        FROM lesson_list l join video v on l.list_id=v.list_id
        WHERE course_id='${course_id}' AND chapter_number=${chapter} AND video_number=${video}`;
        const [rows, fields] = await db.load(sql);
        return rows[0];
    },
    getPreviousVideo(chapter,video,list){
        let index=0;
        for (const i of list)
        {
            if (i.chapter_number===+chapter && i.video_number===+video)
            {
                break;
            }
            index++;
        }
        if (index===0)
        {
            return list[0];
        }
        index--;
        return list[index];
    },
    getNextVideo(chapter,video,list){
        let index=0;
        for (const i of list)
        {
            if (i.chapter_number===+chapter && i.video_number===+video)
            {
                break;
            }
            index++;
        }
        if (index>=list.length-1)
        {
            return list[index];
        }
        index++
        return list[index];
    },
    setSTTVideo(list){
        for (i=0;i<list.length;i++)
        {
            list[i].stt=i+1;
        }
    },
    getCurrentVideo(chapter,video,list){
        let index=0;
        for (const i of list)
        {
            if (i.chapter_number===+chapter && i.video_number===+video)
            {
                break;
            }
            index++;
        }
        return list[index];
    },
    getVideoId(url){
        var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[1].length==11)? match[1] : false;
    }
}