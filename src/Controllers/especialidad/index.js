//postEspecialidad, getEspecialidades, deleteEspecialidad, putEspecialidad
import Especialidad from "../../Models/especialidad.js"

export const postEspecialidad = async (req, res) => {
    try {
        const especialidad = new Especialidad(req.body);
        const especialidadGuardada = await especialidad.save();
        res.status(200).send(especialidadGuardada);
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.find().sort({ especialidad: 1 });
        res.status(200).send(especialidades);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const putEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(especialidad);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const patchEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(especialidad);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.findByIdAndDelete(req.params.id);
        res.status(200).send(`Especialidad eliminada: ${especialidad}`);
    } catch (error) {
        res.status(500).send(error);
    }
}