
const urlParams = new URLSearchParams(location.search);
let productID = parseInt(urlParams.get('id'));

function initInsertPage() {

    document.querySelector('#tituloNavBar').innerText = 'Cadastrar Produto';

    if (productID) {
        loadProduct(productID);
    }

    loadEvents();
}

function loadEvents() {
    let inputPreco = document.querySelector("#preco");
    inputPreco.addEventListener('keyup', priceKeyUp);
    inputPreco.addEventListener('blur', priceBlur);

    document.querySelector("#estoque").addEventListener('keyup', stockKeyUp);

    document.querySelector("#cancelar").addEventListener('click', function () {
        window.open("cadastroDeProdutos.html", '_self');
    });

    document.querySelector("#confirmar").addEventListener('click', addProduct);

    document.querySelector("#loadImage").addEventListener('change', previewFile);
    document.querySelector("#loadImage").setAttribute('title', '');
}

function loadProduct(productID) {
    let dbProdutos = JSON.parse(localStorage.getItem('dbProdutos'));

    document.querySelector('#tituloNavBar').innerText = 'Editar Produto';

    for (let i = 0; i < dbProdutos.items.length; i++) {

        if (productID == dbProdutos.items[i].id) {

            document.querySelector('#editProduct img').src = dbProdutos.items[i].img;
            document.querySelector('#editProduct img').setAttribute('alt', dbProdutos.items[i].descricao);
            document.querySelector('#tipo').value = dbProdutos.items[i].tipo;
            document.querySelector('#descricao').value = dbProdutos.items[i].descricao;

            // Converte '.' para ',' e mantém duas casas decimais
            let preco = parseFloat(dbProdutos.items[i].preco);
            preco = preco.toFixed(2).toString();
            preco = preco.replace('.', ',');
            document.querySelector('#preco').value = preco;

            document.querySelector('#spanImg').innerText = 'Alterar imagem:'
            document.querySelector('#estoque').value = parseInt(dbProdutos.items[i].estoque);
            return;
        }
    }
}

function addProduct(e) {
    let dbProdutos = JSON.parse(localStorage.getItem('dbProdutos'));

    if (!dbProdutos) {
        return;
    }

    if (!productID) {
        productID = dbProdutos.proximoID;
    }

    let strPreco = document.querySelector('#preco').value;
    strPreco = strPreco.replace(',', '.');

    let strEstoque = document.querySelector('#estoque').value;
    if (!strEstoque) {
        strEstoque = '0';
    }

    let product = {
        id: productID,
        tipo: document.querySelector('#tipo').value,
        descricao: document.querySelector('#descricao').value,
        preco: parseFloat(strPreco).toFixed(2),
        estoque: parseInt(strEstoque),
        img: document.querySelector('#editProduct img').src
    }

    if (!checkData(product)) {
        return;
    }

    // Se os IDs forem iguais, então inseri novo produto. Senão deve atualizar o produto.
    if (productID == dbProdutos.proximoID) {
        dbProdutos.items.push(product);
        dbProdutos.proximoID += 1;
    } else {
        let index = getProductIndex(productID);

        if (index != -1) {
            dbProdutos.items[index] = product;
        }
    }

    localStorage.setItem('dbProdutos', JSON.stringify(dbProdutos));
    
    // Força o recarregamento dos Menus abertos pelos clientes
    reloadMenu();

    window.open("../html/cadastroDeProdutos.html", '_self');
}

function reloadMenu() {
    updateDataBase = { reload: true };
    localStorage.setItem('updateDataBase', JSON.stringify(updateDataBase));
}

function getProductIndex(id) {
    let dbProdutos = JSON.parse(localStorage.getItem('dbProdutos'));

    for (let i = 0; i < dbProdutos.items.length; i++) {
        if (dbProdutos.items[i].id == id) {
            return i;
        }
    }

    return -1;
}

function priceKeyUp(e) {

    if (this.value[0] == ',') {
        this.value = '0' + this.value;
    }

    this.value = this.value.replace(/^([0]+)([\s\S]+)?/, '0$2');
    this.value = this.value.replace(/^([0]+)(\d)([\s\S]+)?/, '$2$3');
    this.value = this.value.replace(/(\d+)?([,])?(\d{1,2})?([\s\S]+)?/, '$1$2$3');
}

function priceBlur(e) {

    if (!this.value) {
        return;
    }

    let pos = this.value.indexOf(',');

    if (pos == -1) {
        if (!this.value) {
            this.value = '0,00';
        } else {
            this.value += ',00';
        }
    }
    else {
        let texto = this.value.substring(pos, this.value.length);
        // console.log(`texto = "${texto}" - texto.length = ${texto.length}`);
        for (let i = 0; i < 3 - texto.length; i++) {
            this.value += '0';
        }
    }
}

function stockKeyUp(e) {
    this.value = this.value.replace(/(\D+)?(\d+)?(\D+)?/, '$2');
}

function checkData(product) {

    if (!product.tipo) {
        alert('Tipo inválido!');
        return false;
    }

    if (!product.descricao) {
        alert('Descrição inválida!');
        return false;
    }

    if (!product.preco || product.preco == 0 || isNaN(product.preco)) {
        alert('Preço inválido!');
        return false;
    }

    return true;
}

// Load image file
function previewFile(e) {
    const img = document.querySelector('#editProduct img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

    e.target.text = '';
}
