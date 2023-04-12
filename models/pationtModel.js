const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const pationtSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"name required"],
      minlength:[3,"too short name"],
      maxlength:[10,"too long name"],
  },
  age:{
      type:Number,
      required:true
  },
  bloodType: {
      type: String,
      required: [true, 'bloodType required'],
      enum: {
        values: ['A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-'],
        message: "must choose a valid bloodtype('A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-')"
      }
    },
  
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Pationt = mongoose.model('Pationt', pationtSchema);

module.exports = Pationt;
