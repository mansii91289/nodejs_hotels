const mongoose = require('mongoose');
// define the mongodb connection url
const mongoURL= 'mongodb://localhost:27017/hotels'

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