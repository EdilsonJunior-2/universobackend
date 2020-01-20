const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Satelite = new Schema({
    nome_SN:{
        type: String,
        required: true
    },
    tam_SN:Float,
    massa_SN: Number,
    comp_SN: {
        type: String,
        default: "indeterminado"
    }, 
    planeta:{
        type: Schema.Types.ObjectId,
        ref: "planetas",
        required: true
    }
});

mongoose.model("satelites", Satelite);