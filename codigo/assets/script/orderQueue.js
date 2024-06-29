
let comprasPendentes = [];
let comprasRetiradas = [];
let comprasEncerradas = [];

const content = document.querySelector(".content");

function fillParamsList() {
    comprasPendentes = JSON.parse(localStorage.getItem('pedidos')) || []
}

function retirarPedido(clienteEmail) {
    comprasRetiradas = abrirLS('pedidos-retirados');

    let compraFinalizada = comprasPendentes.find(p => p.cliente === clienteEmail);
    if (!compraFinalizada) {
        console.log(`Pedido do cliente ${clienteEmail} não encontrado.`);
        return
    }

    comprasRetiradas.push(compraFinalizada);
    comprasRetiradas.forEach( o =>{
        o.status = 'retirado'
    })
    salvarLS('pedidos-retirados', comprasRetiradas);

    console.log("retirados: ", comprasRetiradas);

    comprasPendentes = comprasPendentes.filter(p => p.cliente !== clienteEmail);

    salvarLS('pedidos', comprasPendentes);
    filaDePedidos();
}


function finalizarFilaDePedidos() {
    comprasEncerradas = abrirLS('pedidos')
    if(!comprasEncerradas){
        alert('Não há pedidos na fila.')
        return
    }

    comprasPendentes = [];

    comprasEncerradas.forEach(o => {
        o.status = 'encerrado'
    })

    salvarLS('compras-encerradas', comprasEncerradas)
    //salvarLS('pedidos', comprasPendentes);

    filaDePedidos();
}

function filaDePedidos() {

    divCarrinho();
}

function divCarrinho() {
    content.innerHTML = ``;

    comprasPendentes.forEach(p => {
        let div = document.createElement('div');
        div.className = 'container';

        let itensString = '';
        p.items.forEach((item, index) => {
            itensString += `${item.nome} (${item.qtd})`;
            if (index !== p.items.length - 1) {
                itensString += ', '; // Adiciona vírgula entre os itens, exceto no último
            }
        });

        // Supondo que você tenha um campo de ID de compra e total no objeto p.
        div.innerHTML = `
        <h3>Cliente: ${p.cliente}</h3>
        <h4>ITENS: ${itensString}</h4>
        <h3>Total: ${p.items.reduce((acc, item) => acc + parseFloat(item.total.replace('R$', '').trim()), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>

        <button class="btn" onClick="retirarPedido('${p.cliente}')">Retirar</button>
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

setInterval(filaDePedidos, 400); 
fillParamsList();
filaDePedidos();
