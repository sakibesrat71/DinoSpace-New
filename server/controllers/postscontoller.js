const Restaurentmodel=require('../models/restaurentmodels');
const getlocation= ()=>{
    const success=(position)=>{
        console.log(position);
        const lat=position.coords.latitude;
        const long=position.coords.longitude;
        const geoAPI=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        fetch(geoAPI).
        then(response=>response.json()).
        then(data=>{
            console.log(data);
        });
    }
    const error=(err)=>{
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error);
    
}

const getpost=async(req,res) =>{
    try{ //const posts=await Restaurentmodel.find({});
    //getlocation();
    
    const posts=await Restaurentmodel.aggregate([
            {$sort: {rating: -1}},
           {$limit: 4}]);
    res.json(posts);
    
} catch(err){
    res.json({message:err});
}
}

module.exports = getpost;