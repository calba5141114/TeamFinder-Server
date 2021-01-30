  
const express = require('express');
const connectDB = require('./config/db');
const Player = require('./Routes/Player')
const path = require('path');
const app = express();
const auth = require("./middleware/auth")
const Login = require('./authRoutes/Login')
const Signup = require('./authRoutes/Signup')
const cors = require("cors")
var nodemailer = require('nodemailer');
const User = require('./model/User')
const jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teamfinder2k@gmail.com',
    pass: 'Ahmed180@@'
  }
});

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

app.post(
  '/forgot',async (req, res) => {

    const { email, password } = req.body;

      let user = await User.findOne({email})

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }




          const payload = {
        user: {
          id: user.id
        }
      };

      const token =  jwt.sign(
        payload,
        'jwtSecret',
        { expiresIn: '5m' }
        )

  var mailOptions = {
  from: 'barreahmed600@gmail.com',
  to: email,
  subject: 'Password reset', 
  html: '<p>Click <a href="http://localhost:3001/reset/' + user.id + '/'+token+'">here</a> to reset your password</p>'
};

res.json('Check your email for password reset link')
return transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    } 
  
);


app.get('/', (req, res) => {
   res.send('Hello World!')
 })
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })