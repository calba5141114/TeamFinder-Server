const express = require('express')
const { model } = require('mongoose')
const router = express()
const Info = require('../model/Info')

router.get('/',(req,res)=>{
    Info.find().then(info=>{
        res.json(info)
    }).catch(err =>{
        console.log(err)

    })
    

})

router.post('/',(req,res)=>{
   const {Archetpye,Overall,Winpercentage,Rep,position,System,Type} = req.body;
  const Infos  = new Info({
      Archetpye,
      Overall,
      Winpercentage,
      Rep,
      System,
      Type,
      position,
  })
Infos.save()
.then(res.json('success'))
})


module.exports = router