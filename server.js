const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 10000;

//const Person = require('./models/person');
//const MenuItem = require('./models/MenuItem');

//middleware function
const logRequest = (req, res, next)=> {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);
app.use(passport.initialize());
 

const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/' ,function (req, res) {//like a menu card
  res.send('Hello World')
}) 

const menuRoutes = require('./routes/menuRoutes');
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);
app.use('/MenuItem', menuRoutes);



app.listen(PORT, () => {
    console.log('server is listening');
} )//port
