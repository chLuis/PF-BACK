import express from "express";
import { postDoctor, getDoctor, getDoctors, deleteDoctor, putDoctor } from "../../Controllers/doctor/index.js";

const router = express.Router();

router.post("/post", postDoctor);
router.get("/get/:id", getDoctor);
router.get("/get/", getDoctors);
router.delete("/delete/:id", deleteDoctor);
router.put("/put/:id", putDoctor);

export default router;