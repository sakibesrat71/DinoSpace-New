const getreservation=require('../controllers/dashcontroller.js');
const express = require('express');
const routers=express.Router();
const Postmodel=require('../models/postmodels');
const ReservationModel=require('../models/reservationModel');
const OfferModel=require('../models/offermodels');
const Menumodel = require('../models/menumodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
//creating disck space for uploading pics
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {    
//         cb(null, file.originalname);
//     }
// });
//upload params for multer
// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//             err.name = 'ExtensionError'
//             return cb(err);
//         }
//     }

// }).array('images',4);


//gets a post
routers.get('/:postId',async(req,res)=>{
    try{
        // const posts=await Restaurentmodel.find({});
        // res.json(posts);
        const token = req.headers['x-access-token'];
        //console.log(token);
        const decoded= jwt.verify(token,'secret123');
        getreservation(req,res);
    }
    catch(err){
        res.json({message:err});
    }
} );

//submit a reservation
routers.post('/',async(req,res)=>{
    //console.log(req.body);
    const post=new ReservationModel({
        userID:req.body.userID,
        restaurantID:req.body.restaurantID,
        option2:req.body.option2,
        optionname:req.body.optionname,
        reservationName: req.body.reservationName,
        person: req.body.person,
        date: req.body.date,
        reserve_status:req.body.reserve_status,
        time: req.body.time
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
    
});
    
///searching resaturant
routers.post('/search',async(req,res)=>{
    //const search=req.body.search;
    console.log(req.body.queryObj);
    let restaurantPattern = new RegExp("^" + req.body.query) ;
    let restaurantPatternLocation = new RegExp("^" + req.body.location) ;
    try{
        const posts=await Restaurentmodel.find({name:{$regex: restaurantPattern, $options: 'i'}})
        .select('name');
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
});
//search by location
routers.post('/search/location',async(req,res)=>{
    //const search=req.body.search;
    console.log(req.body.queryObj);
    let restaurantPattern = new RegExp("^" + req.body.query) ;
    let restaurantPatternLocation = new RegExp("^" + req.body.location) ;
    try{
        const posts=await Restaurentmodel.find({$or: [
            {name: {$regex: restaurantPattern, $options: 'i'}},
            {location: {$regex: restaurantPatternLocation, $options: 'i'}}
            // etc. add your other fields as well here
            ]})
        .select('name');
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
});

//Logging out
routers.get('/:postId',async(req,res)=>{
    try{
        const post=await Restaurentmodel.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
} );
//Creating an offerings like dinner,lunch,breakfast
routers.post('/sits',async(req,res)=>{
    //console.log(req.body);
    const post=new OfferModel({
            restaurantID: req.body.restaurantID,
            restaurantName: req.body.restaurantName,
            offeringName: req.body.offeringName,
            offeringCount: req.body.offeringCount,
            remainingSits: req.body.offeringCount
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
    
});
//DELETING a post
routers.delete('/:postId',async(req,res)=>{
    try{
        const removedPost=await Postmodel.remove({_id:req.params.postId});
        res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );

//updating a the reserve status of a post
routers.patch('/:postId',async(req,res)=>{
    try{
        //console.log(req.body.reserveStatus);
        const updatedPost=await ReservationModel.updateOne(
            {_id:req.params.postId},
            {$set:{reserve_status:req.body.reserveStatus}}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );
//updating the sit count for an offer
routers.patch('sits/:postId',async(req,res)=>{
    try{
        //console.log(req.body.reserveStatus);
        const updatedPost=await OfferModel.updateOne(
            {restaurantID:req.params.postId},
            {$set:{remainingSits:req.body.remainingSits}}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );

//adding menu items
// routers.post('/menu',upload("menuDir").single,async(req,res)=>{
//     //console.log(req.body);
//     const post=new MenuModel({
//         restaurantID:req.body.restaurantID,
//         restaurantName:req.body.restaurantName,
//         menuDir:req.body.menuName
//     });
//     post.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({message: err});
//     });
    

// });

module.exports=routers;
