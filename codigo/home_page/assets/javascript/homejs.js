// script da troca de cores aside 
const list = document.querySelectorAll('.list'); 
function activeLink() {
    list.forEach((item) => 
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));

// script ajax e XML 
document.addEventListener("DOMContentLoaded", function () {
    let data = [];
    
    fetch('../json/data.json')
        .then(res => res.json())
        .then(jsonData => {
            data = jsonData;
            displayData(data);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
    
    function displayData(data) {
        const tela = document.getElementById("dataDisplay");
        tela.innerHTML = ''; // Limpa a tela antes de renderizar os dados filtrados
        
        data.forEach(item => {
            let newDiv = document.createElement("div");
            newDiv.className = "card col-md-12 m-3";
            newDiv.innerHTML = `
                <div class="row">
                    <div class="col-2" id="vote">
                        <div class="ms-5 pt-4">
                            <p><i class="bi bi-eye"></i> ${item.views}</p>
                            <p><i class="bi bi-chat-dots"></i> ${item.answer}</p>
                            <p><i class="bi bi-heart"></i> ${item.vote}</p>
                        </div>
                    </div>
                    <div class="col-10">
                        <div class="border">
                            <div class="card-header "><h3>${item.title}</h3></div>
                            <div class="card-body  ""><p>${item.desc}</p>
                                <div class="row ">
                                    <div class="col-md-9">
                                        ${item.tags.map(tag => `<span class="badge rounded-pill bg-danger p-2 m-1"><p class="m-0">${tag}</p></span>`).join('')}
                                    </div>
                                    <div class="col-md-3">
                                        <img src="${item.imgUrl}" alt="User Image" id="userimg" class="user-img">
                                        <p class="user-name m-0" style="display:inline">${item.user}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        
            tela.appendChild(newDiv);
        });
    }

});


