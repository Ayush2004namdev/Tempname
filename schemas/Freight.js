const mongoose = require('mongoose')

const freightSchema = new mongoose.Schema({
    date:String,
    agraFrigit: Number,
    chandigharFrigit:Number,
    damtalFrigit:Number,
    dehradunFrigit:Number,
    ExPlantFrigit:Number,
    delhiFrigit:Number,
});
 

const Freight = mongoose.model('Freight', freightSchema);
  
module.exports = Freight;