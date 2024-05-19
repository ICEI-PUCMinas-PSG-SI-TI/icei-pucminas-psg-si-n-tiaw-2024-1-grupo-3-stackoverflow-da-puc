$(document).ready(function(){

    function pegaCadastro() {
        return JSON.parse(localStorage.getItem("cadastro")) || [];
    }

    function salvarCadastro(cadastro) {
        localStorage.setItem("cadastro", JSON.stringify(cadastro));
    }

    $("#loginbtn").click(function() {
        var cadastro = pegaCadastro();
        var username = $('#loginUsername').val().trim();
        var password = $('#loginPassword').val().trim();

        var usuarioEncontrado = cadastro.find(function(user) {
            return user.nome === username && user.senha === password;
        });
        if (usuarioEncontrado){
            alert("Login realizado com sucesso");
            window.location.href = "../home_page/index.html"
            cadastro.forEach(cadastro => {
                cadastro.login = true
            });
            salvarCadastro(cadastro);
        }
        else{
            alert("Erro ao realizar login");
        }
    });
});