const jwt =require("jsonwebtoken");
const dotenv=require("dotenv");
const { Usermodel } = require("../models/user");
dotenv.config();

const protect=(req,res,next)=>{
   
    const authtoken=req.headers.authorization?.split(" ")[1];
console.log(authtoken);
    if(!authtoken){
      return  res.status(401).json({message:"token not found"});
    }
    console.log("TOKEN:", authtoken);
try{
 const decoded=jwt.verify(authtoken,process.env.JWT_SECRET);
     

     req.user=decoded;

    next();
}catch(error){
      console.log("JWT ERROR:", error.message);
    return res.status(401).json({
        message:"invalid user"
    })
}
   
};

module.exports=protect;