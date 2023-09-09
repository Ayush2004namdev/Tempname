const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const app = express()

const public = path.join(__dirname , '/path')
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1/rates',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

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


let directRates = {
  agra : '',
  chandighart : '',
  damtal: '',
  dehradun : '',
  ExPlant : '',
  delhi : ''
}

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

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

    // try {
    //     // Create a new Person document based on the request body
    //     console.log(loose)
    //     const newPerson = new Person({
    //        loose
    //     });
    
    //     // Save the document to the database
    //     await newPerson.save();
    
    //     console.log(newPerson)
    //   } catch (error) {
    //     console.error('Error adding person:', error);
    //     res.status(500).json({ error: 'Could not add person to the database' });
    //   }
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
  const dataTin = loose*15 + 15.94*frigitrate + + packingCostTin + +intrestTin + + directrate + + cfsrate + + (loose*15 + 15.94*frigitrate + packingCostTin +intrestTin + directrate + cfsrate)*5/100
  const dataPouch = loose*0.91 + 0.97*frigitrate + + packingCostPouch + +intrestPouch + + directrate + + cfsrate + + (loose*0.91 + 0.97*frigitrate + packingCostPouch +intrestPouch + directrate + cfsrate)*5/100
  console.log({dataTin , dataPouch})
  return {
    dataTin , dataPouch
  }
}


app.get('/results' , async(req , res) => {
  state = req.query.state
  console.log(state)
  let cfsrate = cfaRates[state]
  let directrate = directRates[state]
  let frigitrate = frigitRates[state]
  const {dataTin , dataPouch} = await calculate(cfsrate , frigitrate , directrate)
  console.log({cfsrate , frigitrate , directrate})
  res.render('eighthpage' , {
   state,
   dataPouch,
   dataTin 
  })
})


app.listen(3000 , (err) => {
    err ? console.log(err) : console.log(`server running on port ${3000}`)
})