import { Schema, model } from "mongoose";

const turnoSchema = new Schema({
    _id: {type: String, default: "my_custom_id", auto: false},
    especialidad: {type: String, required: [true, "Especialidad es requerido"]},
    doctor_id: {type: String, required: [true, "Id doctor es requerido"]},
    dniDoctor: {type: Number, required: [true, "DNI doctor es requerido"]},
    doctorNombre: {type: String, required: [true, "Nombre doctor es requerido"]},
    paciente_id: {type: String, required: [true, "Id paciente requerido"]},
    pacienteNombre: {type: String, required: [true, "Nombre paciente es requerido"]},
    dniPaciente: {type: Number, required: [true, "DNI paciente es requerido"]},
    fecha: {type: Date, required: [true, "Fecha es requerido"]},
    horario: {type: String, required: [true, "Horario es requerido"]},
    motivo: {type: String, required: [true, "Motivo es requerido"]},

})

export default model ("Turno", turnoSchema)