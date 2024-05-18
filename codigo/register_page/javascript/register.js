function createAccount(){
    var name = document.getElementById('newUsername').value;
    var email = document.getElementById('newEmail').value;
    var id = document.getElementById('newId').value;
    var password = document.getElementById('newPassword').value;
    var passwordC = document.getElementById('confirmPassword').value;

        if(password!= passwordC){
            alert("As senhas não coincidem");
            return;
        }
    
        // Conferir se email está certo (Peguei no StackOverflow)
        const emailregex = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
    
        let cadastros = JSON.parse(localStorage.getItem('cadastro')) || [];
        for(let i = 0; i < cadastros.length; i++){
            if(cadastros[i].id == id){
                alert("Este ID já está em uso");
                return;
            }
            if(cadastros[i].email == email){
                alert("Este email já está em uso");
                return;
            }
        }
    
    
        let cadastro = {
            usuario: name,
            email: email,
            id: id,
            senha: password
        };
    

    // Send account data to server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/create_account', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (this.status === 200) {
            window.location.href = '/codigo/login_page/index.html';
        }
    };
    xhr.send(JSON.stringify(cadastro));

}