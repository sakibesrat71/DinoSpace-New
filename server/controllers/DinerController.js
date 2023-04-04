const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")
const generateToken = require("../Utility/JWT-imp");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, cpassword, mobile } = req.body;

   // const usernameExists = await User.findOne({ name });
    const emailExists = await User.findOne({email});
  
    if (usernameExists) {
      res.status(404);
     // throw new Error("Username has already been taken");
    }else if(emailExists){
        res.status(404);
    //  throw new Error("An account already exists under this email");
    }
  
    const user = await User.create({
        name, 
        email, 
        password, 
        cpassword, 
        mobile
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User cannot be created");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  const reserveUser = asyncHandler(async (req, res) => {
    res.status(200).json({msg: 'you are authorized'})
  })
  
  const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
  })

module.exports = {registerUser, authUser, reserveUser, logoutUser};