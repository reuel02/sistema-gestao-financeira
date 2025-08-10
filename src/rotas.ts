import { Router } from "express";
import { autenticar, cadastrar, login } from "./intermediarios.js";

const rotas = Router()

rotas.post('/cadastrar', cadastrar)
rotas.post('/login', login)

rotas.use(autenticar)

export default rotas