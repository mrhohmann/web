


const db = require('./db')
const express = require('express')
const bodyParser = require('body-parser')

// cria um servidor
const server = express()

server. use(express.json())
server.use(bodyParser.urlencoded({extended:true}))

// autorizações: req = requisição recebida , res = resposta enviada
server.use((req, res, next) => {
    // configura a forma da resposta para o navegador
    res.setHeader ('Access-Control-Allow-Origin', '*')
    res.setHeader ('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
    res.setHeader ('Access-Control-Allow-Methods', 'Content-Type', 'Authorization')
    res.setHeader ('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    next()
})


// lista todos os produtos
// GET http://localhost:3000/produtos
server.get('/produtos', async(req, res)=> {

    // lista todos os produtos do banco de dados
    const produtos = await db.selecionaProdutos()
    return res.json(produtos)
})



// retorna um unico produto por id
// GET http://localhost:3000/produtos/id
server.get('/produtos/:index', async(req, res)=> {
    const {index} = req.params
    const produto = await db.buscaPorId(index)
    // retorna array contendo produto ou vazio
    console.log(produto)
    return res.json(produto)
})



// excluir produto
// DELETE http://localhost:3000/produto/id
server.delete('/produtos/:index', async(req, res)=>{
    const {index} = req.params;
    const retorno = await db.deletaProduto(index);
    return res.json(retorno[0].affectedRows == 1)

   

})




// Salva um produto
//POST http://localhost:3000/produtos
server.post('/produtos',async(req, res)=>{
    const produto = req.body
    const retorno = await db.insereProduto(produto);
    console.log (retorno);


});





// Atualiza produto
// PUT http://localhost:3000/produtos
server.put("/produtos", async(req, res) => {
    const produto = req.body
    const retorno = await db.atualizaProduto(produto.id, produto)

    if (retorno[0].affectedRows == 1)
        res.json({sucesso:true})
    else
        res.json({sucesso:false})
        

})



//inicia a execução do servidor
server.listen('3000', () => {
    console.log('Servidor iniciado')
})