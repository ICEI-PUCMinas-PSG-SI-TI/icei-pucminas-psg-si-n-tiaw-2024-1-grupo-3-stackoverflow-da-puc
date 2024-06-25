const form = document.getElementById("post-question-form");

const params = new URLSearchParams(location.search);

const questionId = parseInt(params.get("question_id"));
const editing = params.get("editing");

const titleEl = document.getElementById("post-title");
const questionEl = document.getElementById("question-post");
const tagsEl = document.getElementById("tags-post");
const questioCodeEl = document.getElementById("question-code");

if (editing && questionId) {
  const questions = JSON.parse(localStorage.getItem("questions"));

  const question = questions.find((question) => question.id === questionId);

  const user = JSON.parse(localStorage.getItem("usuario_logado"));

  if (question.user_id !== user.db_id) {
    window.location.href = "/codigo/home_page/index.html";
  } else {
    titleEl.value = question.title;
    questionEl.value = question.description;
    tagsEl.value = question.tags.join(",");
  }
}

form.addEventListener("submit", handlePostQuetion);

function handlePostQuetion(event) {
  event.preventDefault();

  const title = titleEl.value;
  const question = questionEl.value;
  const tags = tagsEl.value.split(",");
  const questionCode = questioCodeEl.value;

  const questions = localStorage.getItem("questions");

  const user = localStorage.getItem("usuario_logado");

  const user_json = JSON.parse(user);

  const question_json = {
    title: title,
    description: question,
    tags: tags,
    upvotes: 0,
    downvotes: 0,
    answers: 0,
    user_id: user_json.db_id,
    username: user_json.nome,
    img_perfil: user_json.img_perfil,
    question_code: questionCode,
  };

  if (questions) {
    const questions_array = JSON.parse(questions);

    if (editing) {
      const questionIndex = questions_array.findIndex(
        (question) => question.id === questionId
      );

      question_json.id = questionId;

      questions_array[questionIndex] = question_json;

      localStorage.setItem("questions", JSON.stringify(questions_array));

      window.location.href = "/codigo/home_page/index.html";
      return;
    }

    const id = questions_array.length + 1;

    question_json.id = id;

    questions_array.push(question_json);

    localStorage.setItem("questions", JSON.stringify(questions_array));
  } else {
    question_json.id = 1;
    localStorage.setItem("questions", JSON.stringify([question_json]));
  }

  location.reload();
}
