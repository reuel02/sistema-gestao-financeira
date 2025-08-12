import { Router } from "express";
import { autenticar, cadastrar, login } from "./intermediarios.js";
import { atualizarTransacao, efetuarTransacao, excluirTransacao, gerarRelatorioAnual, gerarRelatorioMensal, listarTransacao, listarTransacaoId } from "./controladores.js";

const rotas = Router()

rotas.post('/cadastrar', cadastrar)
rotas.post('/login', login)

rotas.use(autenticar)

rotas.post('/transacoes/efetuar', efetuarTransacao)
rotas.get('/transacoes/listar', listarTransacao)
rotas.get('/transacoes/listar/:id', listarTransacaoId)
rotas.put('/transacoes/atualizar/:id', atualizarTransacao)
rotas.delete('/transacoes/excluir/:id', excluirTransacao)
rotas.get('/transacoes/relatorio/:ano', gerarRelatorioAnual)
rotas.get('/transacoes/relatorio/:mes/:ano', gerarRelatorioMensal)

export default rotas

