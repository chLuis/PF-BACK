import { Schema, model } from "mongoose";

const pacienteSchema = new Schema({
    _id: {type: String, default: "my_custom_id", auto: false},
    usuario_id: {type: String, required: [true, "Id es requerido"]},
    obraSocial: {type: String, required: [true, "Obra Social es requerido"]},

})

export default model ("Paciente", pacienteSchema)