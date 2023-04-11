import express from 'express'
const routes = express.Router()

import controller_clientes from "../controllers/controller_clientes.js"
import controller_barbeiro from "../controllers/controller_barbeiro.js"
import {agendamentoCreate, agendamentoHorarios} from "../controllers/controller_agendamento.js"
import controller_pipefy from "../controllers/controller_pipefy.js"

routes.get("/", (req, res) => {res.json({mensagem: "API de Agendamento"})});
routes.post("/cadastrar/cliente", controller_clientes);
routes.post("/cadastrar/barbeiro", controller_barbeiro);
routes.post("/cadastrar/agendamento", agendamentoCreate);
routes.post("/buscar/horarios", agendamentoHorarios);
routes.post("/criar/pipefy", controller_pipefy);

export default routes;