const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
_id:{
    type:String,
    required:true
}
,
Archetype:{
    type:String,
    required:true,

},
Player:{
    type:String,
    required:true
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

Position:{
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
},
Status:{
    type:String,
    required:false
}
})
    module.exports = mongoose.model('info', InfoSchema);