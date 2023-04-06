(async () => {
    // importa o arquivo db.js
    const db = require ('./db')
/*
    console.log ('Inserindo produto...')
    const inseriu = await db.insereProduto({descricao: 'Barra de cereais Vegano 2',
                                            categoria: 2,
                                            preco: 99.60,
                                            quantidade: 15,
                                            url: 'imagens/cereais.png'

                                            })

    console.log ('Inseriu')
*/


/*
    console.log ('Pesquisando produtos...')
    const produtos = await db.selecionaProdutos()
    console.log (produtos)
*/

/*
console.log ('Buscando produto...')
const id = 1
const produto = await db.buscaPorId(id)
console.log(produto)
*/

/*
console.log ('Atualizando produto...')
    const atualizou = await db.atualizaProduto(1,{descricao: 'Barra de cereais Vegano 2',
                                                categoria: 2,
                                                preco: 99.60,
                                                quantidade: 15,
                                                url: 'imagens/cereais2.png'

                                                })
console.log (atualizou)
*/

console.log("Apagando produto")
const apagou = await db.deletaProduto(3)
console.log (apagou)





})();
