var Product=require('../models/product_mg')
var mongoose=require('mongoose');
const { exists } = require('../models/product_mg');
//const URL="mongodb+srv://hoasomus:123@cluster0.mhxhb.mongodb.net/shopping.user?retryWrites=true&w=majority";
//mongoose.connect(URL,{useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/nhanngu",{ useNewUrlParser: true ,useUnifiedTopology: true });

var products =[ 
    new Product({
    imagePath: "images/ad1.jpg",
    title: "Xếp hình ABC từ cơ bản đến nâng cao",
    description: "Triến xĩ Lưu Thiện Phúc",
    price: 10
}),
new Product({
    imagePath: "images/ad1.jpg",
    title: "Xếp hình ABC từ cơ bản đến nâng cao1",
    description: "Triến xĩ Lưu Thiện Nhân",
    price: 10
}),
new Product({
    imagePath: "images/ad1.jpg",
    title: "Xếp hình ABC từ cơ bản đến nâng cao2",
    description: "Triến xĩ Lưu Thiện Nhân",
    price: 10
}),
];

var done=0
for (var i=0; i<products.length;i++)
{
    products[i].save(function(err,result){
        done++;
        if(done===products.length){
            exit()
        }
    });
}

function exit(){
    mongoose.disconnect();
}