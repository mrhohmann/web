const criarGaleriaProdutos = (dados) => {
    const galeria = document.getElementById("galeria")
   
    dados.forEach(p => {

        const preco = p.preco.toLocaleString('pt-BR', {style:'currency', currency: "BRL"})

        let url = p.url.toLowerCase();
        // acrescenta o caminho da pasta local se nao for web
        if (url.substring(0, 4) != 'http'){
            url = 'assets/galeria/' + url;

        }
        
        const card_produto =
        '<div class="col">' +
            '<div class="card mb-4" style="width: 18rem">' +
                '<img class="card-img-top" src="' + url + '" alt="Foto do Produto">' + 

                '<div clas="card-body">' +
                    '<h5 class="card-title">' + p.descricao + '</h5>' +
                    '<h6 class="card-subtitle mb-2 text-muted">' + preco + '</h6>' +
                    '<p class="card-text">Restam:' + p.quantidade + '</p>' +
                    '<p class="card-text">Cód.:' + p.id + '</p>' +
                    '<a href="#" class="btn btn-primary">Adicionar ao carrinho</a>'
                '</div>'
            '</div>'
        '</div>'

        galeria.innerHTML += card_produto

    })
}

document.addEventListener("DOMContentLoaded", ()=> {
    // solicita ao servidor rodar na porta 3000 a lista dos produtos
    fetch("http://localhost:3000/produtos")

    // converte a resposat em formato json
    .then((res)=> res.json())

    //recebe os dados da resposta
    .then ((data)=> criarGaleriaProdutos(data))

    // captura erro se houver
    .catch(()=> alert("Erro ao consultar produtos no banco de dados"))


})


