import { Schema, model } from "mongoose";

const especialidadSchema = new Schema({
    especialidad: {type: String, required: [true, "Especialidad es requerido"]},
    image: {type: String, required: [true, "Imagen es requerida"]},
})

export default model ("Especialidad", especialidadSchema)