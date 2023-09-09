const mongoose = require('mongoose')

const cfaSchema = new mongoose.Schema({
    date:String,
    agraCfa: Number,
    chandigharCfa:Number,
    damtalCfa:Number,
    dehradunCfa:Number,
    ExPlantCfa:Number,
    delhiCfa:Number,
});
 

const Cfa = mongoose.model('Cfa', cfaSchema);
  
module.exports = Cfa;