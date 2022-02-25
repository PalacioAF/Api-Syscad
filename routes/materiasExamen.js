//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const materiasExamen=require('../controllers/materiasExamenController')

//Materias Examen
router.get('/',auth,materiasExamen.GET);

module.exports=router;