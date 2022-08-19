import express from 'express';

const app = express();
app.use(express.json())

const clientes = [
    {id: 1,nome: "Bruno",cpf: "123.456.789-89"},
    {id: 2,nome: "Paulo",cpf: "123.456.789-88"}
]
//rota principal
app.get('/',(req,res)=>{ 
    res.status(200).send("Pagina Inicial")
})

//consultar todos os clientes
app.get('/clientes',(req,res)=>{
    res.status(200).json(clientes)

})
//cadastrar novo cliente
app.post('/clientes',(req,res)=>{
    clientes.push(req.body)
    res.status(200).send("Cliente cadastrado com sucesso!")

})
//função que realiza a busca por id
function buscarCliente(id){
    return clientes.findIndex(clientes => clientes.id == id)
}

//Consultar cliente por id
app.get('/clientes/:id', (req,res)=>{
    let index = buscarCliente(req.params.id)
    res.json(clientes[index])
})
app.put('/clientes/:id',(req,res)=>{ 
    let index = buscarCliente(req.params.id)
    clientes[index]= req.body
    res.json(clientes)

})
//excluir cliente por id
app.delete('/clientes/:id',(req,res) =>{
    let index = buscarCliente(req.params.id)
    clientes.splice(index,1)
    res.send("Cliente excluido com sucesso!")
})
export default app