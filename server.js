  
const express = require('express');
const connectDB = require('./config/db');
const Player = require('./Routes/Player')
const path = require('path');
const app = express();
const auth = require("./middleware/auth")
const Login = require('./authRoutes/Login')
const Signup = require('./authRoutes/Signup')
const cors = require("cors")


try{
    connectDB();

}
catch(err){
    console.log(err)
}
app.use(cors())

app.use(express.json());
app.get("/", express.static(path.join(__dirname, "./public")));

const port = 3000



app.use('/player',Player)
app.use('/Login',Login)
app.use('/Signup',Signup)


app.get('/', (req, res) => {
   res.send('Hello World!')
 })
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })