const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const SistemaPlanetario = new Schema({
    nome_sistema: {
        type: String,
        required: true
    },
    idade_sistema: Number,
    planetas: [{
        type: Schema.Types.ObjectId,
        ref: 'planetas._id'
    }]
})

mongoose.model("sistemasPlanetarios", SistemaPlanetario);