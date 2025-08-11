import { Router } from "express";
import { autenticar, cadastrar, login } from "./intermediarios.js";
import { efetuarTransacao } from "./controladores.js";

const rotas = Router()

rotas.post('/cadastrar', cadastrar)
rotas.post('/login', login)

rotas.use(autenticar)

rotas.post('/transacoes', efetuarTransacao)

export default rotas