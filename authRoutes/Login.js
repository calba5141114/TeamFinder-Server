const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../model/User');





// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
/// send user id to email address
// get put user.password = hashed then save



router.get('/verify',async (req, res,next) => {
  try{

  const token = req.header('authorization');

    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: error});
      } else {
        req.user = decoded.user;
        next();
      }
    });





  } catch (err) {
    res.json(err)
  }
})


router.post('/reset',async (req, res,next) => {
  try{

  const password = req.body.password
  const id = req.body.id
      
console.log('worked')
  const user = await User.findById(id).select('-password');
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
   user.save().then(
   res.send("Successfully reset password")
   )
    


  }
  catch(err){
   res.json(err)
  }


  })




router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

      let user = await User.findOne({email})

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

 const payload = {
   user:{
     id:user.id
   }
 }

 jwt.sign(
   payload,
   config.get('jwtSecret'),
   {expiresIn:'1d'},
    (err,token)=>{
      res.json({token});
    }
   );
   
    } catch (err) {
      res.json(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;