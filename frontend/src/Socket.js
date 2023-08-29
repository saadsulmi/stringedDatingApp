import { io } from "socket.io-client"

// const URL = 

export const socket = io('http://localhost:8000', {
  autoConnect: false,
  secure: true,
})

// socket.on("connect",()=>{
//   console.log("connected socet");
// })

// socket.connect();

socket.io.opts.debug = true;
