const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificacionesController');
const auth = require('../middleware/auth');

router.get('/',
    auth,
    notificacionesController.getNotificaciones
);

module.exports = router;