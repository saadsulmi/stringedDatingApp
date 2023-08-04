const express=require('express');
const userRoute=express.Router();

userRoute.post('/',(req,res)=>{
    const {phone}=req.body
})

module.exports=userRoute