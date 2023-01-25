let tituloDoQuiz;
let urlImagem;
let quantidadePerguntas;
let quantidadeNivel;

function erroValidacao(i){

    const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    paragrafo[i].classList.remove("escondido");
}

function ativaValidacao(i){

    const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    paragrafo[i].classList.add("escondido");
}

function verficaSeTudoFoiPreeenchido(){

    const paragrafo = document.querySelectorAll(" .info-basica-quiz p");
    const condicao = [];
    for(let i = 0; i<paragrafo.length; i++){
        if(!(paragrafo[i].classList.contains("escondido"))){
            condicao.push(paragrafo[i].classList.contains("escondido"))
        }
    }

    if(condicao.length !== 0){
        return;
    }

    return true;
    
}

function mudaPagina(){

    const tela = document.querySelector(".tela_3_1");
    console.log(tela);
   // tela.classList.add("escondido");
}


function verificaInfoBasicaQuiz(){

    let string="";   
    string = document.querySelectorAll(".info-basica-quiz input");

    for(let i = 0; i < string.length;i++){

        console.log(string[i].value);
        console.log(string[i].value.length);
     
        switch (i){

            case 0:
                if(!(20 <= string[i].value.length && string[i].value.length <= 65)){
                    console.log(" caso 1: Preencha os dados corretamente");
                    erroValidacao(i);
                }
                else{

                    tituloDoQuiz = string[i].value;
                   ativaValidacao(i);
                }
            break;

            case 1:

                const pattern = /^https:\/\//i;
                if(!(pattern.test(string[i].value))){
                    console.log("caso 2: Preencha os dados corretamente");
                    erroValidacao(i);
                }else {

                    urlImagem = string[i].value;
                    ativaValidacao(i);
                }
            break;

            case 2:
                if(string[i].value < '3'){
                    console.log("caso 3: Preencha os dados corretamente");
                    erroValidacao(i);

                    
                }else{

                    quantidadePerguntas = string[i].value;
                    ativaValidacao(i);
                }
            break;

            case 3:
                if(string[i].value < '2'){
                    console.log(" caso 4: Preencha os dados corretamente");
                    erroValidacao(i);
                }else{

                    quantidadeNivel = string[i].value;
                    ativaValidacao(i);
                }
            break;
        }   

    }

    console.log(tituloDoQuiz + "\n" +
                    urlImagem + "\n" +
                    quantidadePerguntas + "\n" +
                    quantidadeNivel)

    if(verficaSeTudoFoiPreeenchido()){
        mudaPagina();
    }

    
}

