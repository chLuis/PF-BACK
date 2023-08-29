import express from "express";
import { postPaciente, getPaciente, deletePaciente, putPaciente, getPacientes } from "../../Controllers/paciente/index.js";
import { validationToken } from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post", postPaciente);
router.get("/get/:id", getPaciente);
router.get("/get/", getPacientes);
router.delete("/delete/:id", validationToken, deletePaciente);
router.put("/put/:id", validationToken, putPaciente);

export default router;