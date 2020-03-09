const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaPlanetario = new Schema({
    nome_sistema: {
        type: String,
        required: true
    },
    idade_sistema: Number,
    planetas: [{
        type: Schema.Types.ObjectId,
        ref: 'planetas'
    }],
    qtd_planetas: {
        type: Number,
        default: this.planetas.length
    }
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);