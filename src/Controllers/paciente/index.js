import Usuario from "../../Models/user.js";
import Paciente from "../../Models/paciente.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
//import jwt from "jsonwebtoken";

function generarIdAlfanumerico() {
    const caracteres =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const longitud = 10;
    let id = "";
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(indice);
    }
    return id;
}

export const postPaciente = async (req, res) => {
    try {
        const _id = generarIdAlfanumerico();
        const _idPaciente = generarIdAlfanumerico();
        const {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password,
            obraSocial,
        } = req.body;

        const salt = genSaltSync(2);
        const passwordHashed = hashSync(password, salt);

        const user = new Usuario({
            _id,
            idLink: _idPaciente,
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password: passwordHashed,
        });
        await user.save();
        const paciente = new Paciente({
            _id: _idPaciente,
            usuario_id: _id,
            obraSocial,
        });
        await paciente.save();
        res.status(201).send(`Paciente creado: ${paciente}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id);
        const usuario = await Usuario.findById(paciente.usuario_id);
        const pacienteCompleto = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            direccion: usuario.direccion,
            dni: usuario.dni,
            telefono: usuario.telefono,
            mail: usuario.mail,
            fechaNacimiento: usuario.fechaNacimiento.toLocaleDateString(),
            obraSocial: paciente.obraSocial,
        };
        res.status(200).send(pacienteCompleto);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id } = await Paciente.findByIdAndDelete(id);
        const { nombre, apellido } = await Usuario.findByIdAndDelete(
            usuario_id
        );
        res.status(200).send(` Borraste a ${nombre} ${apellido}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const putPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password,
            obraSocial,
        } = req.body;
        const paciente = await Paciente.findByIdAndUpdate(id, { obraSocial });
        //console.log(paciente)
        const pacienteId = paciente.usuario_id;
        const user = await Usuario.findByIdAndUpdate(pacienteId, {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password,
            obraSocial,
        });
        res.status(200).send(
            `Actualizaste a ${user.nombre} ${user.apellido}, ahora se llama ${nombre} ${apellido}`
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getPacientes = async (req, res) => {
    try {
        const pacientesConUsuarios = await Paciente.aggregate([
            {
                $lookup: {
                    from: "usuarios",
                    localField: "usuario_id",
                    foreignField: "_id",
                    as: "usuario",
                },
            },
            {
                $unwind: "$usuario",
            },
        ]);

        res.status(200).send(pacientesConUsuarios);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
