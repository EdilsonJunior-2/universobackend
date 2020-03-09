const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaPlanetario = new Schema({
    nome_sistema: {
        type: String,
        required: true
    },
    idade_sistema: Number,
    qtd_planetas: sizeOf([{
        type: Schema.Types.ObjectId,
        ref: 'planetas'
    }])
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);