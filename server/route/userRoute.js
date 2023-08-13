import express from 'express'
import {sendOtp,checkOtp} from '../utils/twilio.js'
import userModel from '../domain/model/userModel.js';
import {upload} from '../utils/Multer.js'
const userRoute=express.Router();


import {
  phoneOtp,
  verifyOtp,
  userDetails
} from "../controller/userController.js";

import {
    findUserWithPhone,
    createNewUser
} from '../interactors/UserInteractor.js'

import{
    uploadProfilePic,
    uploadCoverPic,
    image
} from '../interactors/CloudinaryInteractor.js'

import removeFile from '../utils/FileRemover.js';
import cloudinary from '../utils/Cloudinary.js';
import { VerifyJwtToken, createJwtToken } from '../interactors/AuthInteractor.js'
import { createUserToken, verifyUserToken} from '../utils/jwt.js'
import { SendPhoneOtp,VerifyPhoneOtp } from '../interactors/OtpInteractor.js';

userRoute.post("/phone", phoneOtp(SendPhoneOtp, sendOtp));

userRoute.post(
"/verifyOtp",
verifyOtp(
    VerifyPhoneOtp,
    checkOtp,
    userModel,
    findUserWithPhone,
    createJwtToken,
    createUserToken
)
);


userRoute.post(
    "/createAccount",
    upload.fields([
      { name: "profilePic", maxCount: 1 },
      { name: "coverPic", maxCount: 1 },
      { name: "image0", maxCount: 1 },
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
    ]),
    userDetails(
      createNewUser,
      createJwtToken,
      userModel,
      createUserToken,
      cloudinary,
      uploadProfilePic,
      uploadCoverPic,
      image,
      removeFile
    )
);

export default userRoute