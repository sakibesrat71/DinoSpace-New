const mongoose = require('mongoose');
const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: String
  });
const RestaurentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
       type: AddressSchema,
       //type: String,
        required: true
    },   
    cuisine: {
        type: [String]
    },
    rating:{
        type: Number
    },
    location: {
        type: String
    },
    user_ID: {
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    opening_time:{
        type: String
    },
    closing_time:{
        type: String
    }
});
module.exports = mongoose.model('Restaurents', RestaurentSchema);