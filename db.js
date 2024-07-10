const mongoose = require('mongoose');
require('dotenv').config();

// define the mongodb connection url
//const mongoURL= 'mongodb://localhost:27017/hotels'
//const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db= mongoose.connection;

db.on('connected',()=>{       //event listener
    console.log('connected to mongodb server');
});

db.on('error',(err) => {       
    console.error('mongodb connection error:',err);
});

db.on('disconnected',()=>{       
    console.log('mongodb disconnected');
});

//export it
module.exports = db;