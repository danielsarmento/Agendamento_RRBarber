import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function clientesCreate (req, res) {
    const { nome, email, telefone } = req.body;
    try{
        const cliente = await prisma.cliente.create({
            data: {
                nome, telefone
            }
        })

        res.status(200).json({cliente, error: false})
    } catch (err){
        console.log(err)
        res.status(500).json({mensagem: "Erro ao cadastrar cliente", error: true})
    }
}