import express from 'express'
import {sendOtp} from '../middleware/utils/twilio.js'
import generateOTP from '../middleware/utils/otpGenerator.js'
const userRoute=express.Router();

userRoute.post('/otp',(req,res)=>{
    const{phone}=req.body
    const otp=generateOTP()
    const welcomeMessage = `Your Stringed verification code is ${otp}`;
    sendOtp(phone,welcomeMessage);
    res.status(200).json({message:`otp send successfuly to ${phone}`})

});

export default userRoute