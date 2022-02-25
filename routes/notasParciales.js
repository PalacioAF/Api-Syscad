//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const notasParciales=require('../controllers/notasParcialesController')

//Examenes
router.get('/',auth,notasParciales.GET);

module.exports=router;