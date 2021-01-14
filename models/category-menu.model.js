const db = require('../utils/db');

module.exports={
    async getCateMenu(){
        const sql = `SELECT category_id,category_name , COUNT(course_name) as on_top
        FROM(
            SELECT c1.course_name,c2.parent_id
            FROM course c1 join category c2 on c1.categoty_id=c2.category_id
            ) temp1 right join (
                                                    SELECT category_id,category_name
                                                                FROM category
                                                                where ISNULL(parent_id)
                                                    ) as temp2 on temp1.parent_id=temp2.category_id
        GROUP BY category_id
        ORDER BY on_top DESC`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async getCateSubMenu(){
        const sql = `SELECT *
        FROM category
        where ISNULL(parent_id)=false`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },

    async getCateMenuNumReg(){
        const sql = `SELECT temp6.category_id,temp6.category_name,COUNT(temp7.parent_id) AS numReg
        FROM(
                    SELECT category_id,category_name
                    FROM category
                    WHERE ISNULL(parent_id)) temp6 left JOIN
                    (
                    SELECT parent_id,category_name
        FROM(
        SELECT temp3.parent_id,b.course_id
        FROM bill b right join(
        SELECT temp2.*,c.course_id
        FROM course c right join (
        SELECT c.category_id,c.category_name,temp1.category_id as parent_id
        FROM category c right join (
                                                    SELECT category_id
                                                    FROM category
                                                    WHERE ISNULL(parent_id)
                                                    ) as temp1 on c.parent_id=temp1.category_id
                                                    ) as temp2 on temp2.category_id=c.categoty_id) as temp3 on b.course_id=temp3.course_id
                                                    ) as temp4 right join (
                                                                SELECT category_id,category_name
                                                                FROM category
                                                                WHERE ISNULL(parent_id)
                                                                ) as temp5 on temp4.parent_id=temp5.category_id
                                                                WHERE ISNULL(temp4.course_id)=FALSE
                    ) as temp7 on temp6.category_id=temp7.parent_id
                    GROUP BY (temp6.category_id)
                    ORDER BY numReg DESC
                    LIMIT 5`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
}