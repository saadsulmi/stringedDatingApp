import {sendSuccessResponse,sendErrorResponse } from '../interactors/ResponseInteractor.js'

export const phoneOtp = (SendPhoneOtp, sendOtp) => async (req, res) => {
    const { phone } = req.body;
    try {
      console.log("hehehehehhe");
      await SendPhoneOtp(phone, sendOtp);
      sendSuccessResponse(res,{ success: true })
    } catch (error) {
      console.error(error);
      sendErrorResponse(res,{ success: false, message: "Some error occurred" })
    }
};

export const verifyOtp =
  (
    VerifyPhoneOtp,
    checkOtp,
    userModel,
    findUserWithPhone,
    createJwtToken,
    createUserToken
  ) =>
  async (req, res) => {
    const { otp, phone } = req.body;
    console.log(otp,phone);
    try {
      const verificationStatus = await VerifyPhoneOtp(otp, phone, checkOtp);
      if (verificationStatus.status === "approved") {
        const user = await findUserWithPhone(phone, userModel);
        if (!user) {
          sendSuccessResponse(res,{
            success: true,
            newUser: true,
            redirect: "/mobile",
          })
        } else {
          const token = await createJwtToken(user, createUserToken);
          sendSuccessResponse(res,{ success: true, token, redirect: "/Discover" ,user })
        }
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res,{ success: false, message: "Some error occurred" })
    }
  };


  export const googleLogin =
  (findUserWithEmail, userModel, createUserToken, createJwtToken) =>
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await findUserWithEmail(email, userModel);
      if (!user) {
        sendSuccessResponse(res,{ success: true, redirect: "/createAccount", newUser: true })
      }else{
      const token = await createJwtToken(user, createUserToken);
      sendSuccessResponse(res,{ success: true, token, redirect: "/findStrings", user: user })
      }
    } 
    catch (error) {
      console.error(error);
      sendErrorResponse(res,{ success: false, message: "Failed to login with Google" },400)
    }
  };



export const userDetails =
    (createNewUser, createJwtToken, userModel, createUserToken,  cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile) =>
    async (req, res) => {
    try {
      const user = await createNewUser(req.body, userModel,  cloudinary,
        uploadProfilePic,
        uploadCoverPic,
        image,
        removeFile,req);
        const token = await createJwtToken(user, createUserToken);
        sendSuccessResponse(res,{ success: true, redirect: "/profile", user, token })

    } catch (error) {
      sendErrorResponse(res,{ error: "Failed to create user" },400)
    }
};

export const userData = (findUserWithId, userModel) => async (req, res) => {
  try {
    const user = await findUserWithId(req.user.id, userModel);
    sendSuccessResponse(res,user)
  } catch (error) {
    sendErrorResponse(res,{ error: error },400)
  }
};

export const discoverUsers = (userModel, showUsers) => async (req, res) => {
  try {
    const users = await showUsers(req, userModel);
    sendSuccessResponse(res,users)
  } catch (error) {
    sendErrorResponse(res,error,400)
  }
};

export const matchedUsers =
  (getMatchedUsers, matchModel, userModel) => async (req, res) => {
    try {
      const matches = await getMatchedUsers(req.user.id, matchModel, userModel);
      sendSuccessResponse(res,matches)
    } catch (error) {
      sendErrorResponse(res,error,400)
    }
  };


export const likeUser =
  (userModel, matchModel, likeUserAndMatch) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await likeUserAndMatch(
        req.user.id,
        User,
        userModel,
        matchModel
      );
      sendSuccessResponse(res,user)
    } catch (error) {

      sendErrorResponse(res,{ message: error.message },400)
    }
  };


  export const dislikeUser =
  (userModel, dislikeAUser, matchModel) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await dislikeAUser(req.user.id, User, userModel, matchModel);
      sendSuccessResponse(res,user)
    } catch (error) {
      sendErrorResponse(res,error,400)
    }
  };


  
  export const editUser =
  (
    userModel,
    updateUser,
    cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile
  ) =>
  async (req, res) => {
    try {
      const user = await updateUser(
        userModel,
        req,
        cloudinary,
        uploadProfilePic,
        uploadCoverPic,
        image,
        removeFile
      );
      sendSuccessResponse(res,user)
    } catch (error) {
      sendErrorResponse(res,error,400)
    }
  };

  export const deleteUserImage = (userModel, deleteImage) => async (req, res) => {
    try {
    await deleteImage(req.body.path, req.user.id, userModel)
    sendSuccessResponse(res,{message:true})
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };

  export const getAllLikedUsers =
  (showAllLikedUsers, userModel) => async (req, res) => {
    try {
      const users = await showAllLikedUsers(req.user.id, userModel);
      sendSuccessResponse(res,users)
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };

  export const getAllInterestedUsers = (showAllInterestedUsers,matchModel, userModel,findUserWithId) => async (req, res) => {
    try {
      const user = await findUserWithId(req.user.id, userModel);
      const users = await showAllInterestedUsers(req.user.id, userModel,matchModel,user);
      sendSuccessResponse(res,users)
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };

  export const searchAllRequestedUsers = (searchInterestedUsers,matchModel, userModel,findUserWithId) => async (req, res) => {
    try {
      const user = await findUserWithId(req.user.id, userModel);
      const users = await searchInterestedUsers(req.user.id, userModel,matchModel,user,req.body.searchkey);
      sendSuccessResponse(res,users)
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };

  
  export const blockUser = (userModel, blockAUser) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await blockAUser(req.user.id, User, userModel);
      sendSuccessResponse(res,user)
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };
  
  export const verifyPayment =
  (verifySubscription, userModel) => async (req, res) => {
    try {
      const { pack } = req.body;
      const user = await verifySubscription(userModel, pack, req.user.id);
      sendSuccessResponse(res,user)
    } catch (error) {
      console.log(error);
      sendErrorResponse(res,error)
    }
  };
  
  export const getInterestNotification = (showMatchNotification,matchModel, userModel,findUserWithId) => async (req, res) => {
    try {
      const user = await findUserWithId(req.user.id, userModel);
      const notification = await showMatchNotification(req.user.id, userModel,matchModel,user);
      sendSuccessResponse(res,notification)
    } catch (error) {
      sendErrorResponse(res,error)
    }
  };

    export const readnotification=(readMatchNotification,matchModel, userModel,findUserWithId)=>async(req,res)=>{
      try{
        const user = await findUserWithId(req.user.id, userModel);
        const notification = await readMatchNotification(req.user.id, userModel,matchModel,user);
        sendSuccessResponse(res,notification)
        }catch(err){
          console.log(err);
          sendErrorResponse(res,{ message: err})
      }
    }

    export const searchLikedUser=(findlikedUser,userModel)=> async(req,res)=>{
      try { 
        let key = req.body.searchkey
        const searchData= await findlikedUser(req.body.id,key,userModel);
        console.log(searchData);
        sendSuccessResponse(res,searchData)
      } catch (error) {
        console.log(error);
        sendErrorResponse(res,{ message: error})
      }
    }

    export const searchAllMatchedUsers = (searchMatchedUsers, matchModel, userModel) => async (req, res) => {
    try {
      const matches = await searchMatchedUsers(req.user.id, matchModel, userModel,req.body.searchkey);
      sendSuccessResponse(res,matches)
    } catch (error) {
      sendErrorResponse(res,error,400)
    }
  };