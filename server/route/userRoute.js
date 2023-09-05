import express from 'express'
import {sendOtp,checkOtp} from '../utils/twilio.js'
import userModel from '../domain/model/userModel.js';
import matchModel from "../domain/model/matchesModel.js";
import {upload} from '../utils/Multer.js'
const userRoute=express.Router();


import {
  phoneOtp,
  verifyOtp,
  userData,
  userDetails,
  likeUser,
  dislikeUser,
  discoverUsers,
  editUser,
  googleLogin,
  deleteUserImage,
  matchedUsers,
  getAllLikedUsers,
  blockUser
} from "../controller/userController.js";

import {
    findUserWithPhone,
    createNewUser,
    findUserWithId,
    likeUserAndMatch,
    dislikeAUser,
    showUsers,
    findUserWithEmail,
    UpdateUser,
    deleteImage,
    getMatchedUsers,
    showAllLikedUsers,
    blockAUser
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


userRoute.post( "/googleLogin",googleLogin(findUserWithEmail, userModel, createUserToken, createJwtToken));


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

userRoute.use(VerifyJwtToken(verifyUserToken));

userRoute.get("/userData", userData(findUserWithId, userModel));

userRoute.get("/discover", discoverUsers(userModel, showUsers));

userRoute.put("/likeUser", likeUser(userModel, matchModel, likeUserAndMatch));

userRoute.put("/dislikeUser", dislikeUser(userModel, dislikeAUser, matchModel));

userRoute.patch(
  "/userEdit",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
    { name: "image0", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  editUser(
    userModel,
    UpdateUser,
    cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile
  )
);

userRoute.patch("/deleteImage", deleteUserImage(userModel, deleteImage));

userRoute.get("/matches", matchedUsers(getMatchedUsers, matchModel, userModel));

userRoute.get("/allLikedUsers", getAllLikedUsers(showAllLikedUsers, userModel));

userRoute.put("/blockUser", blockUser(userModel, blockAUser));

export default userRoute