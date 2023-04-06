// função para preencher todos os campos do formulário
const preencher_formulario = (produto) => {

    document.getElementById('id').value = produto.id
    document.getElementById('descricao').value = produto.descricao
    document.getElementById('categoria').value = produto.categoria
    document.getElementById('preco').value = produto.preco
    document.getElementById('quantidade').value = produto.quantidade
    document.getElementById('url').value = produto.url
    
}


document.addEventListener("DOMContentLoaded" , () => {

    // recupera o valor do parametro id
    //ex: http://127.0.0.1:5500/alterar.html?id=7
    const queryString = window.location.search
    //transforma a string em um objeto URL
    const urlParams = new URLSearchParams(queryString);
    //agora pega p id do objeto url
    const id = urlParams.get("id")
    console.log(id)

    // solicita ao servidor rodando na porta 3000 a lista dos produtos
    fetch("http://localhost:3000/produtos/" + id)

    .then ((res) => res.json())

    // assim que o fecth retornar, converte os dados em formato json
    .then((data) => {
   
        if (data.length > 0){
            // pega o unico objeto do array
            const produto = data[0]
            preencher_formulario(produto)
        } else {
            alert("Erro: Nenhum produto retornado na busca por id")
        }

    }).catch(() => alert ("Erro ao buscar produto por id no banco de dados"))




})


// atualiza dados do formulario via metodo put

const atualizar = () => {

    if (!validar_formulario())
    return;

    // ler os dados do formulario e cria um ojeto json
    const dados = {
        id: document.getElementById("id").value,
        descricao: document.getElementById ("descricao").value,
        categoria: parseInt(document.getElementById("categoria").value),
        preco: parseFloat(document.getElementById("preco").value.replace(",",".")),
        quantidade: parseInt(document.getElementById("quantidade").value),
        url: document.getElementById("url").value

    }
    
    // ENVIA UMA REQISIÇÃO COM OS DADOS PARA ATUALIZAR NO BANCO
    fetch("http://localhost:3000/produtos/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(dados)

        // converte a resposta do servidor em objeto json
    }).then((res) => res.json()

    ).then((data) => {
        console.log(data);

    }).then(() => {
        console.log("Produto atualizado com sucesso")
        location.href = "gerenciar.html"

    }).catch((erro) => {
        alert("Erro ao atualizar dados do produto: " + erro)
    })


}