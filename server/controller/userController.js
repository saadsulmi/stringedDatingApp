export const phoneOtp = (SendPhoneOtp, sendOtp) => async (req, res) => {
    const { phone } = req.body;
    console.log(phone);
    try {
      await SendPhoneOtp(phone, sendOtp);
      res.json({ success: true }).status(200);
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Some error occurred" });
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
          console.log('i am just waiting to send res');
          res.json({
            success: true,
            newUser: true,
            redirect: "/createAccount",
          });
        } else {
          const token = await createJwtToken(user, createUserToken);
          res.json({ success: true, token, redirect: "/Discover" ,user });
        }
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Some error occurred" });
    }
  };


  export const googleLogin =
  (findUserWithEmail, userModel, createUserToken, createJwtToken) =>
  async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email,"server side email");
      const user = await findUserWithEmail(email, userModel);
      if (!user) {
        res
        .status(200)
        .json({ success: true, redirect: "/createAccount", newUser: true });
      }else{
        
      const token = await createJwtToken(user, createUserToken);
      res
        .status(200)
        .json({ success: true, token, redirect: "/findStrings", user: user });
      }
    } 
    catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to login with Google" });
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
        console.log("i am on server side");
        res.status(200)
        .json({ success: true, redirect: "/profile", user, token });
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
};

export const userData = (findUserWithId, userModel) => async (req, res) => {
  try {
    const user = await findUserWithId(req.user.id, userModel);
    res.json(user).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const discoverUsers = (userModel, showUsers) => async (req, res) => {
  try {
    console.log("working on server side");
    const users = await showUsers(req, userModel);
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const matchedUsers =
  (getMatchedUsers, matchModel, userModel) => async (req, res) => {
    try {
      const matches = await getMatchedUsers(req.user.id, matchModel, userModel);
      res.status(200).json(matches);
    } catch (error) {
      res.status(400).json(error);
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
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  export const dislikeUser =
  (userModel, dislikeAUser, matchModel) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await dislikeAUser(req.user.id, User, userModel, matchModel);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
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
      console.log(user);
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  export const deleteUserImage = (userModel, deleteImage) => async (req, res) => {
    console.log('hi');
    try {
    await deleteImage(req.body.path, req.user.id, userModel)
      res.json({message:true})
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const getAllLikedUsers =
  (showAllLikedUsers, userModel) => async (req, res) => {
    try {
      const users = await showAllLikedUsers(req.user.id, userModel);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  };

  export const blockUser = (userModel, blockAUser) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await blockAUser(req.user.id, User, userModel);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };