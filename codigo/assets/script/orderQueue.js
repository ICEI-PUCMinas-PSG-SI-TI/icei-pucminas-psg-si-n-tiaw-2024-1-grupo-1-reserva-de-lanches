
let comprasPendentes = [];
let comprasRetiradas = [];
const content = document.querySelector(".content");

function retirarPedido(idPedido){
    comprasPendentes = abrirLS('pedidos');
    comprasRetiradas = abrirLS('retiradas');

    let compraFinalizada = comprasPendentes.find(p => p.compraID === idPedido);
    comprasRetiradas.push(compraFinalizada);
    console.log("retirados: ", comprasRetiradas);
    salvarLS('retiradas', comprasRetiradas);    

    comprasPendentes = comprasPendentes.filter(p => p.compraID !== idPedido);
    salvarLS('carrinho', comprasPendentes);
    filaDePedidos();
}

function finalizarFilaDePedidos(){
    comprasPendentes = abrirLS('carrinho');

    comprasPendentes = [];

    salvarLS('carrinho', comprasPendentes);

    filaDePedidos();
}

function filaDePedidos() {
    comprasPendentes = abrirLS('carrinho');

    divCarrinho();

    console.log("chamada!")
}

function divCarrinho() {

    content.innerHTML = ``;

    comprasPendentes.forEach(p => {
        let div = document.createElement('div');
        div.className = 'container';

        let itensString = '';
        p.carrinho.forEach((item, index) => {
            itensString += `${item.nome} (${item.quantidade})`;
            if (index !== p.carrinho.length - 1) {
                itensString += ', '; // Adiciona vírgula entre os itens, exceto no último
            }
        });

        div.innerHTML = `
        <h3>Pedido: ${p.compraID}  Cliente: ${p.cliente}</h3>
        <h4>ITENS: ${itensString}</h4>
        <p>DESCRIÇÃO DO PEDIDO: ${p.descricao}</p>
        <h3>Total: ${p.total}</h3>

        <button class="btn" onClick="retirarPedido(${p.compraID})">Retirar</button>
    
    `;
        content.appendChild(div);
    });
}

function abrirLS(chave) {
    let ls = JSON.parse(localStorage.getItem(chave) || '[]');
    console.log('Lista recuperada/criada:', ls);
    return ls;
}

function salvarLS(chave, item) {
    let itemJSON = JSON.stringify(item);
    localStorage.setItem(chave, itemJSON);
    console.log('Item atribuído ao Local Storage com sucesso.');
}



filaDePedidos();
//setInterval(filaDePedidos, 4000); 
