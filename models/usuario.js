

const { Schema, model} = require('mongoose')


const UsuarioScheme = new Schema({
    name:       { type: String, required: true, unique: true},
    email:      { type: String, required: true, unique: true},
    password:   { type: String, required: true},
    image:      { type: String},
    role:        { type: String, required: true, enum: ['admin', 'client']},
    state:      { type: Boolean, default: true},
    google:     { type: Boolean, default: false}
})

UsuarioScheme.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}


module.exports = model( 'Usuario', UsuarioScheme )