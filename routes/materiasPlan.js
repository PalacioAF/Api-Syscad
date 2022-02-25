//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const materiasPlan=require('../controllers/materiasPlanController')

//Materias Plan
router.get('/',auth,materiasPlan.GET);

module.exports=router;