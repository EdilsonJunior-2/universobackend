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
    possui_SN: {
        type: Boolean,
        default: false
    },
    id_satelites: [ String ],
});

Planeta.pre("save" , function(next){
    if(this.id_satelites.length > 0)
        possui_SN = true
    next();
})

mongoose.model("planetas", Planeta);