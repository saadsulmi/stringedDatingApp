import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    birthday: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    coverPic: {
      type: String,
    },
    ageLimit:{
      type:[],
    },
    images: {
      type: [String],
    },
    location: {
      type: String,
    },
    distance:{
      type:Number,
    },
    latitude:{
      type:Number,
    },
    longitude:{
      type:Number,
    },
    Preference: {
      type: String,
      enum: ["Male", "Female", "Everyone"],
    },
    LookingFor: {
      type: String,
    },
    realationshipStatus: {
      type: String,
    },
    faith: {
      type: String,
    },
    smoking: {
      type: String,
    },
    drinking: {
      type: String,
    },
    bio: {
      type: String,
    },
    myStory: {
      type: String,
    },
    StringedVipType: {
      type: [String],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    blockedUsers:{
      type:[mongoose.Schema.Types.ObjectId]
    },
    likedUsers:{
      type:[mongoose.Schema.Types.ObjectId]
    },
    dislikedUsers:{
      type:[mongoose.Schema.Types.ObjectId]
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;