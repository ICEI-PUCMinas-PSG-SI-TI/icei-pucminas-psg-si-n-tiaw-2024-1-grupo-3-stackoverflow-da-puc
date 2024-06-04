document.addEventListener("DOMContentLoaded", function () {
    fetch('../json/data.json')
        .then(res => res.json())
        .then(jsonData => {
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
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
                    ${answerSet.anwser.map(answer => `<p>${answer}</p>`).join('')}
                    `;
        tela.appendChild(newDiv);
    });
}