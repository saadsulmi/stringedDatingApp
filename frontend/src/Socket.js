import { io } from "socket.io-client"

const URL = import.meta.env.VITE_SOCKET_URL
console.log("hey gooys this is my paid",URL);
export const socket = io(URL, {
  autoConnect: false,
  secure: true,
})

// socket.on("connect",()=>{
//   console.log("connected socet");
// })

// socket.connect();

socket.io.opts.debug = true;
