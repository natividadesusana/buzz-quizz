
let tituloDoQuiz;

let urlImagem;

let quantidadePerguntas;

let quantidadeNivel;

let titulosDosNiveis = [];
let porcentagemNiveis = [];
let urlImagemNiveis = [];
let descricaoNiveis = [];
let zero = [];

const pattern = /^https:\/\//i;

// CÓDIGO SUSANA ABAIXO --------------------------------------


// API BuzzQuizz
const urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz';

// todos os quizzes
let allGetQuizzes = [];

// lista sorteada
let userListId = [0, 1, 2, 3];

let levels = []; 
let answers = 0; 
let correct = 0; 
let questions = 0; 


// GET TODOS OS QUIZZES
function getQuizzes() {
    // obtendo todos os quizzes
    const promisseGET = axios.get(`${urlAPI}/quizzes`);
    promisseGET.then(renderingQuizzes); // renderizando todos os quizzes
    promisseGET.catch(errorGetQuizzes);
};


// msgm de erro ao buscar todos os quizzes
function errorGetQuizzes() {
    console.log('ERROR SEARCHING QUIZZES!');
};


// renderizando todos os quizzes
function renderingQuizzes(response) {

    allGetQuizzes = response.data;

    const allQuizzes = document.querySelector('.all-quizzes .quizzes');

    allQuizzes.innerHTML = '';

    for (let i = 0; i < allGetQuizzes.length; i++) {

        let templates = `
            <div class="box-quiz" onclick="goQuizPage(${allGetQuizzes[i].id})">
                <img src="${allGetQuizzes[i].image}" />
                <figcaption>${allGetQuizzes[i].title}</figcaption>
                <div class="background"></div>
            </div>
        `
        allQuizzes.innerHTML = allQuizzes.innerHTML + templates;

    };
};


// GET QUIZZES USUÁRIO
// pega os quizzes do usuário
function getUserQuizzes() {
    let userQuizzes = localStorage.getItem('userQuizzes');

    if (userQuizzes) {
        let listId = JSON.parse(userQuizzes);
        for (let id = 0; id < listId.length; id++) {
            let quiz = listId[id];
            userListId.push(quiz);
        };
    };
    // renderiza a lista de quizzes do usuário
    renderingUserQuizzes();
};


// renderiza quizzes do usuário
function renderingUserQuizzes() {

    if (userListId.length > 0) {
        const listUserQuizzes = document.querySelector('.quizzes');

        listUserQuizzes.innerHTML = '';

        for (let i = 0; i < userListId.length; i++) {
            let idQuizzes = userListId[i];

            const promisseGET = axios.get(`${urlAPI}/quizzes/${idQuizzes}`);
            promisseGET.then((response) => {
                let quizzez = response.data;
                listUserQuizzes.innerHTML +=
                    allYourQuizzes(quizzez.title, quizzez.image, quizzez.id);
            });
        };
    };
};


// retorna todos os seus quizzes 
function allYourQuizzes(idQuizzes, imgUrl, title) {
    return `
    <div class="box-quiz" onclick="goQuizPage()" idQuizzes="${idQuizzes}">
        <img imgUrl='${imgUrl}'/>
        <figcaption>${title}</figcaption>
        <div class="background"></div>
    </div>
    `
};


// verifica se existe algum quizz do usuário, caso não html é mudado
function checkExistsUserQuiz() {
    const noneQuizzesCreated = document.querySelector('.quiz-not-created');
    const quizzesCreated = document.querySelector('.your-quizzes');

    if (localStorage.length === 0) {
        noneQuizzesCreated.classList.remove('hidden');
        quizzesCreated.classList.add('hidden');
    };
    if (localStorage.length != 0) {
        renderingUserQuizzes()
        noneQuizzesCreated.classList.add('hidden');
        quizzesCreated.classList.remove('hidden');
    };
};
checkExistsUserQuiz();


// BUSCANDO QUIZZES CRIADO PELO USER, SE NÃO HOUVER CRIA UM ARRAY VAZIO, SE HOUVER TRANSFORMA STRING EM ARRAY E ADD NO LOCAL STORAGE
function saveLocalStorage(createdId) {
    let userQuizzes;

    if (!localStorage.getItem('userQuizzes')) {
        userQuizzes = [];
    } else {
        userQuizzes = JSON.parse(localStorage.getItem('userQuizzes'));
    };

    userQuizzes.push(createdId);
    localStorage.setItem('userQuizzes', JSON.stringify(userQuizzes));
};


