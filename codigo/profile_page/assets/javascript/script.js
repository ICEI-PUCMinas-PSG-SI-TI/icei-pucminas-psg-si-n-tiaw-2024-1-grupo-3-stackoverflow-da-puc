document.addEventListener("DOMContentLoaded", function () {
  populateSavedQuestions();
  populateDidQuestions();
  populateAnsweredQuestions();
});

const username = document.getElementById("username");

const user = JSON.parse(localStorage.getItem("usuario_logado"));

username.textContent = user.nome;

function populateAnsweredQuestions() {
  const user = JSON.parse(localStorage.getItem("usuario_logado"));

  const answers = JSON.parse(localStorage.getItem("answers"));

  const answeredQuestions = answers.filter(
    (question) => question.user_id === user.db_id
  );

  const answeredQuestionsContainer =
    document.getElementById("answered-questions");

  if (answeredQuestions.length === 0) {
    const pElement = document.createElement("p");
    pElement.textContent = "Nenhuma questão respondida ainda :(";

    answeredQuestionsContainer.appendChild(pElement);
    return;
  }

  answeredQuestionsContainer.removeChild(answeredQuestionsContainer.lastChild);

  for (let i = 0; i < answeredQuestions.length; i++) {
    const question = JSON.parse(localStorage.getItem("questions")).find(
      (question) => question.id === answeredQuestions[i].question_id
    );
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <a href="../question_page/index.html?id=${question.id}" class="text-dark text-decoration-none"><h3>${question.title}</h3></a>

    `;
    answeredQuestionsContainer.appendChild(questionElement);
  }
}

function populateDidQuestions() {
  const user = JSON.parse(localStorage.getItem("usuario_logado"));

  const questions = JSON.parse(localStorage.getItem("questions"));

  const didQuestions = questions.filter(
    (question) => question.user_id === user.db_id
  );

  const didQuestionsContainer = document.getElementById("did-questions");

  if (didQuestions.length === 0) {
    const pElement = document.createElement("p");
    pElement.textContent = "Nenhuma questão feita ainda :(";

    didQuestionsContainer.appendChild(pElement);
    return;
  }

  didQuestionsContainer.removeChild(didQuestionsContainer.lastChild);

  for (let i = 0; i < didQuestions.length; i++) {
    const question = didQuestions[i];
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <a href="../question_page/index.html?id=${question.id}"class="text-dark text-decoration-none"><h3>${question.title}</h3></a>

    `;
    didQuestionsContainer.appendChild(questionElement);
  }
}

function populateSavedQuestions() {
  const savedQuestions =
    JSON.parse(localStorage.getItem("saved-questions")) || [];

  const questions = JSON.parse(localStorage.getItem("questions"));

  const savedQuestionsData = questions.filter((question) =>
    savedQuestions.includes(String(question.id))
  );

  const savedQuestionsContainer = document.getElementById("saved-questions");

  if (savedQuestionsData.length === 0) {
    const pElement = document.createElement("p");
    pElement.textContent = "Nehuma questão salva ainda :(";

    savedQuestionsContainer.appendChild(pElement);
    return;
  }

  savedQuestionsContainer.removeChild(savedQuestionsContainer.lastChild);

  for (let i = 0; i < savedQuestionsData.length; i++) {
    const question = savedQuestionsData[i];
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <a href="../question_page/index.html?id=${question.id}" class=" text-dark text-decoration-none"><h3>${question.title}</h3></a>

    `;
    savedQuestionsContainer.appendChild(questionElement);
  }

  // display saved questions
}
