// script da troca de cores aside
const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

function filtrardados(termopes, tagselecionada) {
  let dadosfiltrado = JSON.parse(localStorage.getItem("questions"));
  if (termopes) {
    dadosfiltrado = dadosfiltrado.filter((item) =>
      item.title.toLowerCase().includes(termopes)
    );
  }
  if (tagselecionada !== "filtro" && tagselecionada !== "") {
    dadosfiltrado = dadosfiltrado.filter((item) =>
      item.tags.includes(tagselecionada)
    );
  }
  displayData(dadosfiltrado);
}

function displayData(data) {
  // função para colocar o  card na tela
  const tela = document.getElementById("dataDisplay");
  tela.innerHTML = ""; // Limpa o conteúdo existente

  data.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.className = "card col-md-12 m-3";
    newDiv.innerHTML = `<a href="../question_page/index.html?id=${
      item.id
    }" class="text-dark  text-decoration-none">
                <div class="row">
                    <div class="col-3 col-md-2  text-center" id="vote">
                        <div class="mt-2 mb-2 mt-md-0 pt-4">
                            <p><i class="bi bi-chat-dots"></i> ${
                              item.answers
                            }</p>
                            <p class="m-0"><i class="bi bi-hand-thumbs-up"></i> ${
                              item.upvotes
                            }</p>
                            <p class="m-0"><i class="bi bi-hand-thumbs-down"></i> ${
                              item.downvotes
                            }</p>

                        </div>
                    </div>
                    <div class="col-9 col-md-10">
                        <div class="border">
                            <div class="card-header p-2"><h4>${
                              item.title
                            }</h4></div>
                            <div class="card-body p-2"><p>${
                              item.description
                            }</p>
                                <div class="row">
                                    <div class="col-md-9">
                                        ${item.tags
                                          .map(
                                            (tag) =>
                                              `<span class="badge rounded-pill bg-danger p-2 m-1"><p class="m-0">${tag}</p></span>`
                                          )
                                          .join("")}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>`;
    tela.appendChild(newDiv);
  });
}

function tagsfiltro(data) {
  // função para pesquisar as tags do Json e colocar ela no seletor
  const Seletor = document.getElementById("Seletor");
  const tags = new Set();

  data.forEach((item) => {
    item.tags.forEach((tag) => tags.add(tag));
  });

  tags.forEach((tag) => {
    const opcao = document.createElement("option");
    opcao.value = tag;
    opcao.textContent = tag;
    Seletor.appendChild(opcao);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const questions = localStorage.getItem("questions");

  if (questions) {
    displayData(JSON.parse(questions));
  }

  const input = document.getElementById("busca"); //Busca o elemento apartir do texto digitado e do seletor
  input.addEventListener("input", () => {
    const termopes = input.value.toLowerCase();
    filtrardados(termopes, document.getElementById("Seletor").value);
  });

  const Seletor = document.getElementById("Seletor"); //Filtra o  elemento somente com o seletor
  Seletor.addEventListener("change", () => {
    filtrardados(input.value.toLowerCase(), Seletor.value);
  });
});
