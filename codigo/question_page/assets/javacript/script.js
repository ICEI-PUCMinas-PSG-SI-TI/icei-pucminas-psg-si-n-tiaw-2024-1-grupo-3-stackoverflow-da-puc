document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(location.search);
  const questionId = parseInt(params.get("id"));

  const questions = localStorage.getItem("questions");

  if (questions) {
    const questions_array = JSON.parse(questions);

    const question = questions_array.find(
      (question) => question.id == questionId
    );

    displayQuestion(question);
  }

  const answers = localStorage.getItem("answers");

  if (answers) {
    const answers_array = JSON.parse(answers);

    const answers_for_question = answers_array.filter(
      (answer) => answer.question_id == questionId
    );

    displayAnswers(answers_for_question);
  }
});

function displayAnswers(answers) {
  const tela = document.getElementById("MostrarRepostas");
  tela.innerHTML = "";

  if (answers.length > 0) {
    answers.forEach((answer) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="border p-2 m-2"><div class="col-12"><p>${answer.text}</p><hr class="mb-0"></div><div class="col-11 d-flex justify-content-end "><span class="m-1"><img src="${answer.img_perfil}" id="userimg"> ${answer.user}</span></div></div>`;
      tela.appendChild(newDiv);
    });
  } else {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = "<p>Nenhuma resposta encontrada para esta pergunta.</p>";
    tela.appendChild(newDiv);
  }
}

function handleUpvote(event) {
  const questionId = event.target.getAttribute("data-id");

  const questions = JSON.parse(localStorage.getItem("questions"));

  const updatedQuestions = questions.map((question) => {
    if (question.id == questionId) {
      question.upvotes += 1;
    }
    return question;
  });

  localStorage.setItem("questions", JSON.stringify(updatedQuestions));

  location.reload();
}

function handleDownvote(event) {
  const questionId = event.target.getAttribute("data-id");

  const questions = JSON.parse(localStorage.getItem("questions"));

  const updatedQuestions = questions.map((question) => {
    if (question.id == questionId) {
      question.downvotes += 1;
    }
    return question;
  });

  localStorage.setItem("questions", JSON.stringify(updatedQuestions));

  location.reload();
}

function handleSaveQuestion(event) {
  const questionId = event.target.getAttribute("data-id");

  if (!localStorage.getItem("saved-questions")) {
    localStorage.setItem("saved-questions", JSON.stringify([]));
  }

  const savedQuestions = JSON.parse(localStorage.getItem("saved-questions"));

  if (savedQuestions.includes(questionId)) {
    const updatedSavedQuestions = savedQuestions.filter(
      (savedQuestionId) => savedQuestionId != questionId
    );
    localStorage.setItem(
      "saved-questions",
      JSON.stringify(updatedSavedQuestions)
    );
  } else {
    savedQuestions.push(questionId);
    localStorage.setItem("saved-questions", JSON.stringify(savedQuestions));
  }
}

function handleDeleteQuestion(event) {
  const questionId = event.target.getAttribute("data-id");

  const questions = JSON.parse(localStorage.getItem("questions"));

  const updatedQuestions = questions.filter(
    (question) => question.id != questionId
  );

  localStorage.setItem("questions", JSON.stringify(updatedQuestions));

  const answers = JSON.parse(localStorage.getItem("answers"));

  if (answers) {
    const updatedAnswers = answers.filter(
      (answer) => answer.question_id != questionId
    );

    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
  }

  window.location.href = "/codigo/home_page/index.html";
}

function displayQuestion(question) {
  const tela = document.getElementById("MostrarPergunta");
  let params = new URLSearchParams(location.search);
  let id = parseInt(params.get("id"));
  tela.innerHTML = "";

  const user_id = JSON.parse(localStorage.getItem("usuario_logado")).db_id;

  let titulo = document.createElement("div");
  titulo.innerHTML = `
        <div class="row">
        <div class="col-md-10 h3" id="titulo">${question.title}</div>
        </div>
        <div class="d-inline-flex flex-wrap pb-3">
            <div>
                <i class="bi bi-hand-thumbs-down-fill pe-1"></i>
                <span class="pe-4">${question.upvotes} upvotes</span>
            </div>
            <div>
                <i class="bi bi-hand-thumbs-up-fill pe-1"></i>
                <span>${question.downvotes} downvotes</span>
            </div>

            <div>
              <i class="bi bi-person-fill"></i>
              <span>Usuario: ${question.username}</span>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col-2 col-md-1" id="vote">
            <button
                type="button"
                class="btn btn-transparent"
                id="question-upVote"
                data-id="${id}"
            >
                <i class="bi bi-arrow-up-circle-fill h1 text-danger" data-id="${id}"></i>
            </button>
            <button
                type="button"
                class="btn btn-transparent text-danger"
                id="question-downVote"
                data-id="${id}"
            >
                <i class="bi bi-arrow-down-circle-fill h1" data-id="${id}"></i>
            </button>

            <button
              type="button"
              class="btn btn-transparent text-danger"
              id="question-save"
              data-id="${id}"
            >
            <i class="bi bi-box-arrow-down h1" data-id="${id}"></i>
            </button>

            ${
              user_id == question.user_id
                ? `<button
                  type="button"
                  class="btn btn-transparent text-danger"
                  id="question-delete"
                  data-id="${id}"
                >
                  <i class="bi bi-trash h1" data-id="${id}"></i>
                </button>`
                : ``
            }

            ${
              user_id == question.user_id
                ? `
              <a href="/codigo/post_page/index.html?editing=true&question_id=${id}">
                <button
                  type="button"
                  class="btn btn-transparent text-danger"
                  id="question-delete"
                  data-id="${id}"
                >
                    <i class="bi bi-pencil-square h1" data-id="${id}"></i>
                </button>
              </a>
              `
                : ``
            }

            </div>
            <div class="col-md-6">

            <p>
            ${question.description}
            </p>
            ${
              question.question_code
                ? `            <p class="font-monospace p-3" id="questionCode">
            ${question.question_code.replaceAll("\n", "<br>")}
          </p>`
                : ""
            }
            </div>
        </div>
        </div>`;
  tela.appendChild(titulo);

  const up_vote = document.getElementById("question-upVote");
  const down_vote = document.getElementById("question-downVote");
  const save_question = document.getElementById("question-save");
  const delete_question = document.getElementById("question-delete");

  save_question.addEventListener("click", handleSaveQuestion);
  up_vote.addEventListener("click", handleUpvote);
  down_vote.addEventListener("click", handleDownvote);

  if (delete_question) {
    delete_question.addEventListener("click", handleDeleteQuestion);
  }
}

async function enviarResposta() {
  const respostaTexto = document.querySelector("#respostaTexto").value;
  const questionId = parseInt(new URLSearchParams(location.search).get("id"));

  const user = JSON.parse(localStorage.getItem("usuario_logado"));

  const answer_json = {
    question_id: questionId,
    text: respostaTexto,
    user: user.nome,
    img_perfil: user.img_perfil,
    user_id: user.db_id,
  };

  const answers = localStorage.getItem("answers");

  const questions = localStorage.getItem("questions");

  const questions_array = JSON.parse(questions);

  const current_question = questions_array.find(
    (question) => question.id == questionId
  );

  current_question.answers += 1;

  localStorage.setItem("questions", JSON.stringify(questions_array));

  if (answers) {
    const answers_array = JSON.parse(answers);

    const id = answers_array.length + 1;

    answer_json.id = id;

    answers_array.push(answer_json);

    localStorage.setItem("answers", JSON.stringify(answers_array));
  } else {
    answer_json.id = 1;
    localStorage.setItem("answers", JSON.stringify([answer_json]));
  }

  location.reload();
}

function adicionarResposta(resposta) {
  const telaResposta = document.getElementById("MostrarRepostas");

  const novaDivResposta = document.createElement("div");
  novaDivResposta.classList.add("resposta");
  novaDivResposta.innerHTML = `<p>${resposta.resposta}</p>`;

  telaResposta.appendChild(novaDivResposta);
}
