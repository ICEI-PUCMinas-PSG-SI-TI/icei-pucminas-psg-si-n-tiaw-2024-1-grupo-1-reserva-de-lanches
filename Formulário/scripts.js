document.addEventListener("DOMContentLoaded", function() {
    const container = document.createElement('div');
    container.classList.add('container');

    const heading = document.createElement('h1');
    heading.textContent = 'PEDIDOS';

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = 'https://www.perdigao.com.br/assets/_images/654bfd759bf743d8e6e420cd097f94745da24bc7.png';
    productImage.width = 400;
    productImage.alt = 'Hambúrguer';

    const productDescription = document.createElement('p');
    productDescription.id = 'product-description';
    productDescription.textContent = 'HAMBÚRGUER: Nosso hambúrguer é um lanche irresistível e cuidadosamente elaborado. Composto por: Pão, bife de carne bovina grelhado, milho, batata palha, cheddar, alface, tomate e maionese. Uma combinação perfeita de sabores e texturas que irá deliciar o seu paladar.';

    const priceLabel = document.createElement('span');
    priceLabel.textContent = 'R$ 12,00';

    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', 'quantity');
    quantityLabel.textContent = 'Quantidade:';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = 'quantity';
    quantityInput.name = 'quantity';
    quantityInput.min = 1;
    quantityInput.max = 5;
    quantityInput.value = 1;

    const observationsLabel = document.createElement('label');
    observationsLabel.setAttribute('for', 'observations');
    observationsLabel.textContent = 'Observações:';

    const observationsTextarea = document.createElement('textarea');
    observationsTextarea.id = 'observations';
    observationsTextarea.name = 'observations';
    observationsTextarea.rows = 4;
    observationsTextarea.placeholder = 'Ex: Sem cheddar, com mais maionese...';

    const saveButton = document.createElement('button');
    saveButton.id = 'save-button';
    saveButton.textContent = 'Adicionar ao carrinho';
    saveButton.addEventListener('click', function() {
        window.location.href = 'carrinho.html'; 
    });

    quantityInput.addEventListener('input', function() {
        updateTotal();
    });

    function updateTotal() {
        const totalPrice = parseFloat(quantityInput.value) * 12; 
        priceLabel.textContent = `R$ ${totalPrice.toFixed(2)}`;
    }

    productCard.appendChild(productImage);
    productCard.appendChild(productDescription);
    productCard.appendChild(priceLabel);
    productCard.appendChild(quantityLabel);
    productCard.appendChild(quantityInput);
    productCard.appendChild(observationsLabel);
    productCard.appendChild(observationsTextarea);
    productCard.appendChild(saveButton);
    container.appendChild(heading);
    container.appendChild(productCard);

    document.getElementById('app').appendChild(container);
    updateTotal(); 
});
