
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
            img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkoNbV9SkABi_6ZnMjxIiqKDdvyI7hNpewpmvezY_WAHgIa18cSYI9-iEFKPEA5Gab_eIEXjoWZX1hid6SsGLsU57IsfdVzT3xi7oBIarwUFLMJ4R4D7vfCvKh_UG5dIC1PNa_MSplPVdvO0VLqeIVmFTd82YZuKExqtBk8wF6Yv79NBRbvTzsXFed/s2000/receita-de-sandu%C3%ADche-natural-light.jpg"'
        },
        {
            id: 2,
            tipo: 'Comidas',
            descricao: 'Coxinha',
            preco: 6.50,
            estoque: 15,
            img: 'https://th.bing.com/th/id/R.8195acd4602f690432d2219418cef287?rik=1DUVRcQMjv0K9g&riu=http%3a%2f%2freceitas.net%2fwp-content%2fuploads%2f2017%2f10%2fcoxinha-de-frango-1024x695.jpg&ehk=hNBqU7g3n9XkMWhlGLFgHln5G7kTWtZvPdLMTD3gY0s%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 3,
            tipo: 'Comidas',
            descricao: 'Empada',
            preco: 6.50,
            estoque: 10,
            img: 'https://2.bp.blogspot.com/-hEHgTOrhKSk/T41V5A6v1nI/AAAAAAAAACk/2VECbSy0__M/s1600/empada.jpg'
        },
        {
            id: 4,
            tipo: 'Comidas',
            descricao: 'Pão de Queijo',
            preco: 3.00,
            estoque: 15,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhbL3UnDr7fe6-A6_msYI-Qo8UtHtO1xrQ&s'
        },
        {
            id: 5,
            tipo: 'Comidas',
            descricao: 'Pão de Queijo Recheado',
            preco: 5.00,
            estoque: 10,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbaV-12-rJkimIgGe20CPLUxxAoGGNcrRAYQ&s'
        },
        {
            id: 6,
            tipo: 'Comidas',
            descricao: 'Pastel Assado',
            preco: 6.50,
            estoque: 10,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7cmen4IT5oFYEmneiSOE8drNZZsS7mhrBMA&s'
        },
        {
            id: 7,
            tipo: 'Comidas',
            descricao: 'Hamburgão',
            preco: 8.00,
            estoque: 5,
            img: 'https://i.ytimg.com/vi/-STkr9JS6pA/mqdefault.jpg'
        },
        {
            id: 8,
            tipo: 'Comidas',
            descricao: 'Enrolado de Presunto e Queijo',
            preco: 6.50,
            estoque: 10,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0VcQ7tDl4pJIFLC942txDBjoZyKBgQ7PRLHSZjgA7ZmahUjorEwAgjI-TAOEDvMOlLRQ&usqp=CAU'
        },
        {
            id: 9,
            tipo: 'Comidas',
            descricao: 'Enrolado de Salsicha',
            preco: 6.50,
            estoque: 5,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKn_3-QE63FNtqQuejcM5artPx_UJ1YaKeA&s'
        },
        {
            id: 10,
            tipo: 'Comidas',
            descricao: 'Hambúrguer',
            preco: 12.00,
            estoque: 5,
            img: 'https://www.perdigao.com.br/assets/_images/654bfd759bf743d8e6e420cd097f94745da24bc7.png'
        },
        {
            id: 11,
            tipo: 'Comidas',
            descricao: 'Batata Frita',
            preco: 15.00,
            estoque: 5,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5t7mL44se71Kw089vf99YG9_3PYQowHpFdg&s'
        },
        {
            id: 12,
            tipo: 'Bebidas',
            descricao: 'Refrigerantes',
            preco: 6.00,
            estoque: 30,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmycCQRo4JsPvVyFKqQBk0pmD9LWsP1pKu9w&s'
        },
        {
            id: 13,
            tipo: 'Bebidas',
            descricao: 'Sucos',
            preco: 6.50,
            estoque: 20,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0-69gl2VtvQSUA9AouJHYi1uWL7YNL527Q&s'
        },
        {
            id: 14,
            tipo: 'Bebidas',
            descricao: 'Vitaminas',
            preco: 7.50,
            estoque: 20,
            img: 'https://www.guiadasemana.com.br/contentFiles/image/2019/05/FEA/galeria/52849_w840h525_1558996048shutterstock-1237794556.jpg'
        },
        {
            id: 15,
            tipo: 'Bebidas',
            descricao: 'Água',
            preco: 4.50,
            estoque: 50,
            img: 'https://abir.org.br/abir/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-30-at-15.26.58.jpeg'
        },
        {
            id: 16,
            tipo: 'Bebidas',
            descricao: 'Energético',
            preco: 12.00,
            estoque: 15,
            img: 'https://th.bing.com/th?id=OSK.HEROdcF23LjpLGIEo4Lk0MYDJrEZ9euas7qCH_jaxJniP-4&w=384&h=228&c=13&rs=2&o=6&pid=SANGAM'
        },
        {
            id: 17,
            tipo: 'Doces',
            descricao: 'Bombom',
            preco: 3.00,
            estoque: 50,
            img: 'https://casabrasileira.ch/wp-content/uploads/2020/06/636.jpg'
        },
        {
            id: 18,
            tipo: 'Doces',
            descricao: 'Balas',
            preco: 0.25,
            estoque: 100,
            img: 'https://www.revistaartesanato.com.br/wp-content/uploads/2019/07/como-montar-mesa-de-doce-5.jpg'
        },
        {
            id: 19,
            tipo: 'Doces',
            descricao: 'Chicletes',
            preco: 2.50,
            estoque: 50,
            img: 'https://http2.mlstatic.com/D_NQ_NP_2X_941045-MLB31840481365_082019-F.jpg'
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

    for (let i = 0; i < dbProdutos.tipo.length; i++) {

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
        initRegisterPage();
    }
}

function getProductIndex(id) {

    for (let i = 0; i < dbProdutos.items.length; i++) {
        if (dbProdutos.items[i].id == id) {
            return i;
        }
    }

    return -1;
}