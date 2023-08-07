import Usuario from "../../Models/user.js";
import Doctor from "../../Models/doctor.js";
import Paciente from "../../Models/paciente.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt"; 

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


export const postUser = async (req, res) => {
    try {
        const _id = generarIdAlfanumerico()
        const { nombre, apellido, dni, direccion, telefono, mail, fechaNacimiento, password} = req.body
        const user = new Usuario({_id, nombre, apellido, dni, direccion, telefono, mail, fechaNacimiento, password})
        await user.save()
        res.status(201).send('Usuario creado')
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

export const getUser = async (req, res) => {
    const parametros = req.query
    const {dni, password} = parametros
    const user = await Usuario.find()
    let usuarioLog = null
    user.forEach(usuario => {
        if (usuario.dni === Number(dni)){
            const passValidation = compareSync(password, usuario.password) // Comparamos el passhash con el pass ingresada devuelve true o false
            if(passValidation){
                usuarioLog = usuario
            }
        }})
    res.status(200).send(usuarioLog)
    }

export const getUsers = async (req, res) => {    
        try {
            const users = await Usuario.find();
            const userList = await Promise.all(users.map(async user => { 
                return {
                    id_user: user._id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    dni: user.dni,
                    direccion: user.direccion,
                    //usuario_id: doctor.usuario_id,
                    telefono: user.telefono,
                    mail: user.mail,
                    fechaNacimiento: user.fechaNacimiento.toLocaleDateString(),
                    medico: user.medico?"Medico":"Paciente",
                    administrador: user.administrador?"Administrador":"No es administrador",
                    //matricula: doctor.matricula,
                    //especialidad: doctor.especialidad,
                    //aprobado: doctor.aprobado
                };
            }));
            res.status(200).send(userList);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params
        const {nombre, apellido, idLink} = await Usuario.findByIdAndDelete(id)
        console.log(id)
        console.log(idLink)
        await Doctor.findByIdAndDelete(idLink) || await Paciente.findByIdAndDelete(idLink)
        res.status(200).send(` Borraste a ${nombre} ${apellido}`)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

export const putUser = async (req, res) => {
    try {
        const {id} = req.params
        const {nombre, apellido, dni, direccion, telefono, mail, fechaNacimiento, password} = req.body
        const user = await Usuario.findByIdAndUpdate(id, {nombre, apellido, dni, direccion, telefono, mail, fechaNacimiento, password})
        res.status(200).send(`Actualizaste a ${user.nombre} ${user.apellido}, ahora se llama ${nombre} ${apellido}`)
    }
    catch (error) {
        res.status(400).send(error.message)
    }

}