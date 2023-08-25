import express from "express";
import { postTurno, getTurnos, deleteTurno } from "../../Controllers/turno/index.js";
import { validationToken } from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post", postTurno);
router.get("/get/", validationToken, getTurnos);
router.delete("/delete/:id", validationToken, deleteTurno);
//router.put("/put/:id", putPaciente);

export default router;