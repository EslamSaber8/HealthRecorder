const mongoose = require('mongoose');
const validator=require("validator");
const bcrypt=require("bcryptjs")
const doctorSchema = new mongoose.Schema(
  {
   firstName:{
      type:String,
      required:[true,"first name required"],
      minlength:[3,"too short name"],
      maxlength:[10,"too long name"],
  },
  lastName:{
    type:String,
    required:[true,"last name required"],
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
        values:["mail","femail"],
        message:" choose mail or femail"
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
        required:[true,"please provide a password"],
        minlenght:8

    },
    // passwordConfirm:{
    //     type:String,
        
    // },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    }
  
}
);
doctorSchema.pre('save',async function(next){
  //only run if password was actile modifed
  if(!this.isModified('password')) return next();
  this.password= await bcrypt.hash(this.password,12)
  next();
})
doctorSchema.methods.correctPassword=async function( condidatePassword,doctorPassword){
  return await bcrypt.compare(condidatePassword,doctorPassword);
};

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
