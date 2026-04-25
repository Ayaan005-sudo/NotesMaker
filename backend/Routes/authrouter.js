const express=require("express");
const { Signup, login, logout, dashboard, refreshToken, getNotes, addNotes, deleteNotes } = require("../Controlers/authcontroller");
const protect = require("../middleware/protected");
const app=express();

const router=express.Router();


router.post("/signup",Signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/dashboard",protect,dashboard);
router.get("/refreshToken",refreshToken);
router.get("/notes",protect,getNotes);
router.post("/addNotes",protect,addNotes);
router.delete("/notes/:id",protect,deleteNotes);

module.exports= router;