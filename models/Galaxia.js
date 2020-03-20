const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Galaxia = new Schema({
    nome: {
        type: String,
        required: true
    },
    id_sistemas: [{
        type:String,
        require: true
    }],
    qtd_sistemas: {
        type: Number
    },
    dist_terra: Number
})


Galaxia.pre("save" , function(next){
    this.qtd_sistemas = this.id_sistemas.length;
    next();
})

mongoose.model('galaxias', Galaxia);