let votoPara = document.querySelector("#votoPara span");
let cargo = document.querySelector("#cargo");
let descricao = document.querySelector("#descricao")
let aviso = document.querySelector("#aviso");
let candidatos = document.querySelector("#candidatos");
let numeros = document.querySelector("#numeros");

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    
        for(let i = 0; i<etapa.numeros ; i++){
            if(i === 0) {
                numerosHtml += '<div class="numero animate-pisca inline-block h-14 w-12 border border-black text-center leading-[48px] text-2xl"></div>';
            }else {
                numerosHtml += '<div class="numero inline-block h-14 w-12 border border-black text-center leading-[48px] text-2xl"></div>';
            }
        }

        votoPara.style.display = 'none';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML = '';
        aviso.style.display = 'none';
        candidatos.innerHTML = '';
        numeros.innerHTML = numerosHtml;
}

function atualizaInterface() {
    alert("Finalizou a digitação do voto!");
}

function clicou(number){
    let elementNumber = document.querySelector(".numero.animate-pisca");
    if(elementNumber !== null){
        elementNumber.innerHTML = number;
        numero = `${numero}${number}`;

        elementNumber.classList.remove("animate-pisca");
        if(elementNumber.nextElementSibling !== null) {
            elementNumber.nextElementSibling.classList.add("animate-pisca");
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    alert("Clicou em BRANCO!");
}

function corrige() {
    alert("Clicou em Redefinir!");
}

function confirmar() {
    alert("Voto CONFIRMADO!");
}

comecarEtapa();
