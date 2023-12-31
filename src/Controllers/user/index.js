import Usuario from "../../Models/user.js";
import Doctor from "../../Models/doctor.js";
import Paciente from "../../Models/paciente.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt"; 
import jwt from "jsonwebtoken";

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
function primeraMayusRestoMinus(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
                        const token = jwt.sign(
            { dni, password },
            process.env.TOKEN_SECRET,
            { expiresIn: '15m' }
        );
                const {_id, idLink, nombre, apellido, dni:dni_user , direccion, telefono, mail, fechaNacimiento, medico, administrador} = usuario
                usuarioLog = {
                    _id,
                    idLink,
                    nombre,
                    apellido,
                    dni: dni_user,
                    direccion,
                    telefono,
                    mail,
                    fechaNacimiento,
                    medico,
                    administrador,
                    token: token
                }
            }
        }})
    res.status(200).send(usuarioLog)
    }

export const getUsers = async (req, res) => {    
        try {
            const users = await Usuario.find().sort({apellido: 1});
            const userList = await Promise.all(users?.map(async user => { 
                return {
                    id_user: user._id,
                    nombre: primeraMayusRestoMinus(user.nombre),
                    apellido: primeraMayusRestoMinus(user.apellido),
                    dni: user.dni,
                    direccion: user.direccion,
                    telefono: user.telefono,
                    mail: user.mail,
                    fechaNacimiento: user.fechaNacimiento.toLocaleDateString(),
                    medico: user.medico?"MEDICO":"PACIENTE",
                    administrador: user.administrador?"Administrador":"No es administrador",
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

