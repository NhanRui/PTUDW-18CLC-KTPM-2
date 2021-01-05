const { patch } = require('../utils/db');
const db = require('../utils/db');
const moment = require('moment')

module.exports ={
    async singleByEmail(email){
        const sql = `select * from user where email= '${email}'`;
        const [rows, fields] = await db.load(sql);
        if(rows.length === 0)
            return null;
        return rows[0];
    },

    async add(user){
        const [result, fields] = await db.add(user,'user');
        return result;
    },

    async patch(user){
        var condition={user_id: user.user_id};
        //delete (user.user_id);
        const [result, fields] = await db.patch(user,condition,'user');
        return result;
    },

    async changeInfo(user) {
        let condition = {email: user.email};
        const [rows, fields] = await db.patch(user, condition, 'user');
        return true;
    },

    async changePassword(userID, newPassword) {
        const sql = `update user set password = '${newPassword}' where user_id = '${userID}'`;
        const [rows, fields] = await db.load(sql);
        return true;
    }
}