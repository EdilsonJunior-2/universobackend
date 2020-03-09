const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Galaxia = new Schema({
    nome_galaxia: {
        type: String,
        required: true
    },
    qtd_sistemas: sizeOf([{
        type: Schema.Types.ObjectId,
        type: 'sistemasPlanetarios',
        required: true
    }]),
    dist_terra: Number
})

mongoose.model('galaxias', Galaxia);