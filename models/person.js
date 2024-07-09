const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true//for compulsory field
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],//array ddefined
        required:true,
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
});
// create model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;