// Variável para armazenar a quantidade de pizzas de cada modal
let quantidadePizzasModal;

// Função para extrair o elemento do DOM de forma simplificada;
const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);

let pizzaHtml = selector(".pizza-area");
let pizzaModal = selector(".pizzaWindowArea");

// Percorre o array de objetos "pizzaJson" e realiza uma ação em cada um deles.
pizzaJson.map( ( {id, name, img, price, sizes, description}, index) => {
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
        let key = event.target.closest(".pizza-item").getAttribute("data-key");
        let pizza = pizzaJson[key];

        // Informações do modal das pizzas
        selector(".pizzaBig img").src = pizza.img;
        selector(".pizzaInfo h1").innerHTML = pizza.name;
        selector(".pizzaInfo--desc").innerHTML = pizza.description;
        selector(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizza.price.toFixed(2)}`
        selector(".pizzaInfo--size.selected").classList.remove("selected");
        selectorAll(".pizzaInfo--size span").forEach( (size, index) => {
            if( index === 2 ) {
                size.closest(".pizzaInfo--size").classList.add("selected");
            }
            size.innerHTML = sizes[index];
        });
        selector(".pizzaInfo--qt").innerHTML = quantidadePizzasModal;

        // Animação de fade-in para a exibição do modal
        pizzaModal.style.display = "flex";
        pizzaModal.style.opacity = 0;
        setTimeout( () => {
            pizzaModal.style.opacity = 1;
        }, 200)

    });

    // Adiciona o conteúdo das pizzas no "pizzaHtml"
    pizzaHtml.append( pizzaItem );
});

// Eventos MODAL
function closeModal() {
    pizzaModal.style.opacity = 0;
    setTimeout( () => {
        pizzaModal.style.display = "none";
    }, 500);
}