// FUNÇÃO PARA A PROMISE.THEN DO QUIZZES CRIADO
function quizzesCreatedSuccess(response) {
    saveLocalStorage(response.data.id);
    renderSuccessQuizzes(response.data);
};


// VAI P/ TELA 2 DE PÁGINA DE QUIZZES
function goQuizPage() { // Ao clicar sobre o quizz, esta tela deve sumir e dar lugar à Tela 2: Página de um quizz.
    const quizzesListScreen = document.querySelector('.container');
    const quizPage = document.querySelector('.containerQuizPage'); // add a página correta depois. 
    quizzesListScreen.classList.add('hidden');
    quizPage.classList.remove('hidden');
};


// VAI P/ TELA 3 DE CRIAÇÃO DE QUIZZES
function goQuizCreation() { // Ao clicar em "Criar Quizz" ou no "+" essa tela deve sumir, dando lugar à tela de Tela 3: Criação de Quizz.
    const quizzesListScreen = document.querySelector('.container');
    const quizzesCreationScreen = document.querySelector('.containerQuizzesCreation'); // add a página correta depois. 
    quizzesListScreen.classList.add('hidden');
    quizzesCreationScreen.classList.remove('hidden');
};


// BOTÃO REINICIAR QUIZZ
function restartQuizz() {
    // respostas zeradas pro estado inicial
    levels = []; 
    answers = 0; 
    correct = 0; 
    questions = 0; 

    const getHtmlScreen2 = document.querySelector('pegarHtmlTela2'); // add html correto
    getHtmlScreen2.scrollIntoView(); // tela 2 scrollada novamente para o topo
    //add função correta e parâmetro correto
    vaiPraTela2(idDoQuizzCorretoTela2); 
};


// BOTÃO VOLTA PARA HOME
function comeBackHome() {
    // respostas zeradas para o estado inicial
    levels = []; 
    answers = 0; 
    correct = 0; 
    questions = 0; 

    const getHtmlScreen2 = document.querySelector('pegarHtmlTela2'); // add html correto
    getHtmlScreen2.classList.add('hidden'); // esconde tela 2

    const quizzesListScreen = document.querySelector('.container');
    quizzesListScreen.classList.remove('hidden'); // tela 1 aparece novamente
    quizzesListScreen.scrollIntoView(); // tela 1 scrollada para o topo
};


getQuizzes();
renderingQuizzes();
getUserQuizzes();
renderingUserQuizzes();


// CÓDIGO SUSANA ACIMA --------------------------------------



// CÓDIGO TAIS ABAIXO --------------------------------------

function erroValidacaoInfo(i) {

    const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    paragrafo[i].classList.remove("escondido");
}

function erroValidacaoNivel(local) {

    const paragrafo = local.nextElementSibling;
    paragrafo.classList.remove("escondido");
}

function ativaValidacaoNivel(local) {
    const paragrafo = local.nextElementSibling;
    paragrafo.classList.add("escondido");
}

function ativaValidacaoInfo(i) {

    const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    paragrafo[i].classList.add("escondido");
}

function verficaSeTudoFoiPreeenchido(classe) {

    //const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    const paragrafo = document.querySelectorAll(`.${classe} p`);

    console.log(paragrafo);
    const condicao = [];
    for (let i = 0; i < paragrafo.length; i++) {
        if (!(paragrafo[i].classList.contains("escondido"))) {
            condicao.push(paragrafo[i].classList.contains("escondido"))
        }
    }

    if (condicao.length !== 0) {
        return;
    }

    return true;

}

function mudaPagina(local, local2) {

    const tela1 = document.querySelector(`.${local}`);
    const tela2 = document.querySelector(`.${local2}`);

    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");
}

function verificaInfoBasicaQuiz() {

    let string = "";
    string = document.querySelectorAll(".info-basica-quiz input");

    for (let i = 0; i < string.length; i++) {

        switch (i) {

            case 0:
                if (!(20 <= string[i].value.length && string[i].value.length <= 65)) {
                    erroValidacaoInfo(i);
                }
                else {

                    tituloDoQuiz = string[i].value;
                    ativaValidacaoInfo(i);
                }
                break;

            case 1:

                if (!(pattern.test(string[i].value))) {
                    erroValidacaoInfo(i);
                } else {

                    urlImagem = string[i].value;
                    ativaValidacaoInfo(i);
                }
                break;

            case 2:
                if (string[i].value < '3') {
                    erroValidacaoInfo(i);
                } else {

                    quantidadePerguntas = string[i].value;
                    ativaValidacaoInfo(i);
                }
                break;

            case 3:
                if (string[i].value < '2') {
                    erroValidacaoInfo(i);
                } else {

                    quantidadeNivel = string[i].value;
                    ativaValidacaoInfo(i);
                }
                break;
        }

    }

    if (verficaSeTudoFoiPreeenchido("info-basica-quiz")) {
        mudaPagina("tela_3_1", "tela_3_2");
        renderizarPerguntas();
        niveisQuiz();
    }
}

