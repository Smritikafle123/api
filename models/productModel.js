const mongoose = require('mongoose');
const Product = mongoose.model('Product',{
    //for product
    pname:{type:String},
    pprice:{type:Number},
    pdesc:{type:String},
    pimage: {type:String},
    prating: {type:String}
})

module.exports= Product;
