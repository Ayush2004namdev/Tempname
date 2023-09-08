const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
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
agracfa : '',
chandigharcfa : '',
damtalcfa : '',
dehraduncfa : '',
ExPlantcfa : '',
delhicfa : ''
}


let directRates = {
  agradirect : '',
  chandighardirect : '',
  damtaldirect : '',
  dehradundirect : '',
  ExPlantdirect : '',
  delhidirect : ''
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
  const {agraFrigit , chandigharFrigit , damtalFrigit , dehradunFrigit , ExPlantFrigit , delhiFrigit} = req.query
  frigitRates.agraFrigit = agraFrigit
  frigitRates.chandigharFrigit = chandigharFrigit
  frigitRates.damtalFrigit = damtalFrigit
  frigitRates.dehradunFrigit = dehradunFrigit
  frigitRates.ExPlantFrigit = ExPlantFrigit
  frigitRates.delhiFrigit = delhiFrigit
  // console.log(frigitRates)
  res.render('fourthpage')
})

app.get('/cfa' , (req , res) => {
  res.render("fifthpage")
})

app.get('/direct' , (req , res) => {
  const {agradirect , chandighardirect , damtaldirect , dehradundirect , ExPlantdirect , delhidirect} = req.query
  directRates.agradirect = agradirect
  directRates.chandighardirect = chandighardirect
  directRates.damtaldirect = damtaldirect
  directRates.dehradundirect = dehradundirect
  directRates.ExPlantdirect = ExPlantdirect
  directRates.delhidirect = delhidirect
  // console.log(directRates)
  res.render("sisxtpage")
})

app.get('/prices' , (req , res) => {
  const {agracfa , chandigharcfa , damtalcfa , dehraduncfa , ExPlantcfa , delhicfa} = req.query
  cfaRates.agracfa = agracfa
  cfaRates.chandigharcfa = chandigharcfa
  cfaRates.damtalcfa = damtalcfa
  cfaRates.dehraduncfa = dehraduncfa
  cfaRates.ExPlantcfa = ExPlantcfa
  cfaRates.delhicfa = delhicfa
  // console.log(cfaRates)
  res.render("seventpage")
})




app.get('/results' , async(req , res) => {
  
  const {packingCostTin , intrestTin , packingCostPouch , intrestPouch} = req.query
  userData.packingCostTin = packingCostTin
  userData.intrestTin = intrestTin
  userData.packingCostPouch = packingCostPouch
  userData.intrestPouch = intrestPouch
  console.log({userData , frigitRates , cfaRates , directRates}) 
  // const {directratetin , directratepouch} = await calculate()
  res.render('eighthpage')
})


app.listen(3000 , (err) => {
    err ? console.log(err) : console.log(`server running on port ${3000}`)
})