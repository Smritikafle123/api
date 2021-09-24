const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', {
    //for customer
    name : {
        type : String,
    },
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String
    },
    address : {
        type : String
    },
    phone : {
        type : String
    },
    password : {
        type : String,
    },
    profileImg:{
        type:String,
        default:"no-img.jpg"
    },
    userType:{
        type:String,
        enum:['Admin','Buyer'],
        default:"Buyer"
    }
    
})

module.exports = Customer;