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
const async = require('hbs/lib/async');
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

app.get('/' , async (req , res)=> {
    
    res.render('firstpage' )
})

app.get('/frigitRates' , async(req , res)=> {
    const {loose} = req.query
    let frieghtrates = await Freight.findById('65001f577291b73d7cc547cf')
    userData.loose = loose
    res.render('secondpage' , {frieghtrates})
})

app.get('/selectoptions' , async (req , res)=> {
  const {agra , chandighar , damtal , dehradun , ExPlant , delhi} = req.query
  frigitRates.agra = agra
  frigitRates.chandighar = chandighar
  frigitRates.damtal = damtal
  frigitRates.dehradun = dehradun
  frigitRates.ExPlant = ExPlant
  frigitRates.delhi = delhi
  // console.log(frigitRates)
  let cfarates = await Cfa.findById('64fef9293351baee48f48322')
  res.render("fifthpage" , {cfarates})
})

app.get('/selectState' , (req , res) => {
  const {packingCostTin , intrestTin , packingCostPouch , intrestPouch} = req.query
  userData.packingCostTin = packingCostTin
  userData.intrestTin = intrestTin
  userData.packingCostPouch = packingCostPouch
  userData.intrestPouch = intrestPouch
  // console.log(frigitRates[state])
  // const {dataTin , dataPouch} = await calculate()
    // console.log(dataTin , dataPouch)
    res.render('thirdpage')
})

app.get('/cfa' , async(req , res) => {
  
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

app.get('/directprice' , async (req , res) => {
  const {agra , chandighar , damtal , dehradun , ExPlant , delhi} = req.query
  cfaRates.agra = agra
  cfaRates.chandighar = chandighar
  cfaRates.damtal = damtal
  cfaRates.dehradun = dehradun
  cfaRates.ExPlant = ExPlant
  cfaRates.delhi = delhi
  // console.log(cfaRates)
  let rates = await Direct.findById('65002b29a43b26ff472c7ef7')
      res.render('sisxtpage' , {rates})
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

function calculate(frigitrate , rate , flag){
  const {loose , packingCostTin , intrestTin, packingCostPouch , intrestPouch} = userData
  console.log({loose , packingCostTin , intrestTin, packingCostPouch , intrestPouch , rate ,flag})
  const add = loose*15 + + 15.94*frigitrate + + packingCostTin + +intrestTin + + rate
  const datatin = add * 0.05 + add
  let add2
  if(flag == true){
    add2 = loose*0.91 + 0.97*frigitrate + + packingCostPouch + +intrestPouch + + rate/12
  }
  else{
    add2 = loose*0.91 + 0.97*frigitrate + + packingCostPouch + + intrestPouch + +  rate/12
  }
  
  const datapouch = add2*0.05 + add2
  return {
    datatin , datapouch
  }
}  



app.get('/selectRoute' , (req , res) => {
  state = req.query.state
  res.render('fourthpage')
})

app.get('/cfaRoute' , (req , res)=> {
  flag = true
  res.redirect('/results')
})

app.get('/directRoute' , (req , res)=> {
  flag = false
  res.redirect('/results')
})



app.get('/results' , async(req , res) => {
  const {loose , packingCostTin , intrestTin, packingCostPouch , intrestPouch} = userData
  const {agra , delhi , dehradun , damtal , ExPlant , chandighar} = frigitRates

  let cfarate = parseFloat(cfaRates[state])
  let directrate = parseFloat(directRates[state])
  let frigitrate = parseFloat(frigitRates[state])
  let dataTin,dataPouch
  try{
    if(flag == true){
    const {datatin , datapouch} = calculate(frigitrate , cfarate,flag)
    dataTin = datatin
    dataPouch = datapouch
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

  }
  else{
    const {datatin , datapouch} = calculate(frigitrate , cfarate,flag)
    console.log({datatin , datapouch , directrate})
    dataTin = datatin + + directrate
    dataPouch = datapouch + + directrate/12
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


