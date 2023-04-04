const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
//middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
const {protect} = require("./Middleware/AuthMiddleware");
//import routes 
const postroutes = require('./routes/posts');
app.use('/post',postroutes);

const reserveroutes = require('./routes/restaurentDash');
app.use('/reserve',reserveroutes);

const reserving = require('./routes/reserveAPI');
app.use('/offer', reserving);

const userRoutes = require('./routes/userRoutes');
app.use("/api/users", userRoutes);


// app.use('/posts',()=>{
    
//     console.log('example of middleware');
// });
//you have the ability to create routes
app.get('/',(req,res)=>{
    res.send('lets monetize dinospace');
} )



//connect to the db 
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true},
()=>{
    console.log('connected to db');
});
//how do we start listening to the server
app.listen(5001);
