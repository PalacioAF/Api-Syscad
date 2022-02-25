//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const correlatividadCursado=require('../controllers/correlatividadCursadoController')

//Correlatividad Cursado
router.get('/',auth,correlatividadCursado.GET);

module.exports=router;