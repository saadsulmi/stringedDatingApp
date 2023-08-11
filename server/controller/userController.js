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
    try {
      const verificationStatus = await VerifyPhoneOtp(otp, phone, checkOtp);
      if (verificationStatus.status === "approved") {
        const user = await findUserWithPhone(phone, userModel);
        if (!user) {
          res.json({
            success: true,
            newUser: true,
            redirect: "/createAccount",
          });
        } else {
          const token = await createJwtToken(user, createUserToken);
          res.json({ success: true, token, redirect: "/Discover" });
        }
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Some error occurred" });
    }
  };

export const userDetails =
    (createNewUser, createJwtToken, userModel, createUserToken,  cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile,req) =>
    async (req, res) => {
    try {
        const user = await createNewUser(req.body, userModel,  cloudinary,
        uploadProfilePic,
        uploadCoverPic,
        image,
        removeFile,req);
        const token = await createJwtToken(user, createUserToken);
        res
        .status(200)
        .json({ success: true, redirect: "/profile", user, token });
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
};