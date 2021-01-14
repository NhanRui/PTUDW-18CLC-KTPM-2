var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
    imagePath:{type: String, require: true},
    tittle:{type: String, require: true},
    description:{type: String, require: true},
    price:{type: Number, require: true}
})

module.exports=mongoose.model('Product', schema);