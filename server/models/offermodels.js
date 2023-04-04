const mongoose=require('mongoose');

const OfferSchema = mongoose.Schema({
    restaurantID: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    offeringName: {
        type: String,
        required: true
    },
    offeringCount: {
        type: Number,
        required: true
    },
    remainingSits: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Offers', OfferSchema);