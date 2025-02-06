// Função para extrair o elemento do DOM de forma simplificada;
const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);

let pizzaHtml = selector(".pizza-area");
let pizzaModal = selector(".pizzaWindowArea");

// Percorre o array de objetos "pizzaJson" e realiza uma ação em cada um deles.
pizzaJson.map( ( {id, name, img, price, sizes, description}, index) => {
    // .cloneNode, clone a estrutura de um documento e todos os descendentes dele.
    let pizzaItem = selector(".models .pizza-item").cloneNode(true);
    
    pizzaItem.querySelector(".pizza-item--img img").src = img;
    pizzaItem.querySelector(".pizza-item-price").innerHTML = `R$ ${price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item-name").innerHTML = name;
    pizzaItem.querySelector(".pizza-item-desc").innerHTML = description;

    // Evento de click para o modal aparecer quando clicar na pizza
    pizzaItem.querySelector("a").addEventListener('click', (event) => {
        event.preventDefault();

        pizzaModal.style.display = "flex";
        pizzaModal.style.opacity = 0;
        setTimeout( () => {
            pizzaModal.style.opacity = 1;
        }, 200)

    });

    // Adiciona o conteúdo das pizzas no "pizzaHtml"
    pizzaHtml.append( pizzaItem );
});