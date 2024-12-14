let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra);
    if(pos < 0){
        tentativas--;  // Reduz o número de tentativas restantes
        carregaImagemForca();
        
        // Atualiza o contador de tentativas no HTML
        document.getElementById("contador-tentativas").innerText = tentativas;

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    // Aplica a classe de sucesso ou erro baseado no título
    if (titulo === "PARABÉNS!") {
        modalBody.classList.add("mensagem-sucesso");
        modalBody.classList.remove("mensagem-erro");
    } else if (titulo === "OPS!") {
        modalBody.classList.add("mensagem-erro");
        modalBody.classList.remove("mensagem-sucesso");
    }

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        // LUGARES
        palavra001 = { nome: "IRLANDA", categoria:"LUGARES" },
        palavra002 = { nome: "EQUADOR", categoria:"LUGARES" },
        palavra003 = { nome: "CHILE", categoria:"LUGARES" },
        palavra004 = { nome: "INDONESIA", categoria:"LUGARES" },
        palavra005 = { nome: "MALDIVAS", categoria:"LUGARES" },
        palavra006 = { nome: "INGLATERRA", categoria:"LUGARES" },
        palavra007 = { nome: "GROELANDIA", categoria:"LUGARES" },
        palavra008 = { nome: "UZBEQUISTAO", categoria:"LUGARES" },
        palavra009 = { nome: "INDONESIA", categoria:"LUGARES" },
        palavra010 = { nome: "CREGUENHEM", categoria:"LUGARES" },
        palavra011 = { nome: "PORTUGAL", categoria:"LUGARES" },
        palavra012 = { nome: "FRANCA", categoria:"LUGARES" },
        palavra013 = { nome: "ESPANHA", categoria:"LUGARES" },
        palavra014 = { nome: "ITALIA", categoria:"LUGARES" },
        palavra015 = { nome: "JAPAO", categoria:"LUGARES" },
        palavra016 = { nome: "AUSTRALIA", categoria:"LUGARES" },
        palavra017 = { nome: "ESTADOS UNIDOS", categoria:"LUGARES" },
        palavra018 = { nome: "CANADA", categoria:"LUGARES" },
        palavra019 = { nome: "RUSSIA", categoria:"LUGARES" },
        palavra020 = { nome: "ALASCA", categoria:"LUGARES" },
        palavra021 = { nome: "EGITO", categoria:"LUGARES" },
        palavra022 = { nome: "ARGELIA", categoria:"LUGARES" },
        palavra023 = { nome: "SUECIA", categoria:"LUGARES" },
        palavra024 = { nome: "TURQUIA", categoria:"LUGARES" },
        palavra025 = { nome: "PAQUISTAO", categoria:"LUGARES" },
        palavra026 = { nome: "ARGENTINA", categoria:"LUGARES" },
        palavra027 = { nome: "BOLIVIA", categoria:"LUGARES" },
        palavra028 = { nome: "BRASIL", categoria:"LUGARES" },
        palavra029 = { nome: "CHINA", categoria:"LUGARES" },
        palavra030 = { nome: "MEXICO", categoria:"LUGARES" },

        // TRANSPORTES
        palavra031 = { nome: "AVIÃO", categoria:"TRANSPORTE" },
        palavra032 = { nome: "BICICLETA", categoria:"TRANSPORTE" },
        palavra033 = { nome: "MOTO", categoria:"TRANSPORTE" },
        palavra034 = { nome: "ONIBUS", categoria:"TRANSPORTE" },
        palavra035 = { nome: "CAVALO", categoria:"TRANSPORTE" },
        palavra036 = { nome: "CARRINHO", categoria:"TRANSPORTE" },
        palavra037 = { nome: "CAMINHÃO", categoria:"TRANSPORTE" },
        palavra038 = { nome: "VANS", categoria:"TRANSPORTE" },
        palavra039 = { nome: "BOTE", categoria:"TRANSPORTE" },
        palavra040 = { nome: "BALÃO", categoria:"TRANSPORTE" },

        // OBJETOS
        palavra041 = { nome: "CADEIRA", categoria:"OBJETOS" },
        palavra042 = { nome: "MESA", categoria:"OBJETOS" },
        palavra043 = { nome: "LIVRO", categoria:"OBJETOS" },
        palavra044 = { nome: "PEN DRIVE", categoria:"OBJETOS" },
        palavra045 = { nome: "CELULAR", categoria:"OBJETOS" },
        palavra046 = { nome: "LÂMPADA", categoria:"OBJETOS" },
        palavra047 = { nome: "MÁQUINA", categoria:"OBJETOS" },
        palavra048 = { nome: "CADERNO", categoria:"OBJETOS" },
        palavra049 = { nome: "TELEVISÃO", categoria:"OBJETOS" },
        palavra050 = { nome: "RELOGIO", categoria:"OBJETOS" },

        // ALIMENTOS
        palavra051 = { nome: "PIZZA", categoria:"ALIMENTOS" },
        palavra052 = { nome: "BURGER", categoria:"ALIMENTOS" },
        palavra053 = { nome: "PASTEL", categoria:"ALIMENTOS" },
        palavra054 = { nome: "SUSHI", categoria:"ALIMENTOS" },
        palavra055 = { nome: "SORVETE", categoria:"ALIMENTOS" },
        palavra056 = { nome: "PÃO", categoria:"ALIMENTOS" },
        palavra057 = { nome: "CERVEJA", categoria:"ALIMENTOS" },
        palavra058 = { nome: "ALFACE", categoria:"ALIMENTOS" },
        palavra059 = { nome: "LARANJA", categoria:"ALIMENTOS" },
        palavra060 = { nome: "CARNE", categoria:"ALIMENTOS" },

        // ANIMAIS
        palavra061 = { nome: "LEÃO", categoria:"ANIMAIS" },
        palavra062 = { nome: "TIGRE", categoria:"ANIMAIS" },
        palavra063 = { nome: "ELEFANTE", categoria:"ANIMAIS" },
        palavra064 = { nome: "CAVALO", categoria:"ANIMAIS" },
        palavra065 = { nome: "PATO", categoria:"ANIMAIS" },
        palavra066 = { nome: "CACHORRO", categoria:"ANIMAIS" },
        palavra067 = { nome: "GATO", categoria:"ANIMAIS" },
        palavra068 = { nome: "RATO", categoria:"ANIMAIS" },
        palavra069 = { nome: "CORVO", categoria:"ANIMAIS" },
        palavra070 = { nome: "GALINHA", categoria:"ANIMAIS" },

        // TV E CINEMA
        palavra071 = { nome: "FRIENDS", categoria:"TV E CINEMA" },
        palavra072 = { nome: "VINGADORES", categoria:"TV E CINEMA" },
        palavra073 = { nome: "BATMAN", categoria:"TV E CINEMA" },
        palavra074 = { nome: "SPIDERMAN", categoria:"TV E CINEMA" },
        palavra075 = { nome: "SUPERMAN", categoria:"TV E CINEMA" },
        palavra076 = { nome: "CINDERELA", categoria:"TV E CINEMA" },
        palavra077 = { nome: "MONSTROS S.A.", categoria:"TV E CINEMA" },
        palavra078 = { nome: "HARRY POTTER", categoria:"TV E CINEMA" },
        palavra079 = { nome: "LEÃO REI", categoria:"TV E CINEMA" },
        palavra080 = { nome: "STAR WARS", categoria:"TV E CINEMA" },

        // Adicionar o resto das palavras aqui
    ];
}

function exibirPerfil() {
    // Obter o nome digitado
    const nomeUsuario = document.getElementById('nomeUsuario').value;

    // Verificar se o nome foi digitado
    if (nomeUsuario.trim() !== "") {
        // Exibir o perfil
        document.getElementById('perfil').style.display = 'block';

        // Definir o nome no perfil
        document.getElementById('nome-perfil').textContent = nomeUsuario;
    } else {
        alert("Por favor, insira um nome.");
    }
}


function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}

async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
        document.getElementById("jogarNovamente").classList.add("botao-blink");

        await new Promise(resolve => setTimeout(resolve, 2000));

        document.getElementById("jogarNovamente").classList.remove("botao-blink");
        document.getElementById("jogarNovamente").style.display = "none";   
    }
}
