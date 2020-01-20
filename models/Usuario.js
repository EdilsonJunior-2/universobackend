const mongoose = require('mongoose');
require('mongoose-type-email')
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type:String,
        required: true,
        index: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        index: true
    },
    senha: {
        type: String,
        required: true
    }
})