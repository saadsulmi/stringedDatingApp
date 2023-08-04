const mongoose=require('mongoose');
require('dotenv').config()

const DB=mongoose.connect(process.env.MONGODB_URL);


module.exports=DB