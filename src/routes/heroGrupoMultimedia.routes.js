// routes/heroGrupoMultimedia.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/heroGrupoMultimedia.controller');
const auth = require('../middleware/auth'); // Asegúrate de tener tu middleware

router.post('/', auth, controller.addHeroToGrupo);
router.get('/grupo/:idGrupo', auth, controller.getHeroesByGrupo);
router.delete('/:id', auth, controller.removeHeroFromGrupo);

module.exports = router;