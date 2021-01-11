const db = require('../utils/db');

module.exports={
    async getCateMenu(){
        const sql = `SELECT *
        FROM category
        where ISNULL(parent_id)`;
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
}