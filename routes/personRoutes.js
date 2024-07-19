const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async(req, res)=>{
    try{ 
      const data = req.body
      const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        const payload = {
          id: response.id,
          username: response.username   

        }
         console.log(JSON.stringify(payload));
         const token = generateToken(payload);
         console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
      }
  
    catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal server error'});
    }
})
//login Route
router.post('/login', async(req, res)=>{
  try{
    //extract username nd password frm request body
    const {username, password} = req.body;
   //find user by username
   const user = await Person.findOne({username: username});
  //if user not exist or password not found
  if(!user || !(await user.comparePassword(password) )){
     return res.status(401).json({error: 'Invalid username or password'});
  }
   //generate token if all correct
   const payload = {
    id : user.id,
    username: user.username
   }
   const token = generateToken(payload);

   //return token as response
    res.json({token})
   
  }
  catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
  }
} );

//profile route
router.get('/profile',jwtAuthMiddleware, async (req, res) => {
  try{
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }catch(err){
    console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
  }
})

router.get('/',jwtAuthMiddleware ,async(req,res)=>{
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
