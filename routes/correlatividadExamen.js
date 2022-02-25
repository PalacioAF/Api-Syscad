//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const correlatividadExamen=require('../controllers/correlatividadExamenController')

//Correlatividad Examen
router.get('/',auth,correlatividadExamen.GET);

module.exports=router;