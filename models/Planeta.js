const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Planeta = new Schema({
    nome_planeta: {
        type: String,
        required: true
    },
    tam_planeta: {
        type: Number,
        required: true,
    },
    massa_planeta: {
        type: Number,
        required: true,
    },
    gravidade_planeta: {
        type: Float,
        required: true,
    },
    comp_planeta: {
        type: String,
        required: true,
    }
});

mongoose.model("planetas", Planeta);