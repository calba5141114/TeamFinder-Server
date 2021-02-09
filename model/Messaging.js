const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

    date: {
    type: String,
    required: true,
  },
content:{
    type:String,
    required:true
}

})
    module.exports = mongoose.model('Message', MessageSchema);