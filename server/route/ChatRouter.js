import express from "express";
const chatRouter= express.Router();

import chatModel from '../domain/model/chatModel.js'

import {
  addMessage,
  getMessage,
  getLastMessage,
  readmessage,
} from "../controller/chatController.js";

import {
  VerifyJwtToken
} from "../interactors/AuthInteractor.js";


import {
  verifyUserToken
} from "../utils/jwt.js";


import {
  addNewMsg,
  getAllChats,
  getLatestMessage,
  markChatAsRead
} from "../interactors/ChatInteractor.js";


chatRouter.use(VerifyJwtToken(verifyUserToken));

chatRouter.post("/addmsg", addMessage(chatModel, addNewMsg));

chatRouter.post("/getmsg", getMessage(chatModel, getAllChats));

chatRouter.post("/lastmsg", getLastMessage(chatModel, getLatestMessage));

chatRouter.post("/markRead", readmessage(chatModel, markChatAsRead));


export default chatRouter;
