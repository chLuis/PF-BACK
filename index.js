import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/Database/config.js";
import routerUser from "./src/Routes/userRoutes/index.js"
import routerDoctor from "./src/Routes/doctorRoutes/index.js"
import routerPaciente from "./src/Routes/pacienteRoutes/index.js"
import routerTurno from "./src/Routes/turnoRoutes/index.js"
import routerEspecialidad from "./src/Routes/especialidadRoutes/index.js"
import cors from "cors";


const app = express();
// app.use(cors({
//     origin: '*', // Specify the origin here
//     methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
//     allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
//     credentials: true
// }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();})


app.use(express.json())
dotenv.config();

app.use('/user', routerUser)
app.use('/doctor', routerDoctor)
app.use('/paciente', routerPaciente)
app.use('/turno', routerTurno)
app.use('/especialidad', routerEspecialidad)

dbConnect();
app.listen(8080)