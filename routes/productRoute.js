const express = require('express');
const router= express.Router();
const Product = require('../models/productModel')
const upload= require('../middleware/upload')
const auth = require('../middleware/auth')

//middleware=//auth.verifyUser//auth.verifyAdmin
//to insert products
router.post('/product/insert',upload.single('pimage'),function(req,res){
    //console.log(req.file);
     if(req.file == undefined){
        return res.status(400).json({message:"Invalid file format"});
     }
    const pname= req.body.pname;
    const pdesc= req.body.pdesc;
    const pprice= req.body.pprice;
    const pimage = req.file.path;
    const prating= req.body.prating

    const pdata= new Product({pname:pname,pdesc:pdesc,pprice:pprice,pimage:pimage,prating:prating})
        pdata.save()
        .then(function(result){
            res.status(201).json({success:true,message:"Product inserted!!"})

        })
        .catch(function(e){
           res.status(500).json({error:e})
        })
})
//to update products
router.put('/product/update',upload.single("pimage"),function(req,res){
    const pname= req.body.pname;
    const pdesc= req.body.pdesc;
    const pprice= req.body.pprice;
    const id= req.body.id;
    const prating= req.body.prating;
    const pimage= req.file.path;
    
    Product.updateOne({_id:id},{
        pname: pname,
        pdesc:pdesc,
        pprice:pprice,
        pimage:pimage,
        prating:prating
    })
    .then(function(result){
        res.status(200).json({message:"Updated!",success:true})
    })
    .catch(function(e){
        console.log(e)
        res.status(500).json({error:e})
    })
})

//delete
router.post('/product/delete/',function(req,res){
  const id = req.body.id;
  Product.deleteOne({_id:id})
  .then(function(result){
    res.status(200).json({message:"Deleted!",success:true})
  })
  .catch(function(e){
    res.status(200).json({error:e})
  })
})
//to retrive all products
router.get('/product/showAll',function(req,res){
    Product.find()
    .then(function(data){
        res.status(200).json({success:true,products:data})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})//to fetch single product
router.get('/product/single/:id',function(req,res){
    const id = req.params.id;
    Product.findOne({_id:id})
    .then(function(data){
        res.status(200).json({sucess:true,data:data})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

module.exports= router;