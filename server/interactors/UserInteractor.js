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

export const findUserWithId = async (id, userModel) => {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find user");
  }
};


export const findUserWithEmail = async (email, userModel) => {
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find user");
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

  export const showUsers = async (req, userModel) => {
    try {
      const user = await userModel.findById(req.user.id);
      let users;
      if (user.Preference === "Everyone") {
        users = await userModel.find({ _id: { $ne: user._id } });
      } else {
        users = await userModel.aggregate([
          {
            $match: {
              gender: user.Preference,
            },
          },
        ]);
      }
      
      console.log(users,"here is my");
      return users;
    } catch (error) {
      throw new Error("Failed to lookup users");
    }
  };

  export const likeUserAndMatch = async (user1, user2, userModel, matchModel) => {
    try {
      console.log(user1,user2);
      const user = await userModel.findByIdAndUpdate(
        user1,
        {
          $push: {
            likedUsers: user2,
          },
        },
        { new: true }
      );
  
      let match = await matchModel.findOne({
        $or: [
          {
            $and: [{ "user1._id": user1 }, { "user2._id": user2 }],
          },
          {
            $and: [{ "user1._id": user2 }, { "user2._id": user1 }],
          },
        ],
      });
      if (match) {
        (match.user2.liked = true), (match.isMatched = true);
        await match.save();
      } else {
        match = await new matchModel({
          user1: {
            _id: user1,
            liked: true,
          },
          user2: {
            _id: user2,
          },
        });
        await match.save();
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("failed to like User ");
    }
  };


  export const dislikeAUser = async (user1, user2, userModel, matchModel) => {
    try {
      console.log(user2);
      let user;
      const isUserLiked = await userModel.findOne({
        _id: user1,
        likedUsers: { $in: [user2] },
      });
      console.log(isUserLiked);
      if (isUserLiked) {
        isUserLiked.likedUsers.pull(user2);
        const match = await matchModel.findOne({
          $or: [
            {
              $and: [{ "user1._id": user1 }, { "user2._id": user2 }],
            },
            {
              $and: [{ "user1._id": user2 }, { "user2._id": user1 }],
            },
          ],
          isMatched: true,
        });
        if (match) {
          if (match.user1._id == user1) {
            match.user1.liked = false;
            match.isMatched = false;
          } else {
            match.user2.liked = false;
            match.isMatched = false;
          }
          await match.save();
        }
        await isUserLiked.save();
      }
      user = await userModel.findByIdAndUpdate(
        user1,
        {
          $push: {
            dislikedUsers: user2,
          },
        },
        { new: true }
      );
  
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("failed to dislike User");
    }
  };