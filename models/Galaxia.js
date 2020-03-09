const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Galaxia = new Schema({
    nome_galaxia: {
        type: String,
        required: true
    },
    sistemas: [{
        type: Schema.Types.ObjectId,
        ref: 'sistemasPlanetarios'
    }],
    qtd_sistemas: {
        type: Number,
        required: true
    },
    dist_terra: Number
})


Galaxia.pre("save" , function(next){
    this.qtd_sistemas = this.sistemas.length;
    next();
})

mongoose.model('galaxias', Galaxia);