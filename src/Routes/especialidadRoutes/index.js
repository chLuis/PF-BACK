import express from "express";
import { postEspecialidad, getEspecialidades, deleteEspecialidad, putEspecialidad, patchEspecialidad } from "../../Controllers/especialidad/index.js";
import { validationToken } from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post",validationToken, postEspecialidad);
//router.get("/get/:id", getDoctor);
router.get("/get/", getEspecialidades);
router.delete("/delete/:id",validationToken, deleteEspecialidad);
router.put("/put/:id",validationToken, putEspecialidad);
router.patch("/patch/:id",validationToken, patchEspecialidad);

export default router;