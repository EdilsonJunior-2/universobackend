const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaPlanetario = new Schema({
    nome_sistema: {
        type: String,
        required: true
    },
    idade_sistema: Number,
    qtd_planetas: [{
        type: Schema.Types.ObjectId,
        ref: 'planetas'
    }].length
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);