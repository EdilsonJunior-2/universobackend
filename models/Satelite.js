const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const Satelite = new Schema({
    nome_SN:{
        type: String,
        required: true
    },
    tam_SN:{
        type: Float,
        required: false
    },
    massa_SN:{
        type: Number,
        required: false
    },
    comp_SN:{
        type: String,
        required: false
    },
    planeta:{
        type: Schema.Types.ObjectId,
        ref: "planetas",
        required: true
    }
});

mongoose.model("satelites", Satelite);