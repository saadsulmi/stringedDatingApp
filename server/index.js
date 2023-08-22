import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js";
import userRoute from './route/userRoute.js'
import ChatRouter from "./route/ChatRouter.js"

const app = express();
const PORT=process.env.PORT

app.use(cors())

connectDB.then(()=>{
    console.log('Database connected succefully');
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/api/chat", ChatRouter);
app.use('/api',userRoute);




app.listen(PORT,()=>console.log(`server connected successfully @ ${PORT}`))