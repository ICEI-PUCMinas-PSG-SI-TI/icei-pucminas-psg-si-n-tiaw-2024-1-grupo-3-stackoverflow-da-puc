$(document).ready(function(){

    function pegaCadastro() {
        return JSON.parse(localStorage.getItem("cadastro")) || [];
    }

    function salvaUsuarioLogado(usuarioLogado) {
        localStorage.setItem("usuario_logado", JSON.stringify(usuarioLogado));
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
            salvaUsuarioLogado(usuarioEncontrado);
        }
        else{
            alert("Erro ao realizar login");
        }
    });
});