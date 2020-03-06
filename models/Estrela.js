const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Estrela = new Schema({
    nome_estrela: {
        type: String,
        required: true
    },
    idade_estrela: Number,
    distancia_terra: Number,
    gravidade_estrela: Float,
    tipo_estrela: {
        type: String,
        default: ""
    }
});

mongoose.model("estrelas", Estrela);