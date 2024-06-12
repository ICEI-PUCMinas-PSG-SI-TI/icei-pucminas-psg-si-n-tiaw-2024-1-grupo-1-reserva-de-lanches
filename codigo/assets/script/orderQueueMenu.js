const main = document.querySelector('main');
const client = "tester";
let carrinhoLocalStorage = [];
const carrinho = [];
const produtos = [
    { "id": 1, "nome": "hamburguer", "preco": 10.99 },
    { "id": 2, "nome": "pizza", "preco": 29.99 },
    { "id": 3, "nome": "esfirra", "preco": 15.99 },
    { "id": 4, "nome": "cachorro quente", "preco": 7.99 },
    { "id": 5, "nome": "batata frita", "preco": 9.99 },
    { "id": 6, "nome": "nuggets", "preco": 12.99 },
    { "id": 7, "nome": "refrigerante", "preco": 4.99 },
    { "id": 8, "nome": "sorvete", "preco": 6.99 },
    { "id": 9, "nome": "milkshake", "preco": 8.99 },
    { "id": 10, "nome": "salada", "preco": 5.99 }
];

function salvarCarrinho(){
    let carCliente = retornarProdutoCarrinho();

    carrinhoLocalStorage = abrirLS();
    
    carrinhoLocalStorage.push(carCliente);

    salvarLS('carrinho', carrinhoLocalStorage); 
}

function retornarProdutoCarrinho() {
    const carrinhoObject = {
        cliente: client,
        clienteID: 0,
        compraID: returnIdCompra(),
        carrinho: [],
        descricao: returnDescricao(),
        total: retornarTotal(carrinho)
    };
    function returnIdCompra(){
        carrinhoLocalStorage = abrirLS();
        let int = carrinhoLocalStorage.length;
        return int;
    }
    function returnDescricao() {
        let text = document.getElementById('descricaoCompra').value;
        return text;
    }
    
    function retornarTotal(){
        let total = 0;
        carrinho.forEach(p => {
            total += p.preco * p.quantidade;
        });
        return total;
    }

    carrinho.forEach(p => {
        if (p.id !== 0) {
            carrinhoObject.carrinho.push({
                id: p.id,
                nome: p.nome,
                preco: p.preco,
                quantidade: p.quantidade
            });
        }
    });
    console.log("carrinhoObject");
    console.log(carrinhoObject);
    return carrinhoObject;
}


function abrirLS() {
    let ls = JSON.parse(localStorage.getItem('carrinho') || '[]'); 
    console.log('Lista recuperada/criada:', ls);
    return ls;
}

function salvarLS(chave, item) {
    let itemJSON = JSON.stringify(item);
    localStorage.setItem(chave, itemJSON);
    console.log('Item atribuído ao Local Storage com sucesso.');
}


function showCarrinho() {
    let carrinhoDiv = document.getElementById('carrinho');

    if (!carrinhoDiv) {
        carrinhoDiv = document.createElement('div');
        carrinhoDiv.id = 'carrinho';
        carrinhoDiv.className = 'container';
        carrinhoDiv.style.cssText = 'margin: 5px; width: 80%; position: absolute; z-index: 11; top: 15%; right: 10%; border: 2px solid black; background-color: white;';

        main.appendChild(carrinhoDiv);
    }

    carrinhoDiv.innerHTML = `
        <h4>Carrinho</h4>

        <input type="text" id="descricaoCompra" min="0" max="100" placeholder="Informações adicionais" value="none">

        <button class="btn" id="finalizarCompraBtn" onClick="salvarCarrinho()">Finalizar Compra</button>

`;
    carrinho.forEach(p => {
        if (p.id !== 0) {
            let carrinhoP = document.createElement('p');
            carrinhoP.innerHTML = `<br>Produto: ${p.nome}<br>Preço: R$ ${p.preco}<br>Quantidade: <input type="number" id="qtd-${p.id}" name="qtd" min="1" max="100" value="${p.quantidade}"><br><br><button class="btn" onClick="removerDoCarrinho(${p.id})">Remover</button><br>`;
            carrinhoDiv.appendChild(carrinhoP);
        }
    });

    if (carrinhoDiv.classList.contains('hidden')) {
        carrinhoDiv.classList.remove('hidden');
    } else {
        carrinhoDiv.classList.add('hidden');
    }
}

function removerDoCarrinho(id) {
    const index = carrinho.findIndex(item => item.id === id);
    if (index !== -1) {
        carrinho.splice(index, 1);
    } else {
        console.log(`Produto com ID ${id} não encontrado no carrinho.`);
    }

    showCarrinho();
    showCarrinho();
}

function finalizarCompra() {
    // Lógica para finalizar a compra
    console.log("Compra finalizada!");
}



function AdicionarAoCarrinho(id, quantidade) {
    let produtoEncontrado = produtos.find(p => p.id === id);

    if (!produtoEncontrado) {
        console.log("Produto não encontrado.");
        return;
    }

    quantidade = parseInt(quantidade);

    let produtoComQuantidade = { ...produtoEncontrado, quantidade: quantidade };
    carrinho.push(produtoComQuantidade);
    console.log("Produto adicionado ao carrinho:", produtoComQuantidade);
    console.log(carrinho);
}


function showCardapio() {
    let cardapioDiv = document.getElementById('cardapio');

    if (!cardapioDiv) {
        cardapioDiv = document.createElement('div');
        cardapioDiv.id = 'cardapio';
        cardapioDiv.className = 'container hidden';
        cardapioDiv.style.cssText = 'margin: 5px; width: 80%; position: absolute; z-index: 10; top: 15%; right: 10%; border: 2px solid black; background-color: wheat;';
        cardapioDiv.innerHTML = '<h4>Cardápio</h4>';
        main.appendChild(cardapioDiv);

        produtos.forEach(p => {
            let cardapioP = document.createElement('p');
            cardapioP.innerHTML = `Produto: ${p.nome}<br>Preço: R$ ${p.preco}<br>Quantidade: <input type="number" id="qtd-${p.id}" name="qtd" min="1" max="100"><br><br><button class="btn" onClick="AdicionarAoCarrinho(${p.id}, document.getElementById('qtd-${p.id}').value)">Adicionar</button><br><br>`;

            cardapioDiv.appendChild(cardapioP);
        });
    }

    if (cardapioDiv.classList.contains('hidden')) {
        cardapioDiv.classList.remove('hidden');
    } else {
        cardapioDiv.classList.add('hidden');
    }
}
