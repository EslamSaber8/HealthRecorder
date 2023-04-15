const mongoose = require('mongoose');
const validator=require("validator");
const pationtSchema = new mongoose.Schema(
  {
    fristName:{
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
  bloodType: {
      type: String,
      required: [true, 'bloodType required'],
      enum: {
        values: ['A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-'],
        message: "must choose a valid bloodtype('A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-')"
      }
    },
    gender:{
      type:String,
      enum:{
        values:["mail","femail"],
        message:" choose mail or femail"
      }
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
  phoneNumber:{
    type:String,
    require:true,
    unique:true
}
  
}
);

const Pationt = mongoose.model('Pationt', pationtSchema);

module.exports = Pationt;