function verificaZero() {

    let novo = [];

    porcentagemNiveis.forEach((num) => {
        if (!novo.includes(num)) {
            novo.push(num);
        }
    });

    for (let i = 0; i < zero.length; i++) {
        if (!(porcentagemNiveis.includes("0")) || novo.length !== porcentagemNiveis.length) {
            erroValidacaoNivel(zero[i]);
        } else {
            ativaValidacaoNivel(zero[i]);
        }
    }
}

function verificaNivelQuiz(input) {

    for (let i = 0; i < input.length; i++) {

        switch (i) {

            case 0:
                if ((input[i].value <= 10)) {
                    erroValidacaoNivel(input[i]);
                } else {
                    ativaValidacaoNivel(input[i]);
                }
                break;

            case 1:
                zero.push(input[i]);
                if ((input[i].value < 0 || input[i].value > 100 || input[i].value === "")) {
                    erroValidacaoNivel(input[i]);
                } else {
                    ativaValidacaoNivel(input[i]);
                }
                break;

            case 2:
                if (!(pattern.test(input[i].value))) {
                    erroValidacaoNivel(input[i]);
                } else {
                    ativaValidacaoNivel(input[i]);
                }
                break;

            case 3:
                if (input[i].value < 30) {
                    erroValidacaoNivel(input[i]);
                } else {
                    ativaValidacaoNivel(input[i]);
                }
                break;

        }
    }

}

function pegaElementosNivelQuiz() {

    titulosDosNiveis = [];
    porcentagemNiveis = [];
    urlImagemNiveis = [];
    descricaoNiveis = [];

    const div = document.querySelectorAll(".barra-animada");
    let input = "";


    for (let i = 0; i < div.length; i++) {

        input = div[i].querySelectorAll("input, textarea");

        for (let j = 0; j < input.length; j++) {

            switch (j) {

                case 0:
                    titulosDosNiveis.push(input[j].value);
                    break;

                case 1:
                    porcentagemNiveis.push(input[j].value);
                    break;

                case 2:
                    urlImagemNiveis.push(input[j].value);
                    break;

                case 3:
                    descricaoNiveis.push(input[j].value);
                    break;
            }
        }

        verificaNivelQuiz(input);
    }



    verificaZero();

    if (verficaSeTudoFoiPreeenchido("niveis")) {
        mudaPagina("tela_3_3");
    }

}

function niveisQuiz() {

    const div = document.querySelector(".niveis-quiz");
    let html = "";

    console.log(quantidadeNivel);

    for (let i = 1; i <= quantidadeNivel; i++) {
        html += `<div class="niveis"> 

                    <div class="titulo">
                        <h2> Nível ${i} </h2> <ion-icon name="create-outline"></ion-icon> 
                    </div>

                    <div class="barra-animada">
                        <input type="text" placeholder="Título do nível">
                        <p class="escondido"> Preencha os dados corretamente </p>
                        <input type="text" placeholder="% de acerto mínima">
                        <p class="escondido"> Preencha os dados corretamente </p>
                        <input type="text" placeholder="URL da imagem do nível">
                        <p class="escondido"> Preencha os dados corretamente </p>
                        <textarea placeholder="Descrição do nível"></textarea>
                        <p class="escondido"> Preencha os dados corretamente </p>
                    </div>
        </div>`
    }

    div.innerHTML = html;

}

// -----------------------------------------------código santiago---------------------------------------

function editarPergunta(elemento) {
    const editando = elemento.nextElementSibling;

    if (editando.classList.contains("escondido") === true) {
        editando.classList.remove("escondido");
    } else {
        editando.classList.add("escondido");
    }
}

