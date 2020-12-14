const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
Archetpye:{
    type:String,
    required:true,

},
Overall:{
    type:String,
    required:true,
},
Winpercentage:{
    type:String,
    required:true,
},
Rep:{
    type:String,
    required:true,
},

Height:{
    type:String,
    required:true,
},

System:{
    type:String,
    required:true,
},
Type:{
    type:String,
    required:true,
}
})
    module.exports = mongoose.model('info', InfoSchema);