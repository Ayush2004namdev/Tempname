const mongoose = require('mongoose')

const directSchema = new mongoose.Schema({
    date:String,
    agraDirect: Number,
    chandigharDirect:Number,
    damtalDirect:Number,
    dehradunDirect:Number,
    ExPlantDirect:Number,
    delhiDirect:Number,
});
 

const Direct = mongoose.model('Direct', directSchema);
  
module.exports = Direct;