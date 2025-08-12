import { Request, Response } from "express";
import prisma from "./conexao.js";


export const efetuarTransacao = async (req: Request, res: Response) => {

    try {
        const { tipo, quantia, descricao, categoria } = req.body
        const emailUsuario = req.user.email
    
        const usuario = await prisma.usuario.findUnique({ where: {email: emailUsuario}})

        if (!usuario) {
            return res.status(404).json({ mensagem: "Erro na autenticação, efetue o login novamente." });
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
        console.log(error);
        
    }
}
export const listarTransacao = async (req: Request, res: Response) => {

}