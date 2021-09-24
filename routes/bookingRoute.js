const express = require('express');
const router = express.Router();
const InstrumentBooking = require('../models/bookingModel');
const Product = require('../models/productModel');
const auth = require('../middleware/auth')

//to book instruments
router.post('/book/music',auth.verifyUser,(req,res)=>{
   
    let pid = req.body['product_id'];
    let quantity = parseInt(req.body['quantity']);
    let booked_At = new Date();
    InstrumentBooking.findOne({"product_id":pid,"user_id":req.result._id}).then((gadget)=>{
        if(gadget == null)
        {
            InstrumentBooking.find({}).then((data)=>{
                    Product.findOne({"_id":pid}).then((data2)=>{
                        if(data2!=null)
                        {                           
                               
                                let price;
                               
                                price = quantity * data2.pprice;
                                
                                const booking = new InstrumentBooking({"product_id":pid,"quantity":quantity,"price":price,"booked_At":booked_At,"user_id":req.result._id});
                                booking.save().then((result)=>{
                                  
                                    return res.status(200).json({"success":true,"message":"Added"});
                                }).catch((err)=>{return res.status(404).json({"success":true,"message":err})})
                               
                           
                        }
                        else
                        {
                            return res.status(202).json({"success":false,"message":`Product not available!!`})
                        }
                    })
                
                
        
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Item already exists in cart."})
        }
    })

})

//to get the booking data
router.get('/retrieve/myBookings',auth.verifyUser,(req,res)=>{
    let query = InstrumentBooking.find({"user_id":req.result._id}).sort({"bookedDate":-1}).populate(
        {
            path:"product_id"
        }
    );
    query.then((data)=>{
       
        if(data.length > 0)
        {
            return res.status(200).json({"success":true,"message":'Data found',"data":data});
        }
        else
        {
            return res.status(200).json({"success":false,"message":'No Data Found',"data":data});
        }
    }).catch((err)=>{
        return res.status(404).json({"success":false,"message":err});
    })
})

//to delete booking
router.post('/delete/booking',auth.verifyUser,(req,res)=>{
    let pid = req.body['pid'];
    let query = InstrumentBooking.findOne({"_id":pid});
    query.then((data)=>{
        if(data!=null)
        {
            InstrumentBooking.deleteOne({"_id":pid}).then((result2)=>{
                return res.status(200).json({"success":true,"message":"Deleted"})
            }).catch((err)=>{
                return res.status(404).json({"success":false,"message":err})
            })
            
            
        }
    })
})
// to update booking
router.post('/update/booking',auth.verifyUser,(req,res)=>{
    let pid = req.body['pid'];
    let qty = req.body['qty'];
    InstrumentBooking.findOne({"_id":pid}).then((data)=>{
        if(data!=null)
        {
            InstrumentBooking.findOne({"_id":pid}).then((data2)=>{
                if(data2!=null)
                {
                    
                    let product_id = data.product_id;
                    Product.findOne({"_id":product_id}).then((data3)=>{
                      if(data3!=null)
                      {
                        let price = qty*data3.pprice;
                            InstrumentBooking.updateOne({"_id":pid},{$set:{"quantity":qty,"price":price}}).then((result2)=>{
                                return res.status(200).json({"success":true,"message":"Updated"})
                            }).catch((err)=>{
                                return res.status(404).json({"success":false,"message":"dsafvd"});
                            }) 
                            
                      }
                      else
                      {
                        return res.status(202).json({"success":false,"message":"Product unavailable."})
                      }
                    })
                }
                else
                {
                    return res.status(202).json({"success":false,"message":"Your editing permission have been closed. Permission valids for 2 days after booking."})
                }
            })
        }
    })
})


module.exports = router;