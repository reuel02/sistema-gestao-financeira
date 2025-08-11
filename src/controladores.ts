import { Request, Response } from "express";
import prisma from "./conexao.js";


export const efetuarTransacao = async (req: Request, res: Response) => {
    const { tipo, quantia, descricao, categoria } = req.body
    const usuarioId = req.user.id

    if (!tipo || !quantia || categoria) {
        return res.status(400).json({mensagem: 'Você deve informar tipo, quantia e categoria para efetuar uma transação.'})
    }

    const transacao = await prisma.transacoes.create({data: {
        tipo,
        quantia,
        descricao,
        categoria,
        usuarioId
    },
    select: {
        tipo: true,
        quantia: true,
        descricao: true,
        categoria: true,
    }
})

    return res.status(201).json({mensagem: 'Transação efetuada com sucesso.', transacao})
}