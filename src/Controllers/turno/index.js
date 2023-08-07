import Turno from "../../Models/turno.js";
import Usuario from "../../Models/user.js";


function generarIdAlfanumerico() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const longitud = 10;
    let id = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(indice);
    }
    return id;
}

export const postTurno = async (req, res) => {
    try {
        const _id = generarIdAlfanumerico();
        const usuario = await Usuario.find()
        const { dniPaciente, especialidad, dniDoctor, fecha, horario, motivo} = req.body
        let doctor_id, doctorNombre, paciente_id, pacienteNombre

        usuario.forEach(paciente => {
            if(paciente.dni == dniPaciente){
                paciente_id = paciente._id
                pacienteNombre = `${paciente.nombre} ${paciente.apellido}`
            }
        });
        usuario.forEach(doctor => {
            if(doctor.dni == dniDoctor){
                doctor_id = doctor._id
                doctorNombre = `${doctor.nombre} ${doctor.apellido}`
            }
        });
        const turno = new Turno({
            _id,
            especialidad,
            doctor_id,
            doctorNombre,
            paciente_id,
            pacienteNombre,
            fecha,
            horario,
            motivo
        });
        await turno.save()
        res.status(201).send(`Turno creado: ${turno}`)
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
}

export const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find()
        res.status(200).send(turnos)
    } catch (error) {
        res.status(400).send(error)
    }
}   

export const deleteTurno = async (req, res) => {
    try {
        const { id } = req.params
        const turno = await Turno.findByIdAndDelete(id)
        res.status(200).send(`Turno eliminado: ${turno}`)
    } catch (error) {
        res.status(400).send(error)
    }
}