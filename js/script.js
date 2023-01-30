
let tituloDoQuiz;

let urlImagem;

let quantidadePerguntas;

let quantidadeNivel;

let titulosDosNiveis = [];
let porcentagemNiveis = [];
let urlImagemNiveis = [];
let descricaoNiveis = [];
let zero = [];

let travaTela = false;

let respostasEscolhidas = [];

let armazenaCorretas = [];

const pattern = /^https:\/\//i;

// CÓDIGO SUSANA ABAIXO --------------------------------------


// API BuzzQuizz
const urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz';

// todos os quizzes
let allGetQuizzes = [];

// lista sorteada
let userListId = [];

let levels = [];
let answers = 0;
let correct = 0;
let questions = 0;

let quantidadePerguntasQuiz;
let cont = 0;

let objetoQuiz = [];
let acertos = 0;

const loadingQuizzes = document.querySelector(".load-user-quiz");
const loadingUserQuizzes = document.querySelector(".load-quiz");
const loadingQuizPage = document.querySelector(".load-quiz-page");



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

    if(userListId === localStorage) {
        allGetQuizzes.remove(userListId)
    }

    allGetQuizzes = response.data;
    console.log(response.data);

    // allGetQuizzes.filter(userListId => (
    //     allGetQuizzes.indexOf(userListId.id) 
    // ))

    const allQuizzes = document.querySelector('.all-quizzes .quizzes');

    allQuizzes.innerHTML = '';

    for (let i = 0; i < allGetQuizzes.length; i++) {
        if(!userListId.includes(allGetQuizzes[i].id)){

            let templates = `
                <div class="box-quiz">
                    <img onclick="goQuizPage(${allGetQuizzes[i].id},'main-container','tela_2')" src="${allGetQuizzes[i].image}" />
                    <figcaption>${allGetQuizzes[i].title}</figcaption>
                    <div class="background"></div>
                </div>
            `
            allQuizzes.innerHTML = allQuizzes.innerHTML + templates;

        }
    };

    travaTela = false;

    /*console.log("Quizzes do Usuario");
    let userQuizzes = localStorage.getItem('id');

    if (userQuizzes) {
        let listId = JSON.parse(userQuizzes);
        console.log(listId);
        for (let id = 0; id < listId.length; id++) {
            let quiz = listId[id];
            userListId.push(quiz);
        };
    };
    console.log(userListId);*/
    loadingQuizzes.classList.add("escondido");
};

// verifica se existe algum quizz do usuário, caso não html é mudado
function checkExistsUserQuiz() {
    const noneQuizzesCreated = document.querySelector('.quiz-not-created');
    const quizzesCreated = document.querySelector('.your-quizzes');

    if (localStorage.length === 0) {
        noneQuizzesCreated.classList.remove('hidden');
        quizzesCreated.classList.add('hidden');
    };
    if (localStorage.length !== 0) {
        renderingUserQuizzes()
        noneQuizzesCreated.classList.add('hidden');
        quizzesCreated.classList.remove('hidden');
    };
};
checkExistsUserQuiz();

// GET QUIZZES USUÁRIO
// pega os quizzes do usuário
function getUserQuizzes() {
    let userQuizzes = localStorage.getItem('id');

    if (userQuizzes) {
        let listId = JSON.parse(userQuizzes);
        console.log(listId);
        for (let id = 0; id < listId.length; id++) {
            let quiz = listId[id];
            userListId.push(quiz);
        };
    };

    console.log(userListId);
    // renderiza a lista de quizzes do usuário
    renderingUserQuizzes();

};


// renderiza quizzes do usuário
function renderingUserQuizzes() {

    if (userListId.length > 0) {
        const listUserQuizzes = document.querySelector('.your-quizzes .quizzes');

        listUserQuizzes.innerHTML = '';

        for (let i = 0; i < userListId.length; i++) {
            let idQuizzes = userListId[i];

            const promisseGET = axios.get(`${urlAPI}/quizzes/${idQuizzes}`);
            promisseGET.then((response) => {
                let quizzez = response.data;
                listUserQuizzes.innerHTML += 
                `
                <div class="box-quiz">
                    <img onclick="goQuizPage(${quizzez.id},'main-container','tela_2')" style="z-index: 1;" src='${quizzez.image}'/>
                    <div style="z-index:2;" class="optionsQuizzes">
                        <ion-icon onclick="editQuizzes(this, ${quizzez.id})" name="create-outline"></ion-icon>
                        <ion-icon onclick="deletingQuizzes(this)" name="trash-outline"></ion-icon>
                    </div>
                    <figcaption>${quizzez.title}</figcaption>
                    <div class="background"></div>
                </div>
                `
            });
        };
    };
    loadingUserQuizzes.classList.add("escondido");
};

// allYourQuizzes(quizzez.id, quizzez.image, quizzez.title);

// retorna todos os seus quizzes 
// function allYourQuizzes(idQuizzes, imgUrl, title) {
//     let htmlQuizzez = `
//     <div class="box-quiz" onclick="goQuizPage()" idQuizzes="${idQuizzes}">
//         <img style="z-index: 1;" imgUrl='${imgUrl}'/>
//         <div style="z-index:2;" class="optionsQuizzes">
//             <ion-icon onclick="editQuizzes(this)" name="create-outline"></ion-icon>
//             <ion-icon onclick="deletingQuizzes(this)" name="trash-outline"></ion-icon>
//         </div>
//         <figcaption>title=${title}</figcaption>
//         <div class="background"></div>
//     </div>
//     `
//     return htmlQuizzez;
// };

function deletingQuizzes(id) {
    let KEY_QUIZZES = 'userQuizzes';
    let userQuizzes = JSON.parse(localStorage.getItem(KEY_QUIZZES));
    let validId = false;
    let storageIndex = 0;

    for (let index = 0; index < userQuizzes; index++) {
        let quizzesID = userQuizzes[index].id;
        if (id === quizzesID) {
            validId = true;
            storageIndex = index;
        }
    }
    if (validId) {
        let key = userQuizzes[storageIndex].secretKey;
        let header = { headers: { 'Secret-Key': key } };
        if (confirm('Deletar esse Quiz?')) {
            let promise = axios.delete(`${urlAPI}/quizzes/${id}`, header);
            userQuizzes.splice(storageIndex, 1);
            localStorage.setItem(KEY_QUIZZES, JSON.stringify(userQuizzes));
            promise.then(alert('Quiz deletado!'));
            window.location.reload();
        } else {
            alert('Quiz selecionado não existe registro!')
        }
    }
}

let editId, editKey;

function abrirEdition(response){
    console.log(response);
}

function erroEdition(response){
    console.log("Deu errooooo")
    console.log(response);
}

function editQuizzes(botao,id) {
    let KEY_QUIZZES = 'userQuizzes';
    let userQuizzes = JSON.parse(localStorage.getItem("id"));
    let editQuiz;
    
    console.log(botao);
    console.log(userQuizzes);
    console.log(allGetQuizzes);
    
    let validId = false;
    let storageIndex = 0;

    console.log(id);


    
    
    for (let index = 0; index < allGetQuizzes.length; index++) {
        if (allGetQuizzes[index].id === id) {
            validId = true;
            /*storageIndex = index;*/
            editQuiz = allGetQuizzes[index];
            console.log(editQuiz);
        }
    }

   if (validId) {

        editQuiz.title = "Phineas e Ferb Lindos";
        const novo = editQuiz.title;

        console.log(novo);

       // axios.put(`http://jsonplaceholder.typicode.com/posts/${id}`,{title})

        const editarQuiz = axios.put(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, {editQuiz});
        /*let key = userQuizzes[storageIndex].secretKey;
        editKey = { headers: { 'Secret-Key': key } };
        //criarQuiz(id);
        editarQuiz.then(abrirEdition);
        editarQuiz.catch(erroEdition);*/

    } else {
        alert('Quiz selecionado não existe registro!')
    }
}

function allYourQuizzes(title, imgUrl, idQuizzes) {
    return `
    <div class="box-quiz" idQuizzes="${idQuizzes}">
        <img onclick="goQuizPage(${idQuizzes},'main-container','tela_2')" imgUrl='${imgUrl}'/>
        <figcaption>${title}</figcaption>
        <div class="background"></div>
    </div>
    `
};



function getNivel(acertos) {

    const local = document.querySelector(".tela_2");
    const niveis = objetoQuiz.levels;
    let html = "";

    let calc = Math.floor((100 * acertos) / quantidadePerguntasQuiz);

    let tituloNivel;
    let imgNivel;
    let textoNivel;

    console.log(niveis);
    console.log(calc);

    for (let i = 0; i < niveis.length; i++) {
        if (calc >= niveis[i].minValue) {
            tituloNivel = niveis[i].title;
            imgNivel = niveis[i].image;
            textoNivel = niveis[i].text;
        }
    }

    html += `<div class = "exibe-nivel">
                <div class = "titulo-nivel">
                    <h1> ${tituloNivel} </h1>
                </div>

                <div class="corpo-nivel">
                    <img class = "imagem-nivel" src="${imgNivel}" alt="">
                    <div class="paragrafo-nivel"> <p class="texto-nivel"> ${textoNivel} </p> </div>
                </div>

                <div class = "botoes-nivel">
                    <button onclick="restartQuizz()" class="botao-reinicio"> Reiniciar Quiz </button>
                    <button onclick="comeBackHome()" class="voltarHome"> Voltar pra Home </button>
                </div>

            </div>`

    local.innerHTML += html;

    console.log(local);

    console.log(tituloNivel);
    console.log(imgNivel);
    console.log(textoNivel);

    travaTela = false;
    cont = 0;


}


function selecionaResposta(getEscolhida) {

    let answersChoose;
    let nome;
    let aux = 0;

    cont++;
    console.log(cont);

    if (travaTela === false) {
        answersChoose = getEscolhida;
        respostasEscolhidas.push(answersChoose);
        travaTela = true;
    }

    if (getEscolhida !== answersChoose) {
        return;
    }

    let father = answersChoose.parentNode.parentNode.nextElementSibling;
    console.log(father);

    for (let i = 0; i < answersChoose.parentNode.children.length; i++) {

        nome = answersChoose.parentNode.children[i].querySelector("p").innerText;


        if (answersChoose.parentNode.children[i] !== answersChoose) {

            answersChoose.parentNode.children[i].querySelector("img").classList.add("esbranquicado");
            answersChoose.parentNode.children[i].removeAttribute("onclick");

            if (nome !== armazenaCorretas[cont - 1] || aux === 1) {
                answersChoose.parentNode.children[i].querySelector("p").classList.add("muda-vermelho");
            } else {
                aux = 1;
                answersChoose.parentNode.children[i].querySelector("p").classList.add("muda-verde");
            }
        } else {

            if (nome !== armazenaCorretas[cont - 1] || aux === 1) {
                answersChoose.parentNode.children[i].querySelector("p").classList.add("muda-vermelho");
            } else {

                aux = 1;
                acertos++;
                answersChoose.parentNode.children[i].querySelector("p").classList.add("muda-verde");
            }
            answersChoose.parentNode.children[i].removeAttribute("onclick");
        }

    }

    if (cont != 3) {
        setTimeout(() => {
            answersChoose.parentNode.parentNode.nextElementSibling.scrollIntoView()
            travaTela = false;
        }, 2000);
    } else {

        console.log("Buscando o nível")
        setTimeout(() => {
            getNivel(acertos);
            const local = document.querySelector(".exibe-nivel");
            local.scrollIntoView();
        }, 2000);

    }
}


function getPerguntas(objetoQuiz) {

    const local = document.querySelector(".exibe-perguntas");
    let html = "";
    let respostas = [];

    console.log(objetoQuiz);

    quantidadePerguntasQuiz = objetoQuiz.questions.length;

    for (let i = 0; i < objetoQuiz.questions.length; i++) {

        html += `<div class="questions"> 
                    <div class ="title-question" style = "background-color:${objetoQuiz.questions[i].color}"> 
                        <h1> ${objetoQuiz.questions[i].title} </h1>
                    </div>
                    <div class="organiza-resposta">`


        for (let j = 0; j < objetoQuiz.questions[i].answers.length; j++) {

            respostas.push([objetoQuiz.questions[i].answers[j].image, objetoQuiz.questions[i].answers[j].text])
            if (objetoQuiz.questions[i].answers[j].isCorrectAnswer === true) {
                armazenaCorretas.push(objetoQuiz.questions[i].answers[j].text);
            }
        }

        respostas.sort(() => { return Math.random() - 0.5; });

        console.log(respostas);

        for (let k = 0; k < respostas.length; k++) {

            html += `<div onclick="selecionaResposta(this)" class = "exibe-resposta">`
            for (let w = 0; w < respostas[k].length; w++) {

                switch (w) {

                    case 0:
                        html += `<img src="${respostas[k][w]}" alt="">`
                        break;

                    case 1:
                        html += `<div class="paragrafo-resposta"> <p> ${respostas[k][w]} </p> </div>
                        </div>`
                        break;
                }
            }
        }

        html += `</div> 
                    </div>`;

        respostas = [];

    }

    local.innerHTML = html;
}

// VAI P/ TELA 2 DE PÁGINA DE QUIZZES

function goQuizPage(quizEscolhido, local, local2) { // Ao clicar sobre o quizz, esta tela deve sumir e dar lugar à Tela 2: Página de um quizz.

    /*mudaPagina("main-container", "tela_2");*/
    mudaPagina(local,local2);

    console.log(quizEscolhido);
    console.log(allGetQuizzes);

    for (let i = 0; i < allGetQuizzes.length; i++) {
        if (allGetQuizzes[i].id === quizEscolhido) {
            objetoQuiz = allGetQuizzes[i];
        }
    }

    console.log(objetoQuiz);

    const imgQuiz = document.querySelector(".banner");
    const tituloObjeto = document.querySelector(".texto-banner");

    imgQuiz.src = objetoQuiz.image;
    tituloObjeto.innerHTML = objetoQuiz.title;

    loadingQuizPage.classList.add("escondido");
    getPerguntas(objetoQuiz);
}



// VAI P/ TELA 3 DE CRIAÇÃO DE QUIZZES
function goQuizCreation() { // Ao clicar em "Criar Quizz" ou no "+" essa tela deve sumir, dando lugar à tela de Tela 3: Criação de Quizz.
    const quizzesListScreen = document.querySelector('.container');
    const quizzesCreationScreen = document.querySelector('.containerQuizzesCreation'); // add a página correta depois. 
    quizzesListScreen.classList.add('hidden');
    quizzesCreationScreen.classList.remove('hidden');
};


// BOTÃO REINICIAR QUIZZ
/*function restartQuizz() {
    // respostas zeradas pro estado inicial
    levels = []; 
    answers = 0; 
    correct = 0; 
    questions = 0; 

    const getHtmlScreen2 = document.querySelector('pegarHtmlTela2'); // add html correto

    getHtmlScreen2.scrollIntoView(); // tela 2 scrollada novamente para o topo
    //add função correta e parâmetro correto
    
};*/


// BOTÃO VOLTA PARA HOME
/*function comeBackHome() {
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
};*/

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

    window.scrollTo(0, 0);

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
        mudaPagina("tela_3_3", "tela_3_4");
        criarQuiz();
    }

}

function editarNivel(elemento) {

    const editando = elemento.nextElementSibling;

    if (editando.classList.contains("escondido") === true) {
        editando.classList.remove("escondido");
    }
}

function niveisQuiz() {

    const div = document.querySelector(".niveis-quiz");
    let html = "";

    console.log(quantidadeNivel);

    for (let i = 1; i <= quantidadeNivel; i++) {
        html += `<div class="niveis"> 

                    <div onclick="editarNivel(this)" class="titulo">
                        <h2> Nível ${i} </h2> <ion-icon name="create-outline"></ion-icon> 
                    </div>

                    <div class="barra-animada escondido">
                        <input class="nivel-titulo" type="text" placeholder="Título do nível">
                        <p class="escondido"> Deve ter no mínimo 10 caracteres </p>
                        <input class="nivel-acerto" type="text" placeholder="% de acerto mínima">
                        <p class="escondido"> Número entre 0 e 100 (pelo menos um deve ser 0) </p>
                        <input class="nivel-url" type="text" placeholder="URL da imagem do nível">
                        <p class="escondido"> Deve ter formato de URL </p>
                        <textarea class="nivel-descricao" placeholder="Descrição do nível"></textarea>
                        <p class="escondido"> Deve ter um mínimo de 30 caracteres </p>
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
                <p class="escondido"> Deve ter no mínimo 20 caracteres </p>
                <input class="cor-de-fundo" placeholder="Cor de fundo da pergunta" />
                <p class="escondido"> Deve ser uma cor em hexadecimal (#??????) </p>
            </div>
            <h1> Resposta Correta </h1>
            <div class="input-duplo">
                <input class="resposta-correta" placeholder="Resposta correta" />
                <p class="escondido"> Não pode estar vazio </p>
                <input class="url-correta" placeholder="URL da Imagem" />
                <p class="escondido"> Deve ter formato de URL </p>
            </div>
            <h1> Respostas Incorretas </h1>
            <div class="input-duplo incorreta-um">
                <input class="resposta-incorreta-um" placeholder="Resposta incorreta 1" />
                <p class="escondido"> Não pode estar vazio </p>
                <input class="url-incorreta-um" placeholder="URL da imagem 1" />
                <p class="escondido"> Deve ter formato de URL </p>
            </div>
            <div class="input-duplo incorreta-dois">
                <input class="resposta-incorreta-dois" placeholder="Resposta incorreta 2" />
                <p class="escondido"> Não pode estar vazio </p>
                <input class="url-incorreta-dois" placeholder="URL da imagem 2" />
                <p class="escondido"> Deve ter formato de URL </p>
            </div>
            <div class="input-duplo incorreta-tres">
                <input class="resposta-incorreta-tres" placeholder="Resposta incorreta 3" />
                <p class="escondido"> Não pode estar vazio </p>
                <input class="url-incorreta-tres" placeholder="URL da imagem 3" />
                <p class="escondido"> Deve ter formato de URL </p>
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
        const validaCor = corDeFundo[i].value.toLowerCase().substring(1, 7);
        const regexp = /[G-Z]/gi;
        const matches_array = validaCor.match(regexp);
        if (corDeFundo[i].value.length !== 7 || corDeFundo[i].value.indexOf('#') !== 0 || matches_array !== null) {
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

function criaObjetoQuiz() {

    function arrayPerguntas() {

        function arrayRespostas() {

            const corretaTexto = document.querySelectorAll(".resposta-correta");
            const corretaURL = document.querySelectorAll(".url-correta");

            const incorretaTexto1 = document.querySelectorAll(".resposta-incorreta-um");
            const incorretaURL1 = document.querySelectorAll(".url-incorreta-um");

            const incorretaTexto2 = document.querySelectorAll(".resposta-incorreta-dois");
            const incorretaURL2 = document.querySelectorAll(".url-incorreta-dois");

            const incorretaTexto3 = document.querySelectorAll(".resposta-incorreta-tres");
            const incorretaURL3 = document.querySelectorAll(".url-incorreta-tres");

            const respostas = [
            ];

            for (let i = 0; i < quantidadePerguntas; i++) {

                let template1 = [
                    {
                        text: corretaTexto[i].value,
                        image: corretaURL[i].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorretaTexto1[i].value,
                        image: incorretaURL1[i].value,
                        isCorrectAnswer: false
                    }
                ];

                let template2 = [
                    {
                        text: corretaTexto[i].value,
                        image: corretaURL[i].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorretaTexto1[i].value,
                        image: incorretaURL1[i].value,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorretaTexto2[i].value,
                        image: incorretaURL2[i].value,
                        isCorrectAnswer: false
                    }
                ];

                let template3 = [
                    {
                        text: corretaTexto[i].value,
                        image: corretaURL[i].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorretaTexto1[i].value,
                        image: incorretaURL1[i].value,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorretaTexto2[i].value,
                        image: incorretaURL2[i].value,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorretaTexto3[i].value,
                        image: incorretaURL3[i].value,
                        isCorrectAnswer: false
                    }
                ];

                if ((incorretaTexto3[i].value && incorretaTexto2[i].value) !== "") {
                    respostas.push(template3);
                }
                if (incorretaTexto3[i].value === "" && incorretaTexto2[i].value !== "") {
                    respostas.push(template2);
                }
                if (incorretaTexto3[i].value === "" && incorretaTexto2[i].value === "") {
                    respostas.push(template1);
                }
            }
            return respostas;
        }

        const tituloPergunta = document.querySelectorAll(".titulo-pergunta");
        const corPergunta = document.querySelectorAll(".cor-de-fundo");

        const perguntas = [
        ];

        for (let i = 0; i < quantidadePerguntas; i++) {
            let template =
            {
                title: tituloPergunta[i].value,
                color: corPergunta[i].value,
                answers: arrayRespostas()[i]
            };
            perguntas.push(template);
        }
        return perguntas;
    }

    function arrayNiveis() {
        const niveis = [
        ];

        const nivelTitulo = document.querySelectorAll(".nivel-titulo");
        const nivelAcerto = document.querySelectorAll(".nivel-acerto");
        const nivelURL = document.querySelectorAll(".nivel-url");
        const nivelDescricao = document.querySelectorAll(".nivel-descricao");

        for (let i = 0; i < quantidadeNivel; i++) {
            let template =
            {
                title: nivelTitulo[i].value,
                image: nivelURL[i].value,
                text: nivelDescricao[i].value,
                minValue: nivelAcerto[i].value
            };
            niveis.push(template);
        }
        return niveis;
    }

    const tituloQuiz = document.querySelector(".titulo-quiz");
    const imagemQuiz = document.querySelector(".imagem-quiz");

    const objeto = {
        title: tituloQuiz.value,
        image: imagemQuiz.value,
        questions: arrayPerguntas(),
        levels: arrayNiveis()
    }
    return objeto;
}

let objetoSerializado = "";
let objetoCriado;

function criarQuiz() {

    let request = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', criaObjetoQuiz());

    function deuRuim() {
        alert('deu ruim');
    }

    

    function armazenarLocal() {
        let objetoSerializado = JSON.stringify(userListId);
        console.log(objetoSerializado);
        localStorage.setItem("id", objetoSerializado);
    }

    function processarResposta(resposta) {
        alteraDivQuizzCriado();
        objetoCriado = resposta;
        console.log(objetoCriado);
        userListId.push(objetoCriado.data.id)
        console.log(userListId);
        armazenarLocal();
    }

    request.then(processarResposta);
    request.catch(deuRuim);
}

function alteraDivQuizzCriado() {
    const div = document.querySelector(".quiz-criado");
    const urlImagem = document.querySelector(".imagem-quiz");
    const tituloQuiz = document.querySelector(".titulo-quiz");

    let template = `<img onclick="entrarQuiz(this)" class="imagem-quiz-criado" src="${urlImagem.value}" />
    <figcaption>${tituloQuiz.value}</figcaption>
    <div class="background"></div>`

    div.innerHTML = template;
}

function goNewQuizPage() {

    mudaPagina("tela_3_4", "tela_2");

    const imgQuiz = document.querySelector(".banner");
    const tituloObjeto = document.querySelector(".texto-banner");

    imgQuiz.src = objetoCriado.data.image;
    tituloObjeto.innerHTML = objetoCriado.data.title;

    getPerguntas(objetoCriado.data);
}

function voltarHome() {

    const tela3 = document.querySelectorAll("input");
    for(let i = 0; i< tela3.length; i++){
        tela3[i].value = "";
    }
    const listaPerguntas = document.querySelector(".criar-perguntas");
    listaPerguntas.innerHTML = "";

    
    location.reload();

    mudaPagina("tela_3_4","main-container");
    
}

// CÓDIGO TAIS ABAIXO --------------------------------------

function restartQuizz() {
    // respostas zeradas pro estado inicial


    console.log(" entrei aqui");

    armazenaCorretas = [];
    acertos = 0;
    cont = 0;
    travaTela = false;

    const getHtmlScreen2 = document.querySelector('tela_2'); // add html correto
    const getHtmlNivel = document.querySelector(".exibe-nivel");
    // tela 2 scrollada novamente para o topo
    //add função correta e parâmetro correto
    getPerguntas(objetoQuiz);
    window.scrollTo(1000, 0);
    getHtmlNivel.innerHTML = "";
}

function comeBackHome() {

    armazenaCorretas = [];
    acertos = 0;
    cont = 0;
    travaTela = false;
    
    const getHtmlPerguntas = document.querySelector(".exibe-perguntas");
    console.log(getHtmlPerguntas);
    getHtmlPerguntas.innerHTML = "";

    const getHtmlNivel = document.querySelector(".tela_2");
    console.log(getHtmlNivel.lastChild);
    
    getHtmlNivel.removeChild(getHtmlNivel.lastChild);

    mudaPagina("tela_2", "main-container");
}



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


function acessarQuiz(){

    getQuizzes();
    renderingUserQuizzes();
    setTimeout (() => { travaTela = false;
        goQuizPage(userListId.at(-1),"tela_3_4","tela_2")}, 3500);
}

/*linha pra teste*/

getUserQuizzes();
getQuizzes();
renderingQuizzes();
renderingUserQuizzes();