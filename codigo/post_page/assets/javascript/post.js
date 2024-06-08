const form = document.getElementById("post-question-form");

form.addEventListener("submit", handlePostQuetion);

function handlePostQuetion(event) {
  event.preventDefault();

  const title = document.getElementById("post-title").value;
  const question = document.getElementById("question-post").value;
  const tags = document.getElementById("tags-post").value;

  const questions = localStorage.getItem("questions");

  const question_json = {
    title: title,
    question: question,
    tags: tags,
    upvotes: 0,
    downvotes: 0,
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
