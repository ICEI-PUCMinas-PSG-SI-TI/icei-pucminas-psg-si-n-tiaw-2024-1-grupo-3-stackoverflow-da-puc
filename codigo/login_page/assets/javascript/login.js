function login(){
    var email = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (this.status === 200) {
            // Handle response from server
            let response = JSON.parse(this.responseText);
            if(response.success){

                window.location.href = '/codigo/home_page/index.html';
            } else {
                alert("Email ou senha incorretos");
            }
        }
    };
    xhr.send(JSON.stringify({ email: email, password: password }));
}