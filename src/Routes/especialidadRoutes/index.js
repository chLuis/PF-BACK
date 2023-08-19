import express from "express";
import { postEspecialidad, getEspecialidades, deleteEspecialidad, putEspecialidad, patchEspecialidad } from "../../Controllers/especialidad/index.js";
//import {validationToken} from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post", postEspecialidad);
//router.get("/get/:id", getDoctor);
router.get("/get/", getEspecialidades);
router.delete("/delete/:id", deleteEspecialidad);
router.put("/put/:id", putEspecialidad);
router.patch("/patch/:id", patchEspecialidad);

export default router;