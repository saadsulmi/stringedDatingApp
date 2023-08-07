import express from "express"
import connectDB from "./config/mongodb.js";


const PORT=8000

const app = express();


connectDB.then(()=>{
    console.log('Database connected succefully');
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))


import userRoute from './route/userRoute.js'
app.use('/api/user',userRoute)



app.listen(PORT,()=>console.log(`server connected successfully @ ${PORT}`))