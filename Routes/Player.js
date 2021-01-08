const express = require('express')
const { model } = require('mongoose')
const router = express()
const Info = require('../model/Info')
const User = require('../model/User')
const auth = require('../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

router.get('/',auth,(req,res)=>{
    Info.find().then(info=>{
        res.json(info)
    }).catch(err =>{
        console.log(err)

    })

})


router.get('/:id',auth,(req,res)=>{
    Info.findById(req.params.id).then(info=>{
        res.json(info)
    }).catch(err =>{
        console.log(err)

    })

})

router.get('/user',auth, async (req,res)=>{
    try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
    }
    catch(err){
    res.json(err)
    }
})







router.post('/',  [
    check('Archetype', 'Archetype is required').exists(),
    check('Overall', 'Overall is required').exists(),
    check('Winpercentage', 'Winpercentage is required').exists(),
    check('Rep', 'Rep is required').exists(),
    check('System', 'System is required').exists(),
    check('Type', 'Type is required').exists(),
    check('Position', 'Position is required').exists(),
    check('Gamertag', 'Gamertag is required').exists(),


  ],auth,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const {Archetype,Overall,Winpercentage,Rep,Position,System,Type,Status,Gamertag} = req.body;
     try{  
   const Player = await User.findById(req.user.id).select('-password');
       const Ids = await User.findById(req.user.id).select('-password -email -name -date');
       const _id = Ids

  const Infos  = new Info({
      Archetype,
      Overall,
      Winpercentage,
      Rep,
      System,
      Type,
      Position,
      Player,
      Status,
      _id,
     Gamertag
  })



const saver = await Infos.save()
res.json(saver)

  }
catch(err){
    console.log(err.message)
}
})

router.patch('/:id',auth,async (req,res)=>{
try{
const pl = await Info.findById(req.params.id);  
if(pl !== null){
 pl.Status = req.body.Status
 const a1 = await pl.save()
 res.json(a1)
}  
 }
    catch(err){
    console.log(err.message)

    }
})

module.exports = router