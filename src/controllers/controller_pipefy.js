function getFormattedDate() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hora = (date.getHours()-3).toString().padStart(2, '0')
    let min = date.getMinutes().toString().padStart(2, '0')
    let seg = date.getSeconds().toString().padStart(2, '0')
    
    return `${day}/${month}/${year}`;
}

export default async function createCard (req, res) {
    const {phaseId, barbeiro, nomeCliente, horario, telefone, servico} = req.body
    const pipeId = "303156913";
    
    try{
        const novoCard = await fetch('https://api.pipefy.com/graphql',{
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': "Bearer "
                        },
                        body: JSON.stringify({
                              "query": `mutation{ createCard (input: {pipe_id:${pipeId}  phase_id:${phaseId}  fields_attributes: [
                                  {field_id: "barbeiro", field_value: "${barbeiro}"},
                                  {field_id: "your_name", field_value: "${horario} hrs - ${getFormattedDate()} | ${nomeCliente}"},
                                  {field_id: "telefone", field_value: "${telefone}"},
                                  {field_id: "servi_o", field_value: "${servico}"}
                                ]
                                  }) 
                                  { card {id title }}}`
                        })
        });
        
        const data = await novoCard.json();
        return res.status(200).json(data)

    } catch (err){
        console.log(err)
        res.status(500).end()
    }
}