function renderizarPerguntas() {
    const listaPerguntas = document.querySelector(".criar-perguntas");

    for (let i = 1; i <= quantidadePerguntas; i++) {
        template = `<li class="pergunta">
        <div onclick="editarPergunta(this)" class="pergunta-reduzida">
            <h1> Pergunta ${i} </h1>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="pergunta-editando escondido">
            <div class="input-duplo">
                <input class="titulo-pergunta" placeholder="Texto da pergunta" />
                <p class="escondido"> Preencha os dados corretamente </p>
                <input class="cor-de-fundo" placeholder="Cor de fundo da pergunta em hexadecimal (#??????)" />
                <p class="escondido"> Preencha os dados corretamente </p>
            </div>
            <h1> Resposta Correta </h1>
            <div class="input-duplo">
                <input class="resposta-correta" placeholder="Resposta correta" />
                <p class="escondido"> Preencha os dados corretamente </p>
                <input class="url-correta" placeholder="URL da Imagem" />
                <p class="escondido"> Preencha os dados corretamente </p>
            </div>
            <h1> Respostas Incorretas </h1>
            <div class="input-duplo incorreta-um">
                <input class="resposta-incorreta-um" placeholder="Resposta incorreta 1" />
                <p class="escondido"> Preencha os dados corretamente </p>
                <input class="url-incorreta-um" placeholder="URL da imagem 1" />
                <p class="escondido"> Preencha os dados corretamente </p>
            </div>
            <div class="input-duplo incorreta-dois">
                <input class="resposta-incorreta-dois" placeholder="Resposta incorreta 2" />
                <p class="escondido"> Preencha os dados corretamente </p>
                <input class="url-incorreta-dois" placeholder="URL da imagem 2" />
                <p class="escondido"> Preencha os dados corretamente </p>
            </div>
            <div class="input-duplo incorreta-tres">
                <input class="resposta-incorreta-tres" placeholder="Resposta incorreta 3" />
                <p class="escondido"> Preencha os dados corretamente </p>
                <input class="url-incorreta-tres" placeholder="URL da imagem 3" />
                <p class="escondido"> Preencha os dados corretamente </p>
            </div>
        </div>
    </li>`;
        listaPerguntas.innerHTML = listaPerguntas.innerHTML + template;
    }
}

function verificaPerguntas() {
    const pattern = /^https:\/\//i;

    let textoPergunta = "";
    textoPergunta = document.querySelectorAll(".titulo-pergunta");

    for (let i = 0; i < textoPergunta.length; i++) {
        const input = textoPergunta[i];
        const paragrafo = input.nextElementSibling;
        if (textoPergunta[i].value.length < 20) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    let corDeFundo = "";
    corDeFundo = document.querySelectorAll(".cor-de-fundo");

    for (let i = 0; i < corDeFundo.length; i++) {
        const input = corDeFundo[i];
        const paragrafo = input.nextElementSibling;
        if (corDeFundo[i].value.length !== 7 || corDeFundo[i].value.indexOf('#') !== 0) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    let respostaCorreta = "";
    respostaCorreta = document.querySelectorAll(".resposta-correta");

    for (let i = 0; i < respostaCorreta.length; i++) {
        const input = respostaCorreta[i];
        const paragrafo = input.nextElementSibling;
        if (respostaCorreta[i].value.length === 0) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    let urlImagemCorreta = "";
    urlImagemCorreta = document.querySelectorAll(".url-correta");

    for (let i = 0; i < urlImagemCorreta.length; i++) {
        const input = urlImagemCorreta[i];
        const paragrafo = input.nextElementSibling;
        if (!(pattern.test(urlImagemCorreta[i].value))) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    let respostaIncorreta1 = "";
    respostaIncorreta1 = document.querySelectorAll(".resposta-incorreta-um");

    for (let i = 0; i < respostaIncorreta1.length; i++) {
        const input = respostaIncorreta1[i];
        const paragrafo = input.nextElementSibling;
        if (respostaIncorreta1[i].value.length == 0) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    let urlImagemIncorreta1 = "";
    urlImagemIncorreta1 = document.querySelectorAll(".url-incorreta-um");

    for (let i = 0; i < urlImagemIncorreta1.length; i++) {
        const input = urlImagemIncorreta1[i];
        const paragrafo = input.nextElementSibling;
        if (!(pattern.test(urlImagemIncorreta1[i].value))) {
            paragrafo.classList.remove("escondido");
        } else {
            paragrafo.classList.add("escondido");
        }
    }

    if (verficaSeTudoFoiPreeenchido("input-duplo")) {
        mudaPagina("tela_3_2", "tela_3_3");
    }
}
// CÓDIGO TAIS ABAIXO --------------------------------------