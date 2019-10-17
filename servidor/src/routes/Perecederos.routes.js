const {Router} = require('express')
const PerecederosCtrl = require('../controllers/Perecederos.controller')

router = Router();
router
    .get('/parametros/bodegas',PerecederosCtrl.bodegas)
    .get('/parametros/ajustes',PerecederosCtrl.ajustes)
    .get('/parametros/fruver/informe',PerecederosCtrl.informeFruver)
    
    .get('/*',PerecederosCtrl.error)
    
module.exports = router;