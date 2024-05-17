// script da troca de cores aside 
const list = document.querySelectorAll('.list'); 
function activeLink(){
    list.forEach((item) => 
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item)=>
item.addEventListener('click', activeLink));
// script ajax e XML 

document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const frame = document.getElementById("dataDisplay");

            data.forEach(item => {
                // Criar um elemento de cartão para cada objeto
                let newDiv = document.createElement("div");
                newDiv.className = "card m-3";
                newDiv.innerHTML = `
                    <div class="row">

                        <div class="col-2">
                        <div class="mx-3 mt-3">
                        <p class=>${item.views} Views</p>
                        <p class=>${item.answer} Answer</p>
                        <p class=>${item.vote} Vote</p>
                        </div>
                        
                        </div>
                        <div class="col-10">
                            <div class="card">
                            <div class="card-header"><h3>${item.title}</h3></div>
                                <div class="card-body"><p>${item.desc}</p>
                                    <div class="row ">
                                        <div class="col-md-9">
                                            <span class="badge rounded-pill bg-danger"><p class="m-0">${item.tags}</p></span>
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
                
                // Adicionar o cartão ao elemento com o ID "dataDisplay"
                frame.appendChild(newDiv);
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});


