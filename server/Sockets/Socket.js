import { Server } from "socket.io";
import chatModel from "../domain/model/chatModel.js";
import matchModel from "../domain/model/matchesModel.js";
import { addNewMsg, getLatestMessage } from "../interactors/ChatInteractor.js";
import { isUserMatched } from "../interactors/MatchesInteractor.js";



const io = new Server({
  cors: {
    origin: ["http://localhost:5173"] ,
  },
  pingTimeout: 60000,
});

global.onlineUsers = new Map();



io.on("connection", (Socket) => {
  console.log("user is logged in",Socket.id);

  global.chatSocket = Socket;
  
  Socket.on("add-user", (userId) => {
    console.log("user added as loggedddfas in user id ",userId);
    onlineUsers.set(userId, Socket.id);
  });


  Socket.on("remove-user", (userId) => {
    console.log("user remove in user id ",userId);
    if (userId) {
      onlineUsers.delete(userId);
     }
  });

  Socket.on("disconnect", () => {
    console.log("user disconnected", Socket.id);
    const userId = [...onlineUsers.entries()].find(([key, value]) => value === Socket.id)?.[0];
    console.log("obtained id",userId);
    if (userId) {
     onlineUsers.delete(userId);
    }
  });

  Socket.on("getOnlineUsers", async (user) => {
    let users = [];
    for (const [key, value] of onlineUsers.entries()) {
      if (key != user) {
        const matchedUser = await isUserMatched(user, key, matchModel);
        if (matchedUser) users.push(key);
      }
    }
      Socket.emit("onlineUsersList", users);
    
  });

  Socket.on("videoCall", (data) => {
    console.log("video call", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      data.video = true;
      data.modal = true;
      Socket.to(sendUserSocket).emit("incoming-video-call", data);
    }
  });

  Socket.on("callRejected", (data) => {
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      console.log("rejected", data);
      Socket.to(sendUserSocket).emit("videoCallRejected");
    }
  });

  Socket.on("send-msg", async (data) => {
    console.log(data.message);
    const sendUserSocket = onlineUsers.get(data.to);
    const result = await addNewMsg(data, chatModel);

    if (sendUserSocket) {
      Socket.to(sendUserSocket).emit("msg-recieve", result);
      const body = {
        conversationIds: result.conversationId,
      };
      const newData = await getLatestMessage(body, chatModel);
      Socket.to(sendUserSocket).emit("new-msg", newData);
    }
  });

  Socket.on("typing", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      Socket.to(sendUserSocket).emit("show-typing", data.from);
    }
  });

  Socket.on("stop-typing", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      Socket.to(sendUserSocket).emit("hide-typing", data.from);
    }
  });

});

io.on("connect_error", (error) => {
  console.log("Socket connect_error:", error);
});

io.on("error", (error) => {
  console.log("Socket error:", error);
});

export default io;
