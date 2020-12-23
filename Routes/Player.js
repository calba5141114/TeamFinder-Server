const express = require('express')
const { model } = require('mongoose')
const router = express()
const Info = require('../model/Info')
const User = require('../model/User')
const auth = require('../middleware/auth');


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







router.post('/',auth,async (req,res)=>{
   const {Archetype,Overall,Winpercentage,Rep,Position,System,Type,Status} = req.body;
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
      _id
  })
Infos.save()
.then(res.json('success'))

})


router.patch('/:id',auth,async (req,res)=>{
    try{
const pl = await Info.findById(req.params.id);    
 pl.Status = req.body.Status
 const a1 = await pl.save()
 res.json(a1)
    }
    catch(err){
    console.log(err)

    }
})

module.exports = router