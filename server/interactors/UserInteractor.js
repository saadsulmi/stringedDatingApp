import path from "path";

export const findUserWithPhone = async (phone, userModel) => {
    try {
      const user = await userModel.findOne({ phone });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find user with phone");
    }
};

export const createNewUser = async (userData, userModel,  cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile,req) => {
    try {
      console.log(req.hostname);
      const user = new userModel(userData);
      
      if (req?.files?.profilePic) {
        
        const result = await uploadProfilePic(
          req.files.profilePic[0].path,
          cloudinary,
          removeFile
        );
        user.profilePic = result;
      }
  
      if (req?.files?.coverPic) {
        const result = await uploadCoverPic(
          req.files.coverPic[0].path,
          cloudinary,
          removeFile
        );
        user.coverPic = result;
      }
  
     if (req?.files?.image0) {
      console.log('hi');
        const result = await image(
          req.files.image0[0].path,
          cloudinary,
          removeFile
        );
        user.images.push(result) 
      }
  
     
  
      if (req?.files?.image1) {
        console.log('hlo');
        const result = await image(
          req.files.image1[0].path,
          cloudinary,
          removeFile
        );
        user.images.push(result) 
      }
  
      if (req?.files?.image2) {
        console.log('bye');
        const result = await image(
          req.files.image2[0].path,
          cloudinary,
          removeFile
        );
        user.images.push(result) 
      }
      await user.save();
      return user;
    } catch (error) {
      console.log(err);
      throw new Error("failed to create new user");
    }
  };