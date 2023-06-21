const {promisify}=require("util");
const jwt=require("jsonwebtoken");
const Pationt=require("./../models/pationtModel");
//const cloudinary=require("../utils/cloudinary");
const catchAsync=require("./../utils/catchAsync");
const appError=require("./../utils/appError")
const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
     } )
}
exports.signup=catchAsync(async(req,res,next)=>{
  //const result = await cloudinary.uploader.upload(req.file.path, {
        // tags: "pationtImg",
      //   folder: "pationtImg/",
    //   });
//  console.log(result);
    const newPationt=await Pationt.create({
        fristName:req.body.fristName,
        lastName:req.body.lastName,
        relativeRelation:req.body.relativeRelation,
        relativeName :req.body.relativeName,
        relativeNumber:req.body.relativeNumber,
        age:req.body.age,
        bloodType:req.body.bloodType,
        gender:req.body.gender,
        email:req.body.email,
         password:req.body.password,
         phoneNumber:req.body.phoneNumber,
         National_ID:req.body. National_ID,
        chronic_Diseases:req.body.chronic_Diseases,
        Health_problems:req.body.Health_problems,
        Hereditary_diseases:req.body.Hereditary_diseases,
        Surgical_operations:req.body.Surgical_operations,
        
         //image:result.secure_url,
        // x_ray:req.body.x_ray

         
    })
 const token= signToken(newPationt._id)
    res.status(201).json({
        status:"success",
        token,
        data:{
            pationt:newPationt
        }
    })
})
exports.login=catchAsync( async(req,res,next)=>{
     const {email,password}=req.body;
     //check if email and pass  exist
     console.log(email,password)
     if(!email||!password){
        return next(new appError("please provid email or password",400))
     }
     //check if user exest&&pass is corect
     const pationt=await  Pationt.findOne({email}).select("+password")
     if(!pationt|| !await pationt.correctPassword(password,pationt.password) ){
        return next(new appError('incorect email or password',401))
     }
     //if all ok send token
     const token=signToken(pationt._id);
     res.status(200).json({
        status:"success",
        data:{pationt},
        token
     })
})
// exports.protect=catchAsync(async(req,res,next)=>{
//     // 1) get token and checkof its there
//     let token;
//     if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
//         token=req.headers.authorization.split(" ")[1];
//     }
//     if(!token){
//         return next(new appError('you are not logged in  please login to get access',401))
//     }
//     //2)vertification token
//      const  decoded=await  promisify(jwt.verify)(token,process.env.JWT_SECRET);
     
//     //3)check if user stell exists
//     const currentUser=await Pationt.findById(decoded.id);
//     if(!currentUser){
//        return next(new appError(" The user belonging to this token dose not longer exist",401))
//     }
//     //4) check if user change password after token was issued 
//     if(currentPationt.changedPasswordAfter(decoded.iat)){
//         return next(new appError('User recently change password , please login again',401))
//     }
//     req.pationt=currentPationt;
//     next();
// })