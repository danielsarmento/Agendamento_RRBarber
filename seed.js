const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function client (nome, email, telefone){
    const cliente = await prisma.cliente.create({
        data: {
            nome,
            email,
            telefone
        }
    })

    console.log(cliente)
}

async function barber (nome){
    const barbeiro = await prisma.barbeiro.create({
        data: {
            nome
        }
    })

    console.log(barbeiro)
}

async function schedule (horario, dia, cabelo, barba){
    const schedule = await prisma.agendamento.create({
        data: {
            horario,
            dia,
            cabelo,
            barba,
            clienteId: "64259b42298582f72ffde125",
            barbeiroId: "64259992436c2ec0c05d7523"
        }
    })

    console.log(schedule)
}

async function search (){
    const agendamentos = await prisma.agendamento.findMany({
        include:{
            cliente:true,
            barbeiro: true
        }
    })

    console.log(agendamentos)
}

async function searchDate (){
    const agendamentos = await prisma.agendamento.findMany({
        where:{
            dia: "2023-03-31T00:00:00.000+00:00"
        },
        include:{
            cliente:true,
            barbeiro: true
        }
    })

    console.log(agendamentos)
}

//client("Daniel Sarmento", "danielsarmento2@hotmail.com", "")
//barber("Wolney Morais")
//schedule("15", "2023-03-31T00:00:00.000+00:00", true, false)
//search()
searchDate()