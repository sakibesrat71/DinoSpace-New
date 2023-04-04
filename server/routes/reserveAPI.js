const express = require('express');
const routers=express.Router();
const Postmodel=require('../models/postmodels');
const ReservationModel=require('../models/reservationModel');
const OfferModel=require('../models/offermodels');
const UserModels=require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

routers.patch('/sitrestuponrejection/:postId',async(req,res)=>{
    try{
        //console.log(req.body.reserveStatus);
        const updatedPost=await OfferModel.updateOne(
            {_id:req.params.postId},
            {$set:{remainingSits:req.body.newsits}}
        );
        console.log("dhukse");
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );
routers.patch('/:postId',async(req,res)=>{
    try{
        //console.log(req.body.reserveStatus);
        const updatedPost=await OfferModel.updateOne(
            {_id:req.params.postId},
            {$set:{remainingSits:req.body.remainingSits}}
        );
        console.log("dhukse for reserve");
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );
routers.patch('/sitreset/:postId',async(req,res)=>{
    try{
        //console.log(req.body.reserveStatus);
        const updatedPost=await OfferModel.updateOne(
            {_id:req.params.postId},
            {$set:{remainingSits:req.body.prevSitCount}}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message:err});
    }
} );

routers.get('/:id',async(req,res)=>{
    try{
        const post=await OfferModel.find({restaurantID :req.params.id});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
})
routers.get('/user/:id',async(req,res)=>{
    try{
        const post=await UserModels.findOne({_id :req.params.id});
        res.json(post);
        console.log("entered user link");
    }
    catch(err){
        res.json({message:err});
    }
})

routers.get('/cop/user/:id',async(req,res)=>{
    try{
        const post=await UserModels.findOne({_id :req.params.id});
        res.json(post);
        console.log("entered user link");
    }
    catch(err){
        res.json({message:err});
    }
})
routers.get('/userreserve/:postId',async(req,res)=>{
    
        // const posts=await Restaurentmodel.find({});
        // res.json(posts);
        //console.log(token)
        try{ //const posts=await Restaurentmodel.find({});
            //getlocation();
            console.log(req.params.postId);
            const posts=await ReservationModel.find( { userID: req.params.postId} );
            res.json(posts);
            
        } catch(err){
            res.json({message:err});
        }
} );
routers.get('/singleoffer/:id',async(req,res)=>{
    try{
        const post=await OfferModel.find({_id :req.params.id});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
})
routers.delete('/reservedel/:id',async(req,res)=>{
    try{
        const removedPost=await ReservationModel.deleteMany({option2:req.params.id});
        res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }
})

module.exports=routers;