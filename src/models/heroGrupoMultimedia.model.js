// models/heroGrupoMultimedia.model.js
const mongoose = require('mongoose');

const heroGrupoMultimediaSchema = new mongoose.Schema({
  idHeroe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Heroes',
    required: true
  },
  idGrupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GrupoMultimedias',
    required: true
  }
});

module.exports = mongoose.model('HeroGrupoMultimedia', heroGrupoMultimediaSchema);