import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
    _id: {type: String, default: "my_custom_id", auto: false},
    usuario_id: {type: String, required: [true, "Id es requerido"]},
    matricula: {type: Number, required: [true, "Matricula es requerido"]},
    especialidad: {type: String, required: [true, "Especialidad es requerido"]},
    aprobado: {type: Boolean, default: false},
})

export default model ("Doctor", doctorSchema)