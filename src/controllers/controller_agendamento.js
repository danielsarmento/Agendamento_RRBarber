import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function agendamentoCreate (req, res) {
    const {barbeiro, telefone, horario, dia, cabelo, barba} = req.body;
    const horariosFuncionamento = ["10", "10:30", "11", "11:30", "12", "12:30", "13", "13:30", "14", "14:30", "15", "15:30", "16", "16:30", "17", "17:30", "18", "18:30"];
    const horariosOcupados = [];
    const horariosDisponiveis = [];

    try{
        const horarios = await prisma.agendamento.findMany({
            where:{
                barbeiroId: barbeiro || "64259992436c2ec0c05d7523",
                dia: dia
            }
        })
        horarios.map((obj) => {horariosOcupados.push(obj.horario)})
        horariosFuncionamento.map((hora) => { 
            if(horariosOcupados.includes(hora)){
                return
            } else {
                horariosDisponiveis.push(hora)
            }
        })
        console.log("Disponíveis", horariosDisponiveis)

        if(horariosOcupados.includes(horario)){
            return res.status(200).json({mensagem: "Horário Ocupado", erro: true})
        }
        
        const cliente = await prisma.cliente.findUnique({
            where:{
                telefone: telefone
            }
        })
        const agendamento = await prisma.agendamento.create({
            data: {
                horario,
                dia,
                cabelo,
                barba,
                clienteId: cliente.id,
                barbeiroId: barbeiro
            }
        })
        res.status(200).json({ error: false})

    } catch(err){
        console.log(err)
        res.status(500).json({mensagem: "Erro ao cadastrar agendamento", error: true})
    }
}

export async function agendamentoHorarios (req, res) {
    const {barbeiro, dia } = req.body;
    const horariosFuncionamento = ["10", "10:30", "11", "11:30", "12", "12:30", "13", "13:30", "14", "14:30", "15", "15:30", "16", "16:30", "17", "17:30", "18", "18:30"];
    const horariosOcupados = [];
    const horariosDisponiveis = [];

    const data = dia + "T00:00:00.000+00:00"
    console.log(data)
    try{
        const horarios = await prisma.agendamento.findMany({
            where:{
                barbeiroId: barbeiro,
                dia: data
            }
        })
        horarios.map((obj) => {horariosOcupados.push(obj.horario)})
        horariosFuncionamento.map((hora) => { 
            if(horariosOcupados.includes(hora)){
                return
            } else {
                horariosDisponiveis.push(hora)
            }
        })

        res.status(200).json({ horariosDisponiveis, error: false})

    } catch(err){
        console.log(err)
        res.status(500).json({mensagem: "Erro ao buscar horários", error: true})
    }
}
