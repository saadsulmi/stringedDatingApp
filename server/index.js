const express = require('express');
const app = express();
const PORT=8000
const db=require('./config/mongodb');
db.then(()=>{
    console.log('Database connected succefully');
})



const userRoute=require('./route/userRoute')
app.use('/api',userRoute)



app.listen(PORT,()=>console.log(`server connected successfully @ ${PORT}`))