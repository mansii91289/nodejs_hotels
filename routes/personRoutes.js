const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async(req, res)=>{
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

router.get('/',async(req,res)=>{
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

  router.get('/person/:worktype', async (req,res)=>{
    try{
    const worktype = req.params.worktype;// extract the work type form the url parameter
     if(worktype=='chef'|| worktype=='manager'|| worktype=='waiter'){
      const response= await person.find({work: worktype});
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
  router.put('/:id', async(req,res) =>{
    try{
        const personId = req.params.id;// extract id from url parameter
        const updatedPersonData = req.body;// updated data for the person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,//return updated document
            runValidators: true,// run mongoose validation
        })
          if (!response) {
            return res.status(404).json({error: 'Person not found'});
          }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  })

  router.delete('/:id', async(req,res)=>{
    try{
      const personId = req.params.id;
       const response = await Person.findByIdAndRemove(personId);
       if (!response) {
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data deleted');
      res.status(200).json({message: 'person Deleted'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  })



  module.exports = router;
