

async function conectar (){
    if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao;



    // cria um suporte a promise para comunicação com o banco
    const mysql = require ('mysql2/promise')

    // cria uma conexao assincrona com o banco
    const conexao = mysql.createConnection ('mysql://root:softgraf@localhost:3306/mundoverde')
    console.log ("Conectou no MySql")
    // salva a conexão dentro do objeto global
    global.conexao = conexao;
    // devolve a conexão
    return conexao;


}


// lista completa de produtos
async function selecionaProdutos(){
    const con = await conectar()
    const [rows] = await con.query('SELECT * FROM Produtos')
    return rows

}


// lista um produto especifico por id
async function buscaPorId(id){
    const con = await conectar()
    const sql = 'SELECT * FROM Produtos WHERE id=?'
    const [rows] = await con.query(sql, id)
    return rows


}

// salva um unico produto na tabela
async function insereProduto (produto){
    // conecta com o banco
    const con = await conectar();
    const sql = 'INSERT INTO Produtos (descricao, categoria, preco, quantidade, url) VALUES (?,?,?,?,?);';
    const valores = [produto.descricao, produto.categoria, produto.preco, produto.quantidade, produto.url];
    return await con.query(sql, valores);

}

// atualiza um unico produto
async function atualizaProduto(id, produto){
    const con = await conectar();
    const sql = 'UPDATE Produtos SET descricao=?, categoria=?, preco=?, quantidade=?, url=? WHERE id=?';
    const valores = [produto.descricao, produto.categoria, produto.preco, produto.quantidade, produto.url, id];
    return await con.query(sql, valores);

}

// deletar um unico produto
async function deletaProduto(id){
    const con = await conectar()
    const sql = 'DELETE FROM    Produtos WHERE ID=?'
    return await con.query(sql,id)

}

module.exports = {selecionaProdutos, buscaPorId, insereProduto, atualizaProduto, deletaProduto}