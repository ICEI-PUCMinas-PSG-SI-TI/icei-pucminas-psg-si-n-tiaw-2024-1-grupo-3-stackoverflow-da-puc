document.addEventListener("DOMContentLoaded", function () {
  populateSavedQuestions();
});

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
    pElement.textContent = "No saved questions";

    savedQuestionsContainer.appendChild(pElement);
    return;
  }

  savedQuestionsContainer.removeChild(savedQuestionsContainer.lastChild);

  for (let i = 0; i < savedQuestionsData.length; i++) {
    const question = savedQuestionsData[i];
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <a href="../question_page/index.html?id=${question.id}"><h3>${question.title}</h3></a>

    `;
    savedQuestionsContainer.appendChild(questionElement);
  }

  // display saved questions
}
