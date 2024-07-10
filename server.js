const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3002;

//const Person = require('./models/person');
//const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {//like a menu card
  res.send('Hello World')
}) 
app.post('/MenuItem', async(req, res)=>{
  try{
   const data = req.body
   const newMenu = new MenuItem(data);
     const response = await newMenu.save();
     console.log('data saved');
     res.status(200).json(response); 
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});

  }
})

app.get('/MenuItem', async(req, res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
}
catch(err){
console.log(err);
res.status(500).json({error: 'Internal server error'});
}
})
app.post('/person', async(req, res) =>{
  try{ 
    const data = req.body
    const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }

  catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'});
  }
})
//get method to get the person
app.get('/person',async(req,res)=>{
  try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})
app.get('/person/:workType', async(req,res)=>{
  try{
  const workType = req.params.workType;//params for parameter
  if(workType == 'chef' || workType == 'manager'|| workType =='waiter'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
  }else{
   res.status(404).json({error: 'invalid work type'});
  }
}catch(err){
  console.log(err);
  res.status(500).json({error: 'Internal server error'});
}
})
app.get('/MenuItem/:taste', async (req,res)=>{
  try{
  const taste = req.params.taste;// extract the work type form the url parameter
   if(taste=='sour'|| taste=='sweet'|| taste=='bitter'){
    const response= await MenuItem.find({taste: taste});
    console.log('response fetched');
    res.status(200).json(response);
  }
  else{
    res.status(404).json({error:'invalid work type'})
  }
}catch(err){
  console.log(err);
  res.status(500).json({error:'internal server error'});
}
})
const menuRoutes = require('./routes/menuRoutes');
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);
app.use('/MenuItem', menuRoutes);



app.listen(PORT, () => {
    console.log('server is listening');
} )//port
