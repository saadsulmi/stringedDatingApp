import { sendErrorResponse,sendSuccessResponse } from "../interactors/ResponseInteractor.js";

export const getMessage=(chatModel,getAllChats)=>async(req,res)=>{
     try {
        const messages=await getAllChats(req.body,chatModel)
        sendSuccessResponse(res,messages)
  } catch (error) {
    next(error);
  } 
}
export const addMessage=(chatModel,addNewMsg)=>async(req,res)=>{
  try {
   const data=await addNewMsg(req.body,chatModel)
    if (data) return sendSuccessResponse(res,{ msg: "Message added successfully." });
    else return sendErrorResponse(res,{ msg: "Failed to add message to the database" },400);
  } catch (error) {
    console.log(error);
  }
}

export const getLastMessage=(chatModel,getLatestMessage)=>async(req,res)=>{
    try{
        const data=await getLatestMessage(req.body,chatModel)
        sendSuccessResponse(res,data)
    }catch(err){
        console.log(err);
        sendErrorResponse(res,{ message: err })
    }
}

export const readmessage=(chatModel,markChatAsRead)=>async(req,res)=>{
  try{
      const data=await markChatAsRead(req.user.id,req.body,chatModel)
      sendSuccessResponse(res,{message:'true'})
  }catch(err){
      console.log(err);
      sendErrorResponse(res,{ message: err})
  }
}