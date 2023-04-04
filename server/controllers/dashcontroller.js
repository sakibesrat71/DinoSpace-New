const Reservemodel=require('../models/reservationModel');

const getreservation=async(req,res) =>{
    try{ //const posts=await Restaurentmodel.find({});
    //getlocation();
    console.log(req.params.postId);
    const posts=await Reservemodel.find( { restaurantID: req.params.postId} )
    // const posts=await Reservemodel.aggregate([
    //         {$sort: {date: -1}}]);
    res.json(posts);
    
} catch(err){
    res.json({message:err});
}
}

module.exports = getreservation;