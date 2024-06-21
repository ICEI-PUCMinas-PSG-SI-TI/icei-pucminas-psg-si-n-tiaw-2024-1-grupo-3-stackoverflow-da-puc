const form = document.getElementById("post-question-form");

form.addEventListener("submit", handlePostQuetion);

function handlePostQuetion(event) {
  event.preventDefault();

  const title = document.getElementById("post-title").value;
  const question = document.getElementById("question-post").value;
  const tags = document.getElementById("tags-post").value.split(",");

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
  };

  if (questions) {
    const questions_array = JSON.parse(questions);

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
