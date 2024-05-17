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
                newDiv.className = "card";
                newDiv.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.desc}</p>
                    <p>Tags: ${item.tags}</p>
                    <p>User: ${item.user}</p>
                    <img src="${item.imgUrl}" alt="User Image" id="userimg">
                    <button class="btn">View Details</button>`;
                
                // Adicionar o cartão ao elemento com o ID "loop"
                frame.appendChild(newDiv);
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
