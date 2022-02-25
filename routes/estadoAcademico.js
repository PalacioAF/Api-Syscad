//Auth Route
const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const estadoAcademico=require('../controllers/estadoAcademicoController')

//Estado Academico
router.get('/',auth,estadoAcademico.GET);

module.exports=router;