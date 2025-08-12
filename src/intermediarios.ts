import type { NextFunction, Request, Response } from "express";
import prisma from "./conexao.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const cadastrar = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha } = req.body
    
        if (!nome || !email || !senha) {
            return res.status(400).json({mensagem: "Todos os campos devem ser informados para o cadastro."})
        }
    
        const emailUnico = await prisma.usuario.findUnique({ where: {email} })
    
        if (emailUnico) {
            return res.status(400).json({mensagem: "Esse email ja tem um cadastro."})
        }
    
        const hash = await bcrypt.hash(senha, 10)
    
        const registro = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: hash   
        },
        select: {
            nome: true,
            email: true,
        }
        }
    
    )
    
        return res.status(201).json({mensagem: "Registrado com sucesso!", registro})
        
    } catch (error) {
        res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({mensagem: "Todos os campos devem ser informados para efetuar o login."})
        }

        const validarEmail = await prisma.usuario.findUnique({ where: {email}})

        if (!validarEmail) {
            return res.status(400).json({mensagem: "Esse email nao esta cadastrado."})
        }

        const compararSenha = await bcrypt.compare(senha, validarEmail.senha)

        if (!compararSenha) {
            return res.status(400).json({mensagem: "Senha incorreta."})
        }

        const payload = {
            email,
            senha
        }

        const secretKey = process.env.JWT_SECRETKEY

        if (!secretKey) {
            throw new Error('JWT_SECRETKEY não está definida no .env');
          }

        const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})

        res.status(200).json({mensagem: "Login efetuado com sucesso!", token})
    } catch (error) {
        res.status(500).json({mensagem: "Erro interno do servidor."})
    }    

}

export const autenticar = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ mensagem: 'Sem autorizacao.' });
          }

          const [, token] = authorization.split(' ')

          if (!token) {
            return res.status(401).json({ mensagem: 'Efetue login valido.' });
          }

          const secretKey = process.env.JWT_SECRETKEY

            if (!secretKey) {
                throw new Error('JWT_SECRETKEY não está definida no .env');
            }

          const tokenDecodificado = jwt.verify(token, secretKey);

        req.user = tokenDecodificado

        console.log('passou pelo autenticador');
        
        
          next()
    } catch (error) {
        res.status(500).json({mensagem: "Erro interno do servidor."})        
    }

}