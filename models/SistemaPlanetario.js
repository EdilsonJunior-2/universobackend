const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaPlanetario = new Schema({
    nome_sistema: {
        type: String,
        required: true
    },
    idade_sistema: Number,
    id_planetas: [ String ],
    qtd_planetas: Number,
    id_estrelas: [ String ],
    qtd_estrelas: Number
})

SistemaPlanetario.pre("save" , function(next){
    this.qtd_planetas = this.planetas.length;
    this.qtd_estrelas = this.estrelas.length;
    next();
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);