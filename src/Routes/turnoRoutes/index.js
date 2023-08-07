import express from "express";
import { postTurno, getTurnos, deleteTurno } from "../../Controllers/turno/index.js";

const router = express.Router();

router.post("/post", postTurno);
router.get("/get/", getTurnos);
router.delete("/delete/:id", deleteTurno);
//router.put("/put/:id", putPaciente);

export default router;