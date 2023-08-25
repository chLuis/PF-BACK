import express from "express";
import { postUser, getUsers, getUser, deleteUser, putUser } from "../../Controllers/user/index.js";
import { validationToken } from "../../Authorization/validatiton.js"

const router = express.Router();

router.post("/post", postUser);
router.get("/get/:id", getUser);
router.get("/get/", validationToken, getUsers);
router.delete("/delete/:id", validationToken, deleteUser);
router.put("/put/:id", validationToken, putUser);




export default router;