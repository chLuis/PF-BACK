import express from "express";
import { postUser, getUsers, getUser, deleteUser, putUser } from "../../Controllers/user/index.js";

const router = express.Router();

router.post("/post", postUser);
router.get("/get/:id", getUser);
router.get("/get/", getUsers);
router.delete("/delete/:id", deleteUser);
router.put("/put/:id", putUser);




export default router;