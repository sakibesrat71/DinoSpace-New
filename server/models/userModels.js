const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        //unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      token:{
        type: String
      },
      phone: {
        type: String,
        required: true,
      },

    },

    {
        timestamps: true
    }
);

userSchema.plugin(findOrCreate);
//create a model for the schema
userSchema.methods.matchPassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};
  //the pasword is already benn hashed in userRoutes.js
//   // will encrypt password everytime its saved
//  userSchema.pre("save", async function (next) {
//  if (!this.isModified("password")) {
//      next();
// }
//  const salt = await bcrypt.genSalt(10);
//  this.password = await bcrypt.hash(this.password, salt);
//  });
  
 const User = mongoose.model("User", userSchema);
  
module.exports = User;