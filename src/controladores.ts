import { Request, Response } from "express";
import prisma from "./conexao.js";


export const efetuarTransacao = async (req: Request, res: Response) => {

    try {
        const { tipo, quantia, descricao, categoria } = req.body
        const emailUsuario = req.user.email
    
        const usuario = await prisma.usuario.findUnique({ where: {email: emailUsuario}})

        if (!usuario) {
            return res.status(401).json({ mensagem: "Erro na autenticação, efetue o login novamente." });
        }

        const usuarioId = usuario.id

        if (!tipo || !quantia || !categoria) {
            return res.status(400).json({mensagem: 'Você deve informar tipo, quantia e categoria para efetuar uma transação.'})
        }
    
        const transacao = await prisma.transacoes.create({data: {
            tipo,
            quantia: Number(quantia),
            descricao: !descricao ? " " : descricao,
            categoria,
            usuario: {connect: { id: usuarioId }}
        },
        select: {
            tipo: true,
            quantia: true,
            descricao: true,
            categoria: true,
        }
    })
    
        return res.status(201).json({mensagem: 'Transação efetuada com sucesso.', transacao})
        
    } catch (error) {
        res.status(500).json({mensagem: "Erro interno do servidor."})
        
    }
}
export const listarTransacao = async (req: Request, res: Response) => {
        try {
            const emailUsuario = req.user.email
    
            const usuario = await prisma.usuario.findUnique({ where: {email: emailUsuario}})

            if (!usuario) {
                return res.status(401).json({ mensagem: "Erro na autenticação, efetue o login novamente." });
            }

            const transacoes = await prisma.transacoes.findMany({where: {usuarioId: usuario.id}})

            if (transacoes.length === 0) {
                return res.status(404).json({mensagem: "Nenhuma transação encontrada."})
            }

            return res.json({mensagem: "Seu histórico de transações abaixo:", transacoes})
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor."})
        }
}

export const listarTransacaoId = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id)
            const emailUsuario = req.user.email

            if (isNaN(id)) {
                return res.status(400).json({ mensagem: "Identificador inválido." });
            }

    
            const usuario = await prisma.usuario.findUnique({ where: {email: emailUsuario}})

            if (!usuario) {
                return res.status(401).json({ mensagem: "Erro na autenticação, efetue o login novamente." });
            }

            const usuarioId = usuario.id

            const transacao = await prisma.transacoes.findFirst({where: {id, usuarioId}})

            if (!transacao) {
                return res.status(404).json({mensagem: "A transação com o identificador informado não foi encontrada."})
            }

            return res.json({mensagem: "Detalhes da transação:", transacao})
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor."})
        }
}

export const atualizarTransacao = async (req: Request, res: Response) => {
        try {
            const { descricao, categoria } = req.body
            const id = Number(req.params.id)
            const emailUsuario = req.user.email

            if (!descricao && !categoria) {
                return res.status(400).json({mensagem: "A informação que deseja atualizar deve ser informada."})
            }

            if (isNaN(id)) {
                return res.status(400).json({ mensagem: "Identificador inválido." });
            }

    
            const usuario = await prisma.usuario.findUnique({ where: {email: emailUsuario}})

            if (!usuario) {
                return res.status(401).json({ mensagem: "Erro na autenticação, efetue o login novamente." });
            }

            const usuarioId = usuario.id

            const transacaoAtualizada = await prisma.transacoes.updateMany({ where: {id, usuarioId, }, data: {descricao, categoria}})

            res.status(200).json({mensagem: "Transação atualizada."})
        
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor."})
        }
}   

export const excluirTransacao = async (req: Request, res: Response) => {
    
}

