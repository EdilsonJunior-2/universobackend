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
    qtd_planetas: Number
})

SistemaPlanetario.pre("save" , function(next){
    this.qtd_planetas = this.planetas.length;
    next();
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);