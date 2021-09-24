const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel.js');
const auth = require('../middleware/auth');
const {updateRating} = require('../utils/utils')
 
//to rate individual product
router.post('/rate/cs',auth.verifyUser,(req,res)=>{
    let rating = parseInt(req.body['rating']);
    let cs_id = req.body['csId'];
  
    Rating.findOne({"user_id":req.result._id,"cs_id":cs_id}).then((data)=>{
        if(data!=null)
        {
           
            
                Rating.updateOne({"user_id":req.result._id,"cs_id":cs_id},{$set:{"rating":parseInt(rating),"ratedAt":new Date()}}).then((result)=>{
                    
                    updateRating(cs_id);
                    return res.status(200).json({"success":true,"message":"Rated!!"});
                }).catch((err)=>{
                    console.log(err)
                    return res.status(404).json({"success":false,"message":err});
                })

        
           
 
        }
        else
        {
            const rate = new Rating({"user_id":req.result._id,"cs_id":cs_id,"rating":parseInt(rating),"ratedAt":new Date()});
            rate.save().then((result)=>{
                updateRating(cs_id);
                return res.status(200).json({"success":true,"message":"Rated!!"});
            }).catch((err)=>{
                return res.status(404).json({"success":false,"message":err});
            })
        }
    })
})


 //to fetch rating data
router.post('/retrieveRating',auth.verifyUser,(req,res)=>{
    let csId = req.body.csId;
    Rating.findOne({"user_id":req.result._id,"cs_id":csId}).then((data)=>{
        if(data == null)
        {
            return res.status(202).json({"success":false,"message":"Not rated!!","data":data});
        }
        else
        {
            return res.status(200).json({"success":true,"message":"Rated!!","data":data});
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})
 
module.exports = router;