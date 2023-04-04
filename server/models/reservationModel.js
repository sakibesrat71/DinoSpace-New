const mongoose=require('mongoose');

const ReserveSchema = mongoose.Schema({
    userID:{
        type:String
    },
    restaurantID: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    optionname: {
        type: String,
        required: true
    },
    reservationName: {
        type: String,
        required: true
    },
    person: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    reserve_status: {
        type: String
    },
    time:{
        type: String
    }
});

module.exports = mongoose.model('Reserve', ReserveSchema);