const tipo_categoria = ["Cereais","Suplementos", "Temperos "]

// mostra todos os produtos do banco de dados na tabela
const adicionarNaTabela = (dados) => {
    const tabela = document.getElementById("tabela")
    console.log(dados)

    dados.forEach(produto => {
        // calcula o numero de linhas da tabela
        const tamanhoTabela = tabela.rows.length;
        // insere uma linha em branco abaixo da ultima
        const linha = tabela.insertRow(tamanhoTabela)
        // insere as celulass da linha
        const id = linha.insertCell(0);
        // adiciona o id no elemento a ser criado
        linha.id = produto.id
        const descricao = linha.insertCell(1);
        const categoria = linha.insertCell(2);
        const preco = linha.insertCell(3);
        const quantidade = linha.insertCell(4);
        const imagem = linha.insertCell(5);
        const alterar = linha.insertCell(6);
        const excluir = linha.insertCell(7);

        // preenche as celulas da linha
        id.innerHTML = produto.id
        descricao.innerHTML = produto.descricao
        categoria.innerHTML = tipo_categoria[produto.categoria]
        preco.innerHTML = produto.preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
        quantidade.innerHTML = produto.quantidade;         
        const url = produto.url.toLowerCase();

        if (url.substring(0,4) == "http"){
            imagem.innerHTML = "<img src=" + url + ' width="100" alt="Foto do Produto" class="img-thumbnail">'
        }else {
            imagem.innerHTML = "<img src=assests/galeria" + url + ' width="100" alt="Foto do Produto" class="img-thumbnail">'
        }

        alterar.innerHTML = '<a href="alterar.html?id=' + produto.id + '" class = "btn btn-outline-success btn-cmd">Alterar</a>';
        
        
        excluir.innerHTML = '<button class="btn btn-outline-danger btn-cmd" onclick="excluirDaTabela(' + produto.id + ')">Excluir</button>'



    });

}


    const excluirDaTabela = (id) => {

        fetch("http://localhost:3000/produtos/" + id, {
            method: "DELETE"

        }).then(() => {
            document.getElementById(id).remove()

        }).catch(() => {
            alert("Erro ao excluir produto do banco de dados")
        })
    }
       


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/produtos")

    // converte a resposrta em formato json
    .then((res) => res.json())

    .then((data) => adicionarNaTabela(data))

    .catch(() => alert ("Erro ao consultar produtos no banco de dados"))

})









