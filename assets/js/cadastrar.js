// Salva dados do formulário via método post

const salvar = ()=>{

    if (!validar_formulario())
        return


    const dados = {
        descricao : document.getElementById("descricao").value,
        categoria : parseInt(document.getElementById('categoria').value),
        preco: parseFloat(document.getElementById("preco").value.replace(',','.')),
        quantidade: parseInt(document.getElementById("quantidade").value),
        url: document.getElementById("url").value

    }

    // envia uma requisição
    fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify(dados)
    }).then((res) => res.json()

    // pega o bojeto json convertido
    ).then((data) => {
        console.log(data);

    }).then(() => {
        console.log ("Sucesso ao cadastrar produto")
        location.href = "gerenciar.html"

    }).catch ((erro) => {
        alert("Erro ao cadastrar produto" + erro)
    })

    console.log(dados)
    

}