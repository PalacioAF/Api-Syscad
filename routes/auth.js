//Auth Route
const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController')

//Login
router.post('/',authController.login);

module.exports=router;