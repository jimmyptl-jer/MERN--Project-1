import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';


import connectDB from './config/db.js'
import playerRoutes from './routes/soccerRoutes.js'

dotenv.config()

// Establish a connection to the MongoDB database
connectDB();

const app = express();

// Define the port where the server will listen (use the provided PORT or default to 5000)
const PORT = process.env.PORT || 5000;

//CORS setup
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use('/player',playerRoutes);

app.get('/',(req,res)=>{
  res.send('Server is ready')
})


app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`)
})