const mongoose = require('mongoose')

const valueSchema = new mongoose.Schema({
    date:String,
    loose_price: Number,
    packing_cost_tin:Number,
    intrest_tin:Number,
    packing_cost_pouch:Number,
    intrest_pouch:Number,
  });
  
  
  const Value = mongoose.model('Value', valueSchema);
  
  module.exports = Value;