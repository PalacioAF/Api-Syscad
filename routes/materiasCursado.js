//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const materiasCursado=require('../controllers/materiasCursadoController')

//Materias Cursado
router.get('/',auth,materiasCursado.GET);

module.exports=router;