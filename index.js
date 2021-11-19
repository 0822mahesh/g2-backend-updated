
const express = require('express');

const userRoutes = require('./routes/users.js')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config();


mongoose.connect(
    process.env.MONGO_URL)
    .then(()=>console.log("db connected")).catch((err)=>{console.log(err)});
const app = express();

const PORT = process.env.PORT ||5000;

app.use(express.json());
app.use('/api/users',userRoutes)

app.listen(PORT,()=> console.log("server running on "+`${PORT}`))




