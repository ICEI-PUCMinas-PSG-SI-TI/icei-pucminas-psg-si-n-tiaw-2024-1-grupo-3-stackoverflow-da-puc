document.addEventListener("DOMContentLoaded", function () {
    fetch('../json/data.json')
        .then(res => res.json())
        .then(jsonData => {
            displayQuestion(jsonData.DataQuestion);
            displayAnswers(jsonData.DataAnwser);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

function displayAnswers(answers) {  
    const tela = document.getElementById("MostrarRepostas");
    let params  = new URLSearchParams(location.search);
    let id = parseInt(params.get('id'));
    tela.innerHTML = '';  


    const filteredAnswers = answers.filter(answerSet => answerSet.question_id === id);

    filteredAnswers.forEach(answerSet => {
        let newDiv =+ document.createElement("div");
        newDiv.innerHTML = `
                    ${answerSet.anwser.map(answer => `<p>${answer}</p>`).join('')}
                    `;
        tela.appendChild(newDiv);
    });
}

function displayQuestion(question) {
    const tela = document.getElementById("MostrarPergunta");
    let params  = new URLSearchParams(location.search);
    let id = parseInt(params.get('id'));
    tela.innerHTML = '';

    const pId = params.toString().indexOf('id');

    let titulo = document.createElement("div");
    titulo.innerHTML = `
                    <div class="row">
                        <div class="col-md-10 h3" id="titulo">
                            ${question[pId].title}
                        </div>
                    </div>
                    <div class="d-flex justify-content-start"> <!-- Mistures grid e flex -->
                        <div>
                            <img src="${question[pId].imgUrl}" id="userimg">
                            <span class="pe-4" id="userPergunta">${question[pId].user}</span>
                        </div>
                        <div>
                            <i class="bi bi-eye-fill h4"></i>
                            <span class="pe-4" id="views">${question[pId].views}</span>
                        </div>
                        <div>
                            <i class="bi bi-file-bar-graph-fill h4"></i>
                            <span>${question[pId].vote} votes</span>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-2 col-md-1" id="vote">
                            <!-- Botão de upvote -->
                            <button type="button" class="btn btn-transparent" id="upVote">
                                <i class="bi bi-arrow-up-circle-fill h1 text-danger"></i>
                            </button>
                            <!-- Botão de downvote -->
                            <button type="button" class="btn btn-transparent text-danger" id="downVote">
                                <i class="bi bi-arrow-down-circle-fill h1"></i>
                            </button>
                        </div>
                        <div class="col-md-6">
                            <p class="font-monospace p-3" id="questionCode">
                            ${question[pId].descCodigo.replace(/\n/g, '<br>')}
                            </p>
                        </div>
                        <div class="col-md-10">
                            <span>
                                ${question[pId].desc}
                            </span>
                        </div>
                    </div>
                 `;
    tela.appendChild(titulo);
}