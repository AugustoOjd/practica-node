const { Schema, model} = require('mongoose')

const ProductoSchema = new Schema({
    name:       { type: String, required: true, unique: true},
    state:      { type: String, required: true, default: true},
    price:      { type: Number, default: 0 },
    description:{ type: String},
    stock:      { type: Boolean, default: true},
    category:   { type: Schema.Types.ObjectId, ref: 'Categoria', required: true},
    user:       { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
})


ProductoSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject()
    return data
}

module.exports = model( 'Producto', ProductoSchema)