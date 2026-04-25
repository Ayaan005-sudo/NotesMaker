const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const crypto =require("crypto");
const { createHmac } = require('node:crypto');
const cookieParser=require("cookie-parser");
const {Usermodel}=require("./models/user.js");
const jwt=require("jsonwebtoken");
const protect =require("./middleware/protected.js");
const {TokenModel}=require("./models/session.js");
const{NoteModel}=require("./models/notes.js");
const cors=require("cors");
const  router  = require("./Routes/authrouter.js");
app.use(cors({
  origin: "http://localhost:5173", // frontend ka origin
  credentials: true                // cookies allow karne ke liye
}));
app.use(express.json());
app.use(cookieParser());
app.use("/",router);
async function main(){
  
   await mongoose.connect(process.env.MONGO_UR);
}
main()
.then(()=>console.log("DB connected suucessfully"))
.catch((err)=>console.log(err));
  
let port=3000;

app.listen(port,()=>{
   console.log("server is runnning");
});



// app.post("/signup",async(req,res)=>{
   
//    let {name,email,password}=req.body;
//  try{
//    if(!name||!email||!password){
//      return res.status(400).json({message:"enter all details"});
//    }

// const User = await Usermodel.findOne({
//    $or:[
//    {name:name },
//    {email:email}
//       ]});

//       if(User){
//         return res.status(400).json({mess:"user already exists"});
//       }

// const hash = crypto.createHmac('sha256', process.env.SECRET_CRYPTO)
//                .update(password)
//                .digest('hex');
// console.log(hash);

// const newUser=await new Usermodel({
//    name,
//    email,
//    password:hash,

// });
// await newUser.save();

// const RefreshToken=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
// expiresIn:"7d"
// });

// const newToken =await new TokenModel({
//    userId:newUser._id,
//    token: RefreshToken,
// })
// await newToken.save();

// res.cookie("refreshToken",RefreshToken ,{
//    httpOnly:true,
//    secure:false,
//    sameSite:"lax",
//    maxAge:7*24*60*60*1000
// });


// const accessToken=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
// expiresIn:"15m"
// });


// const user={
//    name:newUser.name,
//    email:newUser.email
// }


// res.status(201).json({message:"user created successfully",user,accessToken});
//  }catch(e){
//    console.log(e);
//    res.status(400).json({message:e.message})
//  }



// });

// app.get("/dashboard",protect,async(req,res)=>{
//    try{
//  const user = await Usermodel.findById(req.user.id);

//    res.status(200).json({
//       message:"welcome to dashboard",
      
//    })
//    }catch(error){
//       res.status(400).json({message:"route not reached"});
//    }
   
// })


// app.get("/refreshToken",async(req,res)=>{
  
//    const refreshToken=req.cookies.refreshToken;

//    if(!refreshToken){
//       return res.status(401).json({
//          message:"refersh token not found"
//       })
//    }
//    const tokenInDB = await TokenModel.findOne({ token: refreshToken });

//     if (!tokenInDB) {
//       return res.status(403).json({ message: "Token revoked" });
//     }

// const decoded=jwt.verify(refreshToken,process.env.JWT_SECRET);
// const user=await Usermodel.findById(decoded.id);
// console.log(user);
// const resUser={
//    name:user.name,
//    email:user.email,
// };

// const RefreshToken=jwt.sign({id:decoded.id},process.env.JWT_SECRET,{
// expiresIn:"7d"
// });

// res.cookie("refreshToken",RefreshToken ,{
//    httpOnly:true,
//    secure:false,
//    sameSite:"lax",
//    maxAge:7*24*60*60*1000
// });

// await TokenModel.deleteOne({token:refreshToken});

// await TokenModel.create({
//    userId:decoded.id,
//    token:RefreshToken,
// });

//    const accessToken=jwt.sign({id:decoded.id},process.env.JWT_SECRET,{
//       expiresIn:"15m"
//    });



//    res.status(200).json({message:"token created",resUser,accessToken});
// });

// app.post("/login",async(req,res)=>{
//    try{
//    let {name,email,password}=req.body;
// console.log(req.body);
//    const user=await Usermodel.findOne({email});

//    if(!user){
//     return  res.status(404).json({message:"The username or email doesnot exist"});
// }
// const hashPasword=crypto.createHmac('sha256', process.env.SECRET_CRYPTO)
//                .update(password)
//                .digest('hex');
//                console.log("hash :",hashPasword);
//                console.log("userpass:",user.password);
// if(hashPasword===user.password){
//    console.log(true);
//    console.log("hash:", JSON.stringify(hashPasword));
// console.log("userpass:", JSON.stringify(user.password));
// }



// if(hashPasword!=user.password){
//    console.log("wrong call");
//   return  res.status(401).json({message:"invalid credentials"});
// };
// console.log(user);
// let accessToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
// expiresIn:"15m"
// });
// let refreshToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
// expiresIn:"7d"
// });

// const newToken = await TokenModel.create({
// userId:user._id,
// token:refreshToken,
// });

// res.cookie("refreshToken",refreshToken ,{
//    httpOnly:true,
//    secure:false,
//    sameSite:"lax",
//    maxAge:7*24*60*60*1000
// });
// console.log("gooing to calll suucess");
// const resUser={
//    name:user.name,
//    email:user.email,
// };

// res.status(201).json({message:"user login successfully",resUser,accessToken});
//    }catch(error){
//       console.log(error.message);
//       res.status(404).json({message:"not able to log in"});
//    }

// });

// app.post("/logout",async(req,res)=>{
//    const refreshToken=req.cookies.refreshToken;

//    await TokenModel.deleteOne({token:refreshToken});
//    res.clearCookie("refreshToken");

//    res.status(200).json({message:"logout successfully"});
// });


// app.post("/addNotes",protect,async(req,res)=>{
//    try {
     
//     const newNote = await NoteModel.create({
//       userId: req.user.id,       
//       title: req.body.title,
//       content: req.body.content,
//     });

//     res.status(201).json(newNote);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating note" });
//   }
// })

// app.get("/notes", protect, async (req, res) => {
//   try {
//     const notes = await NoteModel.find({ userId: req.user.id });
//     console.log(notes);
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching notes" });
//   }
// });

// app.delete("/notes/:id", protect, async (req, res) => {
//   try {
    
//     const note = await NoteModel.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id, // ensure sirf apne notes delete ho
//     });

//     if (!note) {
//       return res.status(404).json({ message: "Note not found or not authorized" });
//     }

//     res.status(200).json({ message: "Note deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting note" });
//   }
// });