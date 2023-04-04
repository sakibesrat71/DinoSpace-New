const getpost=require('../controllers/postscontoller.js');
const express = require('express');
const routers=express.Router();
const Postmodel=require('../models/postmodels');
const Restaurentmodel=require('../models/restaurentmodels');
const OfferModels=require('../models/offermodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//gets a post
routers.get('/',async(req,res)=>{
    try{
        // const posts=await Restaurentmodel.find({});
        // res.json(posts);
        getpost(req,res);
    }
    catch(err){
        res.json({message:err});
    }
} );

//sign UP as restaurant
routers.post('/',async(req,res)=>{
    console.log(req.body);
    const post=new Restaurentmodel({
        name: req.body.name,
        address: req.body.address,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        location: req.body.location,
        user_ID: req.body.user_ID,
        email: req.body.mail,
        password: req.body.password,
        opening_time: req.body.openingTime,
        closing_time: req.body.closingTime
    });
    Restaurentmodel.findOne({email:req.body.mail})
    .then(data=>{
        if(data){
            res.json({message:"email already exists"});

        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.json({message:err});
                }
                else{
                    post.password=hash;
                }
                post.save()
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.json({message: err});
                });
            }); 
        }
    });
    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({message: err});
    // });
    
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

//getting SPECIFIC post
routers.get('/:postId',async(req,res)=>{
    try{
        const post=await Restaurentmodel.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
} );
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
//login
routers.post('/login',async(req,res)=>{
    try{
        const restaurant = await Restaurentmodel.findOne({
            email: req.body.email
        })
        if(restaurant){
            if(bcrypt.compareSync(req.body.password,restaurant.password)){
                const token=jwt.sign({
                    id:restaurant._id,
                    name:restaurant.name,
                    email:restaurant.email
                },'secret123');
                return res.json({status:'ok' , user:token , role: 'restaurant'});
            }
            else {
                return res.json({status:'ok' , user: 'error' ,role:'error'});
            }
        }
        else {
            return res.json({status:'error' , user:'error'});
        }
    }
    catch(err){

    }
})
//updating a post
// routers.patch('/:postId',async(req,res)=>{
//     try{
//         const updatedPost=await Postmodel.updateOne(
//             {_id:req.params.postId},
//             {$set:{title:req.body.title}}
//         );
//         res.json(updatedPost);
//     }
//     catch(err){
//         res.json({message:err});
//     }
// } );
//updating the restaurant opening and closing time
routers.patch('/:postId',async(req,res)=>{
    try{
        console.log('entered');
        console.log(req.body.newTime.openTime);
        const updatedPost=await Restaurentmodel.updateOne(
            {_id:req.params.postId},
            {$set:{opening_time:req.body.newTime.openTime,
                   closing_time:req.body.newTime.closeTime }}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );
//updating restaurant profile
routers.patch('/update/:postId',async(req,res)=>{
    console.log(req.body);
    const post=new Restaurentmodel({
        name: req.body.name,
        address: req.body.address,
        cuisine: req.body.cuisine,
        location: req.body.location,
        password: req.body.password
    });
    // Restaurentmodel.findOne({email:req.body.mail})
    // .then(data=>{
    //     if(data){
    //         res.json({message:"email already exists"});

    //     }
    //     else{
    //         bcrypt.hash(req.body.password,10,(err,hash)=>{
    //             if(err){
    //                 res.json({message:err});
    //             }
    //             else{
    //                 post.password=hash;
    //             }
    //             post.save()
    //             .then(data => {
    //                 res.json(data);
    //             })
    //             .catch(err => {
    //                 res.json({message: err});
    //             });
    //         }); 
    //     }
    // });
    const password2 = req.body.password;
    bcrypt.hash(password2,10,(err,hash)=>{
                    if(err){
                        res.json({message:err});
                    }
                    else{
                        password2=hash;
                    }
                });
    const updatedPost=await Restaurentmodel.updateOne(
        {_id:req.params.postId},
        {$set:{name: req.body.name,
            address: req.body.address,
            cuisine: req.body.cuisine,
            location: req.body.location,
            password: password2}}
    );
    res.json(updatedPost);
});
module.exports=routers;
