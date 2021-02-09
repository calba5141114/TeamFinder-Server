const express = require('express')
const { model } = require('mongoose')
const router = express()
const User = require('../model/User')
const Message = require('../model/Messaging')

const auth = require('../middleware/auth');



router.get('/messaging',auth, async (req,res)=>{
    try{
    const Messages = await Message.find();
    res.json(Messages)
    }
    catch(err){
    res.json(err)
    }
})

router.post('/messaging',auth,async(req,res)=>{
    
    try{
   const {content,date,name} = req.body
    const message = await new Message({
        content,
        date,
        name
    })
    message.save()
    }
    catch(err){
    res.json(err)
    }


})

module.exports = router