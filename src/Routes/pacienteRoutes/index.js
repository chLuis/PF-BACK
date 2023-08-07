import express from "express";
import { postPaciente, getPaciente, deletePaciente, putPaciente, getPacientes } from "../../Controllers/paciente/index.js";

const router = express.Router();

router.post("/post", postPaciente);
router.get("/get/:id", getPaciente);
router.get("/get/", getPacientes);
router.delete("/delete/:id", deletePaciente);
router.put("/put/:id", putPaciente);

export default router;