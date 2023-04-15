const mongoose = require('mongoose');
const validator=require("validator");
const doctorSchema = new mongoose.Schema(
  {
    firstName:{
      type:String,
      required:[true,"name required"],
      minlength:[3,"too short name"],
      maxlength:[10,"too long name"],
  },
  lastName:{
    type:String,
    required:[true,"name required"],
    minlength:[3,"too short name"],
    maxlength:[10,"too long name"],
 },
  age:{
      type:Number,
      required:true
  },
    gender:{
      type:String,
      enum:{
        values:["male","female"],
        message:" choose male or female"
      }
    },
    department:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"please provide your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"please provid a valed email"]
    },
    password:{
        type:String,
        require:[true,"please provide a password"],
        minlenght:8

    },
    passwordConfirm:{
        type:String,
        required:[true,"please conferm a password"]
    },
    address:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true,
        unique:true
    }
  
}
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
