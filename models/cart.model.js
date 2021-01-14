const db = require('../utils/db');
const uniqid = require('uniqid');

module.exports={
    getPriceOfItems(cart){
        let n=0;
        for (const item of cart)
        {
            n+=+item.reduce_price;
        }
        return n;
    },
    getNumberOfItems(cart){
        let n=0;
        for (const item of cart)
        {
            //console.log(item);
            n++;
        }
        return n;
    },
    async add(cart,idU,item){
        cart.push(item);
        const sql=`INSERT favourite(user_id,course_id) VALUES ('${idU}','${item.course_id}')`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async addCart(cart,idU,item){
        cart.push(item);
        const sql=`INSERT shopping_cart(user_id,course_id) VALUES ('${idU}','${item.course_id}')`;
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async getFaCartById(id){
        const sql=`SELECT temp5.*,c.category_name
        FROM (SELECT temp4.*,s.user_id
                FROM(SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.course_name,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,0 as IsBuy, 0 as IsNew, 0 as IsHot
                        FROM (
                            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,course_name,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
                            FROM (SELECT c.*,count( b.course_id ) AS number_student
                                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                                        GROUP BY c.course_id) AS temp1 JOIN 
                                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
                            WHERE status='Hoàn thành' AND active=0
                        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id) as temp4 join favourite s on temp4.course_id=s.course_id
                                        ) as temp5 join category c on temp5.categoty_id= c.category_id
        WHERE user_id='${id}'`
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async getFaItem(id){
        const sql=`SELECT course_id,course_name,intro_image,ROUND(price-price*deal_value/100,0) as reduce_price
        FROM course
        WHERE course_id='${id}'`;
        const [rows, fields] = await db.load(sql);
        return rows[0];
    },
    async getCartItem(id){
        const sql=`SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.course_name,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,course_name,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
            WHERE status='Hoàn thành' AND active=0
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE course_id='${id}'`;
        const [rows, fields] = await db.load(sql);
        return rows[0];
    },
    async removeByID(cart,idC, idU){
        const sql=`DELETE FROM favourite WHERE course_id='${idC}' AND user_id='${idU}'`;
        const [rows, fields] = await db.load(sql);
        let index=0;
        for (const i of cart)
        {
            if (i.course_id===idC)
            {
                break;
            }
            index++;
        }
        cart = cart.slice(0, index).concat(cart.slice(index + 1, cart.length))
        return rows;
    },
    async removeByIDCart(cart,idC, idU){
        const sql=`DELETE FROM shopping_cart WHERE course_id='${idC}' AND user_id='${idU}'`;
        const [rows, fields] = await db.load(sql);
        let index=0;
        for (const i of cart)
        {
            if (i.course_id===idC)
            {
                break;
            }
            index++;
        }
        cart = cart.slice(0, index).concat(cart.slice(index + 1, cart.length))
        return rows;
    },
    async getBuyCartById(id){
        const sql=`SELECT temp4.*,s.user_id
        FROM(SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.course_name,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving
                FROM (
                    SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,course_name,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
                    FROM (SELECT c.*,count( b.course_id ) AS number_student
                                FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                                GROUP BY c.course_id) AS temp1 JOIN 
                                (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                                FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                                GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
                    WHERE status='Hoàn thành' AND active=0
                ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id) as temp4 join shopping_cart s on temp4.course_id=s.course_id
                        WHERE s.user_id='${id}'`
        const [rows, fields] = await db.load(sql);
        return rows;
    },
    async addBillTotal(listCart){
        const total=this.getPriceOfItems(listCart);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '/' + dd;
        const id=uniqid('B');
        const sql=`INSERT final_bill(final_bill_id,status,date,price) VALUES('${id}','Hoàn Thành','${today}','${total}')`
        const [rows, fields] = await db.load(sql);
        return id;
    },
    async addBill(listCart,id,userId){
        if (listCart.length===0)
        {
            return;
        }
        for (i=0;i<listCart.length;i++)
        {
            const sql=`INSERT bill VALUES('${listCart[i].user_id}','${listCart[i].course_id}','${id}','${listCart[i].reduce_price}')`;
            await db.load(sql);
            const sql1=`DELETE FROM shopping_cart WHERE user_id='${userId}' AND course_id='${listCart[i].course_id}'`;
            await db.load(sql1);
        }
        return;
    },
}