let dbMock = {
    tipo: ['Comidas', 'Bebidas', 'Doces'],
    proximoID: 20,
    items: [
        {
            id: 1,
            tipo: 'Comidas',
            descricao: 'Sanduíche Natural',
            preco: 6.50,
            estoque: 5,
            img: '../img/sanduiche-natural.jpg'
        },
        {
            id: 2,
            tipo: 'Comidas',
            descricao: 'Coxinha',
            preco: 6.50,
            estoque: 15,
            img: '../img/coxinha.jpg'
        },
        {
            id: 3,
            tipo: 'Comidas',
            descricao: 'Empada',
            preco: 6.50,
            estoque: 10,
            img: '../img/empada.jpg'
        },
        {
            id: 4,
            tipo: 'Comidas',
            descricao: 'Pão de Queijo',
            preco: 3.00,
            estoque: 15,
            img: '../img/pao-de-queijo.jpg'
        },
        {
            id: 5,
            tipo: 'Comidas',
            descricao: 'Pão de Queijo Recheado',
            preco: 5.00,
            estoque: 10,
            img: '../img/pao-de-queijo-recheado.jpg'
        },
        {
            id: 6,
            tipo: 'Comidas',
            descricao: 'Pastel Assado',
            preco: 6.50,
            estoque: 10,
            img: '../img/pastel-assado.jpg'
        },
        {
            id: 7,
            tipo: 'Comidas',
            descricao: 'Hamburgão',
            preco: 8.00,
            estoque: 5,
            img: '../img/hamburgao.jpg'
        },
        {
            id: 8,
            tipo: 'Comidas',
            descricao: 'Enrolado de Presunto e Queijo',
            preco: 6.50,
            estoque: 10,
            img: '../img/enrolado-presunto-queijo.jpg'
        },
        {
            id: 9,
            tipo: 'Comidas',
            descricao: 'Enrolado de Salsicha',
            preco: 6.50,
            estoque: 5,
            img: '../img/enrolado-salsicha.jpg'
        },
        {
            id: 10,
            tipo: 'Comidas',
            descricao: 'Hambúrguer',
            preco: 12.00,
            estoque: 5,
            img: '../img/hamburguer.png'
        },
        {
            id: 11,
            tipo: 'Comidas',
            descricao: 'Batata Frita',
            preco: 15.00,
            estoque: 5,
            img: '../img/batata-frita.jpg'
        },
        {
            id: 12,
            tipo: 'Bebidas',
            descricao: 'Refrigerantes',
            preco: 6.00,
            estoque: 30,
            img: '../img/refrigerantes.jpg'
        },
        {
            id: 13,
            tipo: 'Bebidas',
            descricao: 'Sucos',
            preco: 6.50,
            estoque: 20,
            img: '../img/sucos.jpg'
        },
        {
            id: 14,
            tipo: 'Bebidas',
            descricao: 'Vitaminas',
            preco: 7.50,
            estoque: 20,
            img: '../img/vitaminas.jpg'
        },
        {
            id: 15,
            tipo: 'Bebidas',
            descricao: 'Água',
            preco: 4.50,
            estoque: 50,
            img: '../img/agua-mineral.jpeg'
        },
        {
            id: 16,
            tipo: 'Bebidas',
            descricao: 'Energético',
            preco: 12.00,
            estoque: 15,
            img: '../img/energeticos.jpg'
        },
        {
            id: 17,
            tipo: 'Doces',
            descricao: 'Bombom',
            preco: 3.00,
            estoque: 50,
            img: '../img/bombom.jpg'
        },
        {
            id: 18,
            tipo: 'Doces',
            descricao: 'Balas',
            preco: 0.25,
            estoque: 100,
            img: '../img/balas.jpg'
        },
        {
            id: 19,
            tipo: 'Doces',
            descricao: 'Chicletes',
            preco: 2.50,
            estoque: 50,
            img: '../img/chicletes.jpg'
        },
    ]
};

let dbProdutos = {};

function initRegisterPage() {
    loadProducts();
    loadEvents();
}

function loadEvents() {
    document.querySelector("#cadastrarProduto").addEventListener('click', function() {
        window.open('inserirEditar.html', '_self');
    });

    let btnEditar = document.querySelectorAll("#listaProdutos .menu-item-button-editar");
    for (let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener('click', function (event) {
            let id = parseInt(event.target.getAttribute("data-id"));
            window.open(`inserirEditar.html?id=${id}`, '_self');
        });
    }

    let btnExcluir = document.querySelectorAll("#listaProdutos .menu-item-button-excluir");
    for (let i = 0; i < btnExcluir.length; i++) {
        btnExcluir[i].addEventListener('click', removeProduct);
    }
}

function loadProducts() {
    dbProdutos = JSON.parse(localStorage.getItem('dbProdutos'));

    if (!dbProdutos) {
        dbProdutos = dbMock;
        localStorage.setItem('dbProdutos', JSON.stringify(dbProdutos));
    }

    document.querySelector('#listaProdutos').innerHTML = '';

    let strHTML = '';

    for (let i = 0; i < dbProdutos.tipo.length; i++) { //dbProdutos.items.length

        strHTML += `<h2>${dbProdutos.tipo[i]}</h2>`
        strHTML += '\n';

        for (let j = 0; j < dbProdutos.items.length; j++) {
            let id = parseInt(dbProdutos.items[j].id);
            let tipo = dbProdutos.items[j].tipo;
            let descricao = dbProdutos.items[j].descricao;
            let preco = parseFloat(dbProdutos.items[j].preco);
            preco = preco.toFixed(2).toString();
            preco = preco.replace('.',',');
            let estoque = parseInt(dbProdutos.items[j].estoque);
            let imgURL = dbProdutos.items[j].img;

            if (dbProdutos.tipo[i] == tipo) {
                strHTML += `            <div class="menu-item">
                    <img src="${imgURL}"
                        alt="${descricao}">
                    <div class="menu-item-content">
                        <h2>${descricao}</h2>
                        <p>Preço: R$${preco}</p>
                        <p>Estoque: ${estoque}</p>
                    </div>
                    <div class="menu-item-content">
                        <button type="button" class="menu-item-button-editar" data-id="${id}">Editar</button>
                        <button type="button" class="menu-item-button-excluir" data-id="${id}">Excluir</button>
                    </div>
                </div>`
                strHTML += '\n';
            }
        }
    }

    document.querySelector('#listaProdutos').innerHTML = strHTML;
}

function removeProduct(event) {
    let id = parseInt(event.target.getAttribute("data-id"));

    let index = getProductIndex(id);
    if (index != -1) {
        dbProdutos.items.splice(index, 1);
        localStorage.setItem('dbProdutos', JSON.stringify(dbProdutos));
        
        // Força o recarregamento dos Menus abertos pelos clientes
        reloadMenu();
        
        initRegisterPage();
    }
}

function reloadMenu() {
    updateDataBase = { reload: true };
    localStorage.setItem('updateDataBase', JSON.stringify(updateDataBase));
}

function getProductIndex(id) {

    for (let i = 0; i < dbProdutos.items.length; i++) {
        if (dbProdutos.items[i].id == id) {
            return i;
        }
    }

    return -1;
}

function logOff() {
    sessionStorage.removeItem('loggedInUser');
    window.open("../../index.html", '_self');
}