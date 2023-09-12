const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const Value = require('./schemas/Values');
const Freight = require('./schemas/Freight');
const Direct = require('./schemas/DirectRates');
const Cfa = require('./schemas/CfaRats');
const app = express()

const public = path.join(__dirname , '/path')
app.use(bodyParser.urlencoded({ extended: false }));

const connectdb = async()=> {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(err){
    console.log('error connecting' , err)
  }
}



let flag = false;

let userData = {}
let frigitRates = {}
let cfaRates = {
agra : '',
chandighar : '',
damtal : '',
dehradun : '',
ExPlant: '',
delhi : ''
}

const date = new Date()
let todaydate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`


let directRates = {
  agra : '',
  chandighar : '',
  damtal: '',
  dehradun : '',
  ExPlant : '',
  delhi : ''
}

app.use(express.static('public'))
app.set('/css' , path.join(__dirname , '/public/css'))
app.set('/script' , path.join(__dirname , '/public/script'))
hbs.registerPartials(__dirname + '/views/partails')

app.set('views' , './views')
app.set('view engine' , 'hbs')

app.get('/' , (req , res)=> {
    res.render('firstpage')
})

app.get('/frigitRates' , async(req , res)=> {
    const {loose} = req.query
    userData.loose = loose
    res.render('secondpage')
})

app.get('/selectoptions' , (req , res)=> {
  const {agra , chandighar , damtal , dehradun , ExPlant , delhi} = req.query
  frigitRates.agra = agra
  frigitRates.chandighar = chandighar
  frigitRates.damtal = damtal
  frigitRates.dehradun = dehradun
  frigitRates.ExPlant = ExPlant
  frigitRates.delhi = delhi
  // console.log(frigitRates)
  res.render('fourthpage')
})

app.get('/selectState' , (req , res) => {
  const {packingCostTin , intrestTin , packingCostPouch , intrestPouch} = req.query
  userData.packingCostTin = packingCostTin
  userData.intrestTin = intrestTin
  userData.packingCostPouch = packingCostPouch
  userData.intrestPouch = intrestPouch
  console.log({userData , frigitRates , cfaRates , directRates}) 
  // console.log(frigitRates[state])
  // const {dataTin , dataPouch} = await calculate()
    // console.log(dataTin , dataPouch)
    res.render('thirdpage')
})

app.get('/cfa' , (req , res) => {
  flag = true
  res.render("fifthpage")
})

app.get('/direct' , (req , res) => {
  const {agra , chandighar , damtal , dehradun , ExPlant , delhi} = req.query
  directRates.agra = agra
  directRates.chandighar = chandighar
  directRates.damtal = damtal
  directRates.dehradun = dehradun
  directRates.ExPlant = ExPlant
  directRates.delhi = delhi
  // console.log(directRates)
  res.render("seventpage")
})

app.get('/directprice' , (req , res) => {
      res.render('sisxtpage')
})

let state = ''


app.get('/prices' , (req , res) => {
  
  const {agra , chandighar , damtal , dehradun , ExPlant , delhi} = req.query
  cfaRates.agra = agra
  cfaRates.chandighar = chandighar
  cfaRates.damtal = damtal
  cfaRates.dehradun = dehradun
  cfaRates.ExPlant = ExPlant
  cfaRates.delhi = delhi
  // console.log(cfaRates)
  res.render("seventpage")
})

function calculate(cfsrate , frigitrate , directrate){
  const {loose , packingCostTin , intrestTin, packingCostPouch , intrestPouch} = userData
  console.log({loose , frigitrate, packingCostTin , intrestTin , directrate , cfsrate })
  const add = loose*15 + + 15.94*frigitrate + + packingCostTin + +intrestTin + + directrate + + cfsrate 
  const dataTin = add * 0.05 + add
  const add2 = loose*0.91 + 0.97*frigitrate + + packingCostPouch + +intrestPouch + + directrate + + cfsrate 
  const dataPouch = add2*0.05 + add2
  return {
    dataTin , dataPouch
  }
}


app.get('/results' , async(req , res) => {
  const {loose , packingCostTin , intrestTin, packingCostPouch , intrestPouch} = userData
  const {agra , delhi , dehradun , damtal , ExPlant , chandighar} = frigitRates
  state = req.query.state
  console.log(state)
  let cfarate = cfaRates[state]
  let directrate = directRates[state]
  let frigitrate = frigitRates[state]
  const {dataTin , dataPouch} = await calculate(cfarate , frigitrate , directrate)

  try{
    if(flag == true){
      const newValue = new Value({
      date:todaydate,
      loose_price:loose,
      packing_cost_tin:packingCostTin,
      intrest_tin:intrestTin,
      packing_cost_pouch:packingCostPouch,
      intrest_pouch:intrestPouch,
      state:state,
      RouteType:'CFA',
      ratesTin:dataTin,
      ratesPouch:dataPouch
    })
    await newValue.save();
    console.log({newValue})
  }
  else{
    const newValue = new Value({
      date:todaydate,
      loose_price:loose,
      packing_cost_tin:packingCostTin,
      intrest_tin:intrestTin,
      packing_cost_pouch:packingCostPouch,
      intrest_pouch:intrestPouch,
      state:state,
      RouteType:'Direct',
      ratesTin:dataTin,
      ratesPouch:dataPouch
    })
    await newValue.save();
    console.log({newValue})
  }
    const newFrigitRate = new Freight({

      date:todaydate,
      agraFrigit: agra,
      chandigharFrigit:chandighar,
      damtalFrigit:damtal,
      dehradunFrigit:dehradun,
      ExPlantFrigit:ExPlant,
      delhiFrigit:delhi,
    })

    await newFrigitRate.save();
    console.log({newFrigitRate})

    if(!flag){

    const newDirectRate = new Direct({
      date:todaydate,
      agraDirect: directRates.agra,
      chandigharDirect:directRates.chandighar,
      damtalDirect:directRates.damtal,
      dehradunDirect:directRates.dehradun,
      ExPlantDirect:directRates.ExPlant,
      delhiDirect:directRates.delhi,
    })
    await newDirectRate.save();
    console.log({newDirectRate})

  }else{

    const newcfaRate = new Cfa({
      date:todaydate,
      agraCfa: cfaRates.agra,
      chandigharCfa:cfaRates.chandighar,
      damtalCfa:cfaRates.damtal,
      dehradunCfa:cfaRates.dehradun,
      ExPlantCfa:cfaRates.ExPlant,
      delhiCfa:cfaRates.delhi,
    })
    await newcfaRate.save();
    console.log({newcfaRate})

  }

  }catch(err){
    console.log('error creating the database ' + err)
  }

  let types
  if(flag == true) {
    types = "cfa"
  }
  else{
    types = 'direct'
  }
  res.render('ninthpage' , {
    types,
   state,
   dataPouch,
   dataTin 
  })
})

connectdb().then(()=>{
  app.listen(process.env.PORT , (err) => {
    err ? console.log(err) : console.log(`server running on port ${3000}`)
})
})


