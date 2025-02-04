let votoPara = document.querySelector("#votoPara span");
let cargo = document.querySelector("#cargo");
let descricao = document.querySelector("#descricao")
let aviso = document.querySelector("#aviso");
let imagemCandidatos = document.querySelector("#candidatos");
let numeros = document.querySelector("#numeros");

let etapaAtual = 0;
let numero = '';
let votoEmBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    numero = '';
    votoEmBranco = false;
    numeros.classList.add("block");
    numeros.classList.remove("hidden");

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numerosHtml += '<div class="numero animate-pisca inline-block h-14 w-12 border border-black text-center leading-[48px] text-2xl"></div>';
        } else {
            numerosHtml += '<div class="numero inline-block h-14 w-12 border border-black text-center leading-[48px] text-2xl"></div>';
        }
    }

    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    imagemCandidatos.classList.remove("block");
    imagemCandidatos.classList.add("hidden");
    numeros.innerHTML = numerosHtml;
}

// Atualiza a interface com as informações do candidato selecionado
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        votoPara.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome} </br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';

        // Itera sobre as fotos do candidato e cria o HTML para exibi-las
        for (let item of candidato.fotos) {
            if (item.small) {
                fotosHtml += `<div class="border border-slate-900 text-center w-full">
                            <img class="w-full" src=${item.url} alt=${item.legenda}>
                            ${item.legenda}</div>`;
            } else {
                fotosHtml += `<div class="border border-slate-900 text-center w-full">
                            <img class="w-full" src=${item.url} alt=${item.legenda}>
                            ${item.legenda}</div>`;
            }
        }

        // Exibe as fotos do candidato
        imagemCandidatos.classList.add("block");
        imagemCandidatos.classList.remove("hidden");
        imagemCandidatos.innerHTML = fotosHtml;
    } else {
        // Se nenhum candidato for encontrado, exibe "VOTO NULO"
        votoPara.style.display = "block";
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="animate-pisca text-2xl font-bold">VOTO NULO!</div>`;
    }
}

function clicou(number) {
    let elementNumber = document.querySelector(".numero.animate-pisca");
    if (elementNumber !== null) {
        elementNumber.innerHTML = number;
        numero = `${numero}${number}`;

        elementNumber.classList.remove("animate-pisca");
        if (elementNumber.nextElementSibling !== null) {
            elementNumber.nextElementSibling.classList.add("animate-pisca");
        } else {
            atualizaInterface();
        }
    }
}

// Função para votar em branco
function branco() {
    numero = ''; // Limpa o número digitado
    votoEmBranco = true; // Marca o voto como em branco
    votoPara.style.display = "block";
    aviso.style.display = 'block';
    descricao.innerHTML = `<div class="animate-pisca text-3xl font-bold text-center">VOTO EM BRANCO!</div>`;
    numeros.classList.remove("block");
    numeros.classList.add("hidden");
    imagemCandidatos.classList.add("hidden");
}

// Função para corrigir o voto
function corrige() {
    comecarEtapa(); // Reinicia a etapa atual
}

// Função para confirmar o voto
function confirmar() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoEmBranco === true) {
        votoConfirmado = true;
        console.log("confirmando voto");
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("confirmando voto");
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector("#tela").innerHTML = `<div class="animate-pisca text-6xl font-bold flex justify-center items-center h-full">FIM!</div>`
        }
    }
}

comecarEtapa();
