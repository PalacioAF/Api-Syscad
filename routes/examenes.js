//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const examenes=require('../controllers/examenesController')

//Examenes
router.get('/',auth,examenes.GET);

module.exports=router;