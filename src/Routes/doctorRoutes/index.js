import express from "express";
import { postDoctor, getDoctor, getDoctors, getDoctorsAdmin, deleteDoctor, putDoctor } from "../../Controllers/doctor/index.js";
import { validationToken } from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post", postDoctor);
router.get("/get/:id", validationToken, getDoctor);
router.get("/get/", getDoctors);
router.get("/admin/get/", validationToken, getDoctorsAdmin);
router.delete("/delete/:id", validationToken, deleteDoctor);
router.put("/put/:id", validationToken, putDoctor);

export default router;