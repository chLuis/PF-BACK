import Usuario from "../../Models/user.js";
import Doctor from "../../Models/doctor.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

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

export const postDoctor = async (req, res) => {
    try {
        const medico = true;
        const _id = generarIdAlfanumerico();
        const _idDoctor = generarIdAlfanumerico();
        const {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password,
            matricula,
            especialidad,
            aprobado,
        } = req.body;

        const salt = genSaltSync(2);
        const passwordHashed = hashSync(password, salt);

        const user = new Usuario({
            _id,
            idLink: _idDoctor,
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password: passwordHashed,
            medico,
        });
        await user.save();
        const doctor = new Doctor({
            _id: _idDoctor,
            usuario_id: _id,
            matricula,
            especialidad,
            aprobado,
        });
        await doctor.save();

        res.status(201).send(`Doctor creado: ${doctor}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { dni, password } = req.body;
        const doctor = await Doctor.findById(id);
        const usuario = await Usuario.findById(doctor.usuario_id);
        const doctorCompleto = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            direccion: usuario.direccion,
            dni: usuario.dni,
            telefono: usuario.telefono,
            mail: usuario.mail,
            fechaNacimiento: usuario.fechaNacimiento.toLocaleDateString(),
            matricula: doctor.matricula,
            especialidad: doctor.especialidad,
            aprobado: doctor.aprobado,
        };
        res.status(200).send(doctorCompleto);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
//Aqui debo sacar el idUSER  // Debo ponerlo cuando estoy log como admin
export const getDoctors = async (req, res) => {
    try {
        const doctores = await Doctor.find();
        const doctoresList = await Promise.all(
            doctores?.map(async (doctor) => {
                const id_user = doctor._id;
                const {
                    //_id,
                    nombre,
                    apellido,
                    dni,
                    //direccion,
                    //telefono,
                    //mail,
                    //fechaNacimiento,
                    //password,
                } = await Usuario.findById(doctor.usuario_id);
                return {
                    //id_user: id_user,
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    matricula: doctor.matricula,
                    especialidad: doctor.especialidad,
                    aprobado: doctor.aprobado,
                    //direccion: direccion,
                    //usuario_id: doctor.usuario_id,
                    //telefono: telefono,
                    //mail: mail,
                    //fechaNacimiento: fechaNacimiento.toLocaleDateString(),
                };
            })
        );
        res.status(200).send(doctoresList);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
export const getDoctorsAdmin = async (req, res) => {
    try {
        const doctores = await Doctor.find();
        const doctoresList = await Promise.all(
            doctores?.map(async (doctor) => {
                const id_user = doctor._id;
                const {
                    _id,
                    nombre,
                    apellido,
                    dni,
                    direccion,
                    telefono,
                    mail,
                    fechaNacimiento,
                } = await Usuario.findById(doctor.usuario_id);
                return {
                    id_user: id_user,
                    nombre: nombre,
                    apellido: apellido,
                    direccion: direccion,
                    usuario_id: doctor.usuario_id,
                    dni: dni,
                    telefono: telefono,
                    mail: mail,
                    fechaNacimiento: fechaNacimiento.toLocaleDateString(),
                    matricula: doctor.matricula,
                    especialidad: doctor.especialidad,
                    aprobado: doctor.aprobado,
                };
            })
        );
        res.status(200).send(doctoresList);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, especialidad } = await Doctor.findByIdAndDelete(id);
        const { nombre, apellido } = await Usuario.findByIdAndDelete(
            usuario_id
        );
        res.status(200).send(
            `Eliminaste a ${nombre} ${apellido} ${especialidad} de la base de datos`
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const putDoctor = async (req, res) => {
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
            matricula,
            especialidad,
            aprobado,
        } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(id, {
            matricula,
            especialidad,
            aprobado,
        });
        const id_userDoc = doctor.usuario_id;
        const usuario = await Usuario.findByIdAndUpdate(id_userDoc, {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            mail,
            fechaNacimiento,
            password,
        });
        res.status(200).send(
            `Actualizaste a ${nombre} ${apellido} de la base de datos`
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
};
