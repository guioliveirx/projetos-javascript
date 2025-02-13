// Variável para armazenar a quantidade de pizzas de cada modal
let quantidadePizzasModal;

// Variável para armazenar todas as informações do modal
let cart = [];

// Variável para armazenar o index da pizza
let key;

// Função para extrair o elemento do DOM de forma simplificada;
const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);

let pizzaHtml = selector(".pizza-area");
let pizzaModal = selector(".pizzaWindowArea");

// Percorre o array de objetos "pizzaJson" e realiza uma ação em cada um deles.
pizzaJson.map(({ id, name, img, price, sizes, description }, index) => {
    // .cloneNode, clone a estrutura de um documento e todos os descendentes dele.
    let pizzaItem = selector(".models .pizza-item").cloneNode(true);

    // Adiciona um atributo de informação na div
    pizzaItem.setAttribute("data-key", index);

    // Informações dos cards das pizzas
    pizzaItem.querySelector(".pizza-item--img img").src = img;
    pizzaItem.querySelector(".pizza-item-price").innerHTML = `R$ ${price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item-name").innerHTML = name;
    pizzaItem.querySelector(".pizza-item-desc").innerHTML = description;

    // Evento de click para o modal aparecer quando clicar na pizza
    pizzaItem.querySelector("a").addEventListener('click', (event) => {
        event.preventDefault();

        quantidadePizzasModal = 1;
        key = event.target.closest(".pizza-item").getAttribute("data-key");
        let pizza = pizzaJson[key];

        // Informações do modal das pizzas
        selector(".pizzaBig img").src = pizza.img;
        selector(".pizzaInfo h1").innerHTML = pizza.name;
        selector(".pizzaInfo--desc").innerHTML = pizza.description;
        selector(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizza.price.toFixed(2)}`
        selector(".pizzaInfo--size.selected").classList.remove("selected");
        selectorAll(".pizzaInfo--size span").forEach((size, index) => {
            if (index === 2) {
                size.closest(".pizzaInfo--size").classList.add("selected");
            }
            size.innerHTML = sizes[index];
        });
        selector(".pizzaInfo--qt").innerHTML = quantidadePizzasModal;

        // Animação de fade-in para a exibição do modal
        pizzaModal.style.display = "flex";
        pizzaModal.style.opacity = 0;
        setTimeout(() => {
            pizzaModal.style.opacity = 1;
        }, 200)

    });

    // Adiciona o conteúdo das pizzas no "pizzaHtml"
    pizzaHtml.append(pizzaItem);
});

// Eventos MODAL
function closeModal() {
    pizzaModal.style.opacity = 0;
    setTimeout(() => {
        pizzaModal.style.display = "none";
    }, 500);
}

function onClickOutside() {
    return (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
}

selector(".pizzaWindowArea").addEventListener("click", onClickOutside());

// Botão de diminuir a quantidade
selector(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (quantidadePizzasModal > 1) {
        quantidadePizzasModal--;
    }
    selector(".pizzaInfo--qt").innerHTML = quantidadePizzasModal;
})

// Botão de aumentar a quantidade
selector(".pizzaInfo--qtmais").addEventListener("click", () => {
    quantidadePizzasModal++;
    selector(".pizzaInfo--qt").innerHTML = quantidadePizzasModal;
})

// Botões de tamanho da pizza
selectorAll(".pizzaInfo--size").forEach((size, index) => {
    // adiciona evento de click para todos os tamanhos
    size.addEventListener("click", () => {
        // Remove o elemento previamente selecionado e adiciona no elemento clicado
        selector(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
    });
});

// Botão de adicionar ao carrinho
selector(".pizzaInfo--addButton").addEventListener("click", () => {
    let keySize = parseInt(selector(".pizzaInfo--size.selected").getAttribute("data-key"));
    // Cria uma idenficação única para cada pizza do array "cart";
    let identifier = pizzaJson[key].id + "@" + keySize;
    // Verifica se a pizza que o usuario está adicionando é igual a alguma que já foi adicionada
    let verify = cart.findIndex((item) => item.identifier == identifier);

    // Caso encontre, suas quantidades serão somadas, caso contrário, sera adicionada ao array "cart"
    if (verify > -1) {
        cart[verify].amount += quantidadePizzasModal;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[key].id,
            size: keySize,
            amount: quantidadePizzasModal
        });
    }

    // Atualiza e fecha o carrinho
    updateCart();
    closeModal();
});

// Exibe o conteudo do carrinho quando clicado no mobile
selector(".menu-openner").addEventListener("click", () => {
    if(cart.length > 0){
        selector("aside").style.left = 0;
    }
});

// Fecha o conteudo do carrinho quando clicado no mobile
selector(".menu-closer").addEventListener("click", () => selector("aside").style.left = "100vw");

function updateCart() {
    // Atualiza a quantidade no carrinho Mobile
    selector(".menu-openner span").innerHTML = cart.length;

    if( cart.length > 0 ) {
        selector("aside").classList.add("show");
        selector(".cart").innerHTML = '';

        let subtotal = 0;
        let total = 0;
        let desconto = 0;

        cart.map( (pizza, index) => {

            let pizzaItem = pizzaJson.find((item) => item.id == pizza.id);
            subtotal += pizzaItem.price * pizza.amount;
            let cartItem = selector(".models .cart--item").cloneNode(true);
            let pizzaSize;
            switch(pizza.size){
                case 0 :
                    pizzaSize = "P"
                    break;
                case 1 :
                    pizzaSize = "M";
                    break;
                case 2 :
                    pizzaSize = "G";
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSize})`

            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
            cartItem.querySelector(".cart--item--qt").innerHTML = pizza.amount;
            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
                pizza.amount ++;
                updateCart();
            });
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                if(pizza.amount > 1){
                    pizza.amount --;
                }else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            selector(".cart").append(cartItem);
        });

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        selector(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selector(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
        selector(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
    }else {
        selector("aside").classList.remove("show");
        selector("aside").style.left = "100vw";
    }
}