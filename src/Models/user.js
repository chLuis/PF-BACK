import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    _id: {type: String, default: "my_custom_id", auto: false},
    idLink: {type: String, default: "my_custom_idLinked", auto: false},
    nombre: {type: String, required: [true, "Nombre es requerido"]},
    apellido: {type: String, required: [true, "Edad es requerido"]},
    dni: {type: Number, required: [true, "DNI es requerido"]},
    direccion: {type: String, required: [true, "Dirección es requerida"]},
    telefono: {type: Number, required: [true, "Teléfono es requerido"]},
    mail: {type: String, required: [true, "Mail es requerido"]},
    fechaNacimiento: {type: Date, required: [true, "Fecha de nacimiento es requerida"]},
    password: {type: String, required: [true, "Contraseña es requerida"]},
    token: {type: String, default: ""},
    medico: {type: Boolean, default: false},
    administrador: {type: Boolean, default: false},
})

export default model ("Usuario", usuarioSchema)
