import { config } from "dotenv";
import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js";
import userRoute from './route/userRoute.js'
import ChatRouter from "./route/ChatRouter.js"
import paymentRouter from "./route/paymentRouter.js"
import io from './Sockets/Socket.js'
config();

const app = express();
const PORT=process.env.PORT

app.use(cors())


app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}))


app.use('/api',userRoute);
app.use("/api/chat", ChatRouter);
app.use("/api/payment", paymentRouter);



connectDB().then(() => {
    let server=app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`);
    });
    io.attach(server)
  });