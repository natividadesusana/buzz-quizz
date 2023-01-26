// CÓDIGO SUSANA ABAIXO --------------------------------------

// API BuzzQuizz
const urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz';

// todos os quizzes
let allGetQuizzes = [];

// lista sorteada
let userListId = [0, 1, 2, 3];


// GET TODOS OS QUIZZES
function getQuizzes() {
    // obtendo todos os quizzes
    const promisseGET = axios.get(`${urlAPI}/quizzes`);
    promisseGET.then(renderingQuizzes); // renderizando todos os quizzes
    promisseGET.catch(errorGetQuizzes);
}
// msgm de erro ao buscar todos os quizzes
function errorGetQuizzes() {
    console.log('ERROR SEARCHING QUIZZES!');
}

// renderizando todos os quizzes
function renderingQuizzes(response) {

    allGetQuizzes = response.data;

    const allQuizzes = document.querySelector('.all-quizzes .quizzes');

    allQuizzes.innerHTML = '';

    for(let i = 0; i < allGetQuizzes.length; i++) {

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

    if(userQuizzes) {
        let listId = JSON.parse(userQuizzes);
        for(let id = 0; id < listId.length; id++) {
            let quiz = listId[id];
            userListId.push(quiz);
        }   
    }
    // renderiza a lista de quizzes do usuário
    renderingUserQuizzes();
};

// renderiza quizzes do usuário
function renderingUserQuizzes() {

    if(userListId.length > 0) {
        const listUserQuizzes = document.querySelector('.quizzes');

        listUserQuizzes.innerHTML = '';

        for(let i = 0; i < userListId.length; i++) {
            let idQuizzes = userListId[i];

            const promisseGET = axios.get(`${urlAPI}/quizzes/${idQuizzes}`); 
            promisseGET.then((response) => {
                let quizzez = response.data;
                listUserQuizzes.innerHTML += 
                allYourQuizzes(quizzez.title, quizzez.image, quizzez.id);
            });
        }
    }
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
    const nonetQuizzesCreated = document.querySelector('.quiz-not-created');
    const quizzesCreated = document.querySelector('.your-quizzes');

    if(localStorage.length === 0) {
        nonetQuizzesCreated.classList.remove('hidden');
        quizzesCreated.classList.add('hidden');
    }
    if(localStorage.length != 0) {
        renderingUserQuizzes()
        nonetQuizzesCreated.classList.add('hidden');
        quizzesCreated.classList.remove('hidden');
    }
}
checkExistsUserQuiz();


// BUSCANDO QUIZZES CRIADO PELO USER, SE NÃO HOUVER CRIA UM ARRAY VAZIO, SE HOUVER TRANSFORMA STRING EM ARRAY E ADD NO LOCAL STORAGE
function saveLocalStorage(createdId) {
    let userQuizzes;

    if(!localStorage.getItem('userQuizzes')) {
        userQuizzes = [];
    } else {
        userQuizzes = JSON.parse(localStorage.getItem('userQuizzes'));
    };

    userQuizzes.push(createdId);
    localStorage.setItem('userQuizzes', JSON.stringify(userQuizzes));
}

// FUNÇÃO PARA A PROMISE.THEN DO QUIZZES CRIADO
function quizzesCreatedSuccess(response) {
    saveLocalStorage(response.data.id);
    renderSuccessQuizzes(response.data);
}

// VAI P/ TELA 2 DE PÁGINA DE QUIZZES
function goQuizPage() { // Ao clicar sobre o quizz, esta tela deve sumir e dar lugar à Tela 2: Página de um quizz.
    const quizzesListScreen = document.querySelector('.container');
    const quizPage = document.querySelector('.containerQuizPage'); // add a página correta depois. 
    quizzesListScreen.classList.add('hidden');
    quizPage.classList.remove('hidden');
}

// VAI P/ TELA 3 DE CRIAÇÃO DE QUIZZES
function goQuizCreation() { // Ao clicar em "Criar Quizz" ou no "+" essa tela deve sumir, dando lugar à tela de Tela 3: Criação de Quizz.
    const quizzesListScreen = document.querySelector('.container');
    const quizzesCreationScreen = document.querySelector('.containerQuizzesCreation'); // add a página correta depois. 
    quizzesListScreen.classList.add('hidden');
    quizzesCreationScreen.classList.remove('hidden');
}


getQuizzes();
renderingQuizzes();
getUserQuizzes();
renderingUserQuizzes();






// CÓDIGO SUSANA ACIMA --------------------------------------



// CÓDIGO TAIS ABAIXO --------------------------------------






// let tituloDoQuiz;
// let urlImagem;
// let quantidadePerguntas;
// let quantidadeNivel;

// function erroValidacao(i){

//     const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
//     paragrafo[i].classList.remove("escondido");
// }

// function ativaValidacao(i){

//     const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
//     paragrafo[i].classList.add("escondido");
// }

// function verficaSeTudoFoiPreeenchido(){

//     const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
//     const condicao = [];
//     for(let i = 0; i<paragrafo.length; i++){
//         if(!(paragrafo[i].classList.contains("escondido"))){
//             condicao.push(paragrafo[i].classList.contains("escondido"))
//         }
//     }

//     if(condicao.length !== 0){
//         return;
//     }

//     return true;
    
// }

// function mudaPagina(){

//     const tela = document.querySelector(".tela_3_1");
//     console.log(tela);
//    // tela.classList.add("escondido");
// }


// function verificaInfoBasicaQuiz(){

//     let string="";   
//     string = document.querySelectorAll(".info-basica-quiz input");

//     for(let i = 0; i < string.length;i++){

//         console.log(string[i].value);
//         console.log(string[i].value.length);
     
//         switch (i){

//             case 0:
//                 if(!(20 <= string[i].value.length && string[i].value.length <= 65)){
//                     console.log(" caso 1: Preencha os dados corretamente");
//                     erroValidacao(i);
//                 }
//                 else{

//                     tituloDoQuiz = string[i].value;
//                    ativaValidacao(i);
//                 }
//             break;

//             case 1:

//                 const pattern = /^https:\/\//i;
//                 if(!(pattern.test(string[i].value))){
//                     console.log("caso 2: Preencha os dados corretamente");
//                     erroValidacao(i);
//                 }else {

//                     urlImagem = string[i].value;
//                     ativaValidacao(i);
//                 }
//             break;

//             case 2:
//                 if(string[i].value < '3'){
//                     console.log("caso 3: Preencha os dados corretamente");
//                     erroValidacao(i);

                    
//                 }else{

//                     quantidadePerguntas = string[i].value;
//                     ativaValidacao(i);
//                 }
//             break;

//             case 3:
//                 if(string[i].value < '2'){
//                     console.log(" caso 4: Preencha os dados corretamente");
//                     erroValidacao(i);
//                 }else{

//                     quantidadeNivel = string[i].value;
//                     ativaValidacao(i);
//                 }
//             break;
//         }   

//     }

//     console.log(tituloDoQuiz + "\n" +
//                     urlImagem + "\n" +
//                     quantidadePerguntas + "\n" +
//                     quantidadeNivel)

//     if(verficaSeTudoFoiPreeenchido()){
//         mudaPagina();
//     }

    
// }




// CÓDIGO TAIS ABAIXO --------------------------------------