const { Schema, model} = require('mongoose')


const CategoriaSchema = new Schema({

    name: {type: String, required: true},
    state: {type: Boolean, default: true, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }

})


module.exports = model( 'Categoria', CategoriaSchema)