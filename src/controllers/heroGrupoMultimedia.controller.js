// controllers/heroGrupoMultimedia.controller.js
const HeroGrupoMultimedia = require('../models/heroGrupoMultimedia.model');

// POST: Añadir héroe a grupo
exports.addHeroToGrupo = async (req, res) => {
  try {
    const { idHeroe, idGrupo } = req.body;
    const relation = new HeroGrupoMultimedia({ idHeroe, idGrupo });
    await relation.save();
    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir héroe al grupo', error });
  }
};

// GET: Obtener héroes por grupo
exports.getHeroesByGrupo = async (req, res) => {
  try {
    const { idGrupo } = req.params;
    const relaciones = await HeroGrupoMultimedia.find({ idGrupo }).populate('idHeroe');
    const heroes = relaciones.map(rel => rel.idHeroe);
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener héroes del grupo', error });
  }
};

// DELETE: Eliminar relación héroe-grupo
exports.removeHeroFromGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    await HeroGrupoMultimedia.findByIdAndDelete(id);
    res.json({ message: 'Relación eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar relación', error });
  }
};