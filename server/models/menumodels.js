const mongoose=require('mongoose');

const MenuSchema = mongoose.Schema({
    restaurantID: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    menuDir: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Menus', MenuSchema);