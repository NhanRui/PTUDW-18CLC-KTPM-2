const { get5starCourse, getUp4starCourse, getCateBySearch, get5starCourseSearch } = require('../utils/db');
const db = require('../utils/db');

const list = [
    {
        product_ID_rts: 'C1',
        deal_value: '-64%', 
        deal_image: 'images/productTesting.png' ,
        number_student: 1435435435,
        rating_stars: 4.8, 
        number_rating:'999', 
        title_product:'Ts. Lê Hoàng Phúc - Chiến lược tài chính',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Phúc',
        real_price:'499,999',
        reduce_price: '179,999'
    },
    {
        product_ID_rts: 'C2',
        deal_value: '-70%', 
        deal_image: 'images/product_ID2.jpg' ,
        number_student: 192012,
        rating_stars: 3.2, 
        number_rating:'46', 
        title_product:'Trọn bộ kiến thức về VBA Excel',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Nguyễn Anh Duy',
        real_price:'599,000',
        reduce_price: '179,999'
    },
    {
        product_ID_rts: 'C3',
        deal_value: '-74%', 
        deal_image: 'images/product_ID1.jpg' ,
        number_student: 133522,
        rating_stars: 0.5, 
        number_rating:'1', 
        title_product:'Thành thạo ngôn ngữ lập trình C++',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lưu Thiện Nhân',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C4',
        deal_value: '-70%', 
        deal_image: 'images/product_ID3.jpg' ,
        number_student: 123634,
        rating_stars: 4.4, 
        number_rating:'100', 
        title_product:'VBA - Giải pháp tối ưu công việc trên Excel',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ];

  const list_top8 = [
    {
        product_ID_rts: 'C5',
        deal_value: '-74%', 
        deal_image: 'images/product_ID5.png' ,
        number_student: 1435435435,
        rating_stars: 4.6, 
        number_rating:'999', 
        title_product:'Học ielts cùng tiến sĩ Gấu Mập',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Phúc',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C6',
        deal_value: '-74%', 
        deal_image: 'images/product_ID6.png' ,
        number_student: 192012,
        rating_stars: 4.3, 
        number_rating:'46', 
        title_product:'Bí quyết giao tiếp để thành công',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Nguyễn Anh Duy',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C7',
        deal_value: '-78%', 
        deal_image: 'images/product_ID7.png' ,
        number_student: 133522,
        rating_stars: 0.5, 
        number_rating:'1', 
        title_product:'Học Photoshop trọn bộ trong 7 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lưu Thiện Nhân',
        real_price:'799,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C8',
        deal_value: '-76%', 
        deal_image: 'images/product_ID8.png' ,
        number_student: 123634,
        rating_stars: 4.3, 
        number_rating:'100', 
        title_product:'Nền tảng tiếng Anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'749,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C9',
        deal_value: '-74%', 
        deal_image: 'images/product_ID9.jpg' ,
        number_student: 1435435435,
        rating_stars: 4.6, 
        number_rating:'999', 
        title_product:'Học thiết kế đồ họa trọn bộ 30 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Phúc',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C10',
        deal_value: '-70%', 
        deal_image: 'images/product_ID10.png' ,
        number_student: 192012,
        rating_stars: 4.6, 
        number_rating:'46', 
        title_product:'85 chuyên đề Excel cơ bản đến nâng cao',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Nguyễn Anh Duy',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C11',
        deal_value: '-64%', 
        deal_image: 'images/product_ID11.png' ,
        number_student: 133522,
        rating_stars: 4.8, 
        number_rating:'1', 
        title_product:'Ts. Lê Thẩm Dương - Chiến lược tài chính',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lưu Thiện Nhân',
        real_price:'499,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C12',
        deal_value: '-50%', 
        deal_image: 'images/product_ID12.jpg' ,
        number_student: 123634,
        rating_stars: 4.8, 
        number_rating:'100', 
        title_product:'Nghệ thuật bán hàng đỉnh cao',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ];

  const list_top8bs = [
    {
        product_ID_rts: 'C13',
        deal_value: '-74%', 
        deal_image: 'images/product_ID5.png' ,
        number_student: 1435435435,
        rating_stars: 4.6, 
        number_rating:'999', 
        title_product:'Học ielts cùng tiến sĩ Gấu Mập',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Phúc',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C14',
        deal_value: '-74%', 
        deal_image: 'images/product_ID6.png' ,
        number_student: 192012,
        rating_stars: 4.3, 
        number_rating:'46', 
        title_product:'Bí quyết giao tiếp để thành công',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Nguyễn Anh Duy',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C15',
        deal_value: '-78%', 
        deal_image: 'images/product_ID7.png' ,
        number_student: 133522,
        rating_stars: 0.5, 
        number_rating:'1', 
        title_product:'Học Photoshop trọn bộ trong 7 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lưu Thiện Nhân',
        real_price:'799,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C16',
        deal_value: '-76%', 
        deal_image: 'images/product_ID8.png' ,
        number_student: 123634,
        rating_stars: 4.3, 
        number_rating:'100', 
        title_product:'Nền tảng tiếng Anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'749,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C17',
        deal_value: '-74%', 
        deal_image: 'images/product_ID9.jpg' ,
        number_student: 1435435435,
        rating_stars: 4.6, 
        number_rating:'999', 
        title_product:'Học thiết kế đồ họa trọn bộ 30 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Phúc',
        real_price:'699,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C18',
        deal_value: '-70%', 
        deal_image: 'images/product_ID10.png' ,
        number_student: 192012,
        rating_stars: 4.6, 
        number_rating:'46', 
        title_product:'85 chuyên đề Excel cơ bản đến nâng cao',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Nguyễn Anh Duy',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C19',
        deal_value: '-64%', 
        deal_image: 'images/product_ID11.png' ,
        number_student: 133522,
        rating_stars: 4.8, 
        number_rating:'1', 
        title_product:'Ts. Lê Thẩm Dương - Chiến lược tài chính',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lưu Thiện Nhân',
        real_price:'499,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C20',
        deal_value: '-50%', 
        deal_image: 'images/product_ID12.jpg' ,
        number_student: 123634,
        rating_stars: 4.8, 
        number_rating:'100', 
        title_product:'Nghệ thuật bán hàng đỉnh cao',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ];

  const list_english_4=[
    {
        product_ID_rts: 'C21',
        deal_value: '-50%', 
        deal_image: 'images/english-1.png' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Nền tảng tiếng anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C22',
        deal_value: '-50%', 
        deal_image: 'images/english-2.png' ,
        number_student: 123634,
        rating_stars: 3.5, 
        number_rating:'100', 
        title_product:'Nền tảng tiếng anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C23',
        deal_value: '-50%', 
        deal_image: 'images/english-3.png' ,
        number_student: 123634,
        rating_stars: "4.0", 
        number_rating:'100', 
        title_product:'Nền tảng tiếng anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C24',
        deal_value: '-50%', 
        deal_image: 'images/english-4.jpg' ,
        number_student: 123634,
        rating_stars: "5.0", 
        number_rating:'100', 
        title_product:'Nền tảng tiếng anh cho người mới bắt đầu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ]

  const list_music_4=[
    {
        product_ID_rts: 'C25',
        deal_value: '-50%', 
        deal_image: 'images/product_ID5.png' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Học guitar đệm hát cấp tốc trong 30 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C26',
        deal_value: '-50%', 
        deal_image: 'images/music/music-2.jpg' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Học hát chuyên nghiệp trong 7 ngày',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C27',
        deal_value: '-50%', 
        deal_image: 'images/music/music-3.jpg' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Học guitar đệm hát cấp tốc cùng Haketu',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C28',
        deal_value: '-50%', 
        deal_image: 'images/music/music-4.jpg' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'[EduVIP] Nâng cao trình độ guitar cùng Haketu (đệm hát và fingerstyle)',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ]

  const list_IT_4=[
    {
        product_ID_rts: 'C29',
        deal_value: '-50%', 
        deal_image: 'images/IT/IT-1.webp' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Hacker mũ trắng và bảo mật thông tin',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C30',
        deal_value: '-50%', 
        deal_image: 'images/IT/IT-2.png' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Thành thạo ngôn ngữ lập trình C++',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
    {
        product_ID_rts: 'C31',//course_id
        deal_value: '-50%', //deal_value
        deal_image: 'images/IT/IT-3.png' ,//intro_image
        number_student: 3179,//number_student
        rating_stars: 4.3,//overall_star
        number_rating:'3179', //number_rating
        title_product:'Lập trình Java trong 4 tuần',//descrition
        author_image:'images/BecomeInstructor/ltn.jpg',//
        author_name:'Lê Hoàng Sang',//
        real_price:'599,000',//price
        reduce_price: '179,000'//reduce_price
    },
    {
        product_ID_rts: 'C32',
        deal_value: '-50%', 
        deal_image: 'images/IT/IT-4.jpg' ,
        number_student: 3179,
        rating_stars: 4.3, 
        number_rating:'3179', 
        title_product:'Lập trình backend cho website bằng PHP/Mysql theo mô hình MVC',
        author_image:'images/BecomeInstructor/ltn.jpg',
        author_name:'Lê Hoàng Sang',
        real_price:'599,000',
        reduce_price: '179,000'
    },
  ]

  module.exports={
      rank_view(list, rank){
          for (const i of list){
              rank++;
              i.top=rank;
          }
      },
      checkIsHaving(list1, list2)
      {
          let numberOfitems=0
        for (const i of list1){
            numberOfitems++;
            for (const j of list2)
            {
              if (j.course_id===i.course_id)
              {
                j.isHaving=1;
                continue;
              }
            }
        }
        return numberOfitems;
      },
      async allById(id){
        const sql = `SELECT *
        FROM (
          SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving
                FROM (
                    SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
                    FROM (SELECT c.*,count( b.course_id ) AS number_student
                                FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                                GROUP BY c.course_id) AS temp1 JOIN 
                                (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                                FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                                GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
                ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id ) AS temp4 join category ct ON temp4.categoty_id=ct.category_id
        WHERE ct.parent_id=${id}
        LIMIT 4`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async all(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.number_student DESC
        LIMIT 4`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_new_1(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view,0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.create_date DESC
        LIMIT 4 OFFSET 0`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_new_2(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view,0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.create_date DESC
        LIMIT 4 OFFSET 4`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_new_3(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view,0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.create_date DESC
        LIMIT 2 OFFSET 8`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_view_1(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view,0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.num_view DESC
        LIMIT 4 OFFSET 0`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_view_2(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view, 0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.num_view DESC
        LIMIT 4 OFFSET 4`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;
      },
      async top10_view_3(){
        const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id, 0 as isHaving,temp3.create_date,temp3.num_view, 0 as top
        FROM (
            SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id,num_view,create_date
            FROM (SELECT c.*,count( b.course_id ) AS number_student
                        FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                        GROUP BY c.course_id) AS temp1 JOIN 
                        (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                        FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                        GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
        ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
        WHERE U.role=1
        ORDER BY temp3.num_view DESC
        LIMIT 2 OFFSET 8`;
        const [rows, fields] = await db.load(sql);
        return rows;
          //return list;countByCat_5star
      },
      async countByCat(id){
        const [rows, fields] = await db.countByCat(id);
        return rows[0].total;
      },
      async countBySearch(textSearch){
        const [rows, fields] = await db.countBySearch(textSearch);
        return rows[0].total;
      },
      async countByCat_5star(id){
        const [rows, fields] = await db.countByCat_5star(id);
        return rows[0].total;
      },
      async countByCat_5starSearch(textSearch){
        const [rows, fields] = await db.countByCat_5starSearch(textSearch);
        return rows[0].total;
      },
      async countByCat_Up4star(id){
        const [rows, fields] = await db.countByCat_Up4star(id);
        return rows[0].total;
      },
      async countByCat_Up4starSearch(textSearch){
        const [rows, fields] = await db.countByCat_Up4starSearch(textSearch);
        return rows[0].total;
      },
      async countByCat_Up3star(id){
        const [rows, fields] = await db.countByCat_Up3star(id);
        return rows[0].total;
      },
      async countByCat_Up3starSearch(textSearch){
        const [rows, fields] = await db.countByCat_Up3starSearch(textSearch);
        return rows[0].total;
      },
      async countByCat_Down3star(id){
        const [rows, fields] = await db.countByCat_Down3star(id);
        return rows[0].total;
      },
      async countByCat_Down3starSearch(id){
        const [rows, fields] = await db.countByCat_Down3starSearch(id);
        return rows[0].total;
      },
      async getCateList(id){
        const [rows, fields] = await db.getCateList(id);
        return rows;
      },
      async getCateListByPage(id,offset){
        const [rows, fields] = await db.getCateListByPage(id,offset);
        return rows;
      },
      async getCateBySearch(textSearch,offset){
        const [rows, fields] = await db.getCateBySearch(textSearch,offset);
        return rows;
      },
      async get5starCourse(id,offset){
        const [rows, fields] = await db.get5starCourse(id,offset);
        return rows;
      },
      async get5starCourseSearch(textSearch,offset){
        const [rows, fields] = await db.get5starCourseSearch(textSearch,offset);
        return rows;
      },
      async getUp4starCourse(id,offset){
        const [rows, fields] = await db.getUp4starCourse(id,offset);
        return rows;
      },
      async getUp4starCourseSearch(textSearch,offset){
        const [rows, fields] = await db.getUp4starCourseSearch(textSearch,offset);
        return rows;
      },
      async getUp3starCourse(id,offset){
        const [rows, fields] = await db.getUp3starCourse(id,offset);
        return rows;
      },
      async getUp3starCourseSearch(textSearch,offset){
        const [rows, fields] = await db.getUp3starCourseSearch(textSearch,offset);
        return rows;
      },
      async getDown3starCourse(id,offset){
        const [rows, fields] = await db.getDown3starCourse(id,offset);
        return rows;
      },
      async getDown3starCourseSearch(textSearch,offset){
        const [rows, fields] = await db.getDown3starCourseSearch(textSearch,offset);
        return rows;
      },

      async mostStudyByCatID(id, offset){
        const [rows, fields] = await db.mostStudyByCatID(id, offset);
        return rows;
      },
      async mostOverallByCatID(id, offset){
        const [rows, fields] = await db.mostOverallByCatID(id, offset);
        return rows;
      },
      async ascPriceByCatID(id, offset){
        const [rows, fields] = await db.ascPriceByCatID(id, offset);
        return rows;
      },
      async descPriceByCatID(id, offset){
        const [rows, fields] = await db.descPriceByCatId(id, offset);
        return rows;
      },

      async mostMenuChooseSearch(textSearch,offset,order,mode){
        const [rows, fields] = await db.mostMenuChooseSearch(textSearch,offset,order,mode)
        return rows;
      },
      
      all_top8(){
          return list_top8;
      },
      all_top8bs(){
        return list_top8bs;
    },
    all_english_menu(){
        return list_english_4;
    },
    all_music_menu(){
        return list_music_4;
    },
    all_IT_menu(){
        return list_IT_4;
    }
  }