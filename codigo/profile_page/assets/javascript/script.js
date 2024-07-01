document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("image-upload");
    const profileImg = document.getElementById("profile-img");
    let user = JSON.parse(localStorage.getItem("usuario_logado"));

    if (user && user.img_perfil) {
        profileImg.src = user.img_perfil;
    }

    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            const base64Image = reader.result;

            if (user) {
                user.img_perfil = base64Image;
                localStorage.setItem("usuario_logado", JSON.stringify(user));
                profileImg.src = user.img_perfil;
                updateQuestionAndAnswerImages(user.img_perfil);
            } else {
                console.error("Usuário não encontrado no localStorage");
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            console.error("Nenhum arquivo selecionado");
        }
    });
    const username = document.getElementById("username");

    if (user) {
        username.textContent = user.nome;
    } else {
        console.error("Usuário não encontrado no localStorage");
    }

    populateSavedQuestions();
    populateDidQuestions();
    populateAnsweredQuestions();
});

function updateQuestionAndAnswerImages(newProfileImage) {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.forEach(question => {
        if (question.user_id === JSON.parse(localStorage.getItem("usuario_logado")).db_id) {
            question.img_perfil = newProfileImage;
        }
    });
    localStorage.setItem("questions", JSON.stringify(questions));
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    answers.forEach(answer => {
        if (answer.user_id === JSON.parse(localStorage.getItem("usuario_logado")).db_id) {
            answer.img_perfil = newProfileImage;
        }
    });
    localStorage.setItem("answers", JSON.stringify(answers));
}

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
}
