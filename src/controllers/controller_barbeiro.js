import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function barbeiroCreate (req, res) {
    const { nome } = req.body;
    try{
        const barbeiro = await prisma.barbeiro.create({
            data: {
                nome
            }
        })

        res.status(200).json({barbeiro, error: false})
    } catch (err){
        console.log(err)
        res.status(500).json({mensagem: "Erro ao cadastrar barbeiro", error: true})
    }
}