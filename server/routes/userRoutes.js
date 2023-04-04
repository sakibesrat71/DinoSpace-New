const express = require("express");
const {registerUser, authUser, reserveUser, logoutUser} = require("../controllers/DinerController");
const router = express.Router();
const {protect} = require("../Middleware/AuthMiddleware");
const Usermodel=require('../models/userModels');
const bcrypt = require('bcryptjs');

//router.route("/registration").post(registerUser);
router.post('/registeruser',async(req,res)=>{
    console.log(req.body);
    const post=new Usermodel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    });
    Usermodel.findOne({email:req.body.email})
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
router.route("/login").post(authUser);
router
// router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);
router.route('/reservation').post(protect, reserveUser)
router.route('/logout').get(logoutUser)

router.route('/profile').get(protect, reserveUser)

module.exports = router;