const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Planeta = new Schema({
    nome_planeta: {
        type: String,
        required: true
    },
    tam_planeta: Number,
    massa_planeta: Number,
    gravidade_planeta: Float,
    comp_planeta: String,
    curiosidade_planeta: String,
    img_planeta: String
});

mongoose.model("planetas", Planeta);