$(document).ready(function(){

    function pegaCadastro() {
        return JSON.parse(localStorage.getItem("cadastro")) || [];
    }

    function salvaUsuarioLogado(usuarioLogado) {
        localStorage.setItem("usuario_logado", JSON.stringify(usuarioLogado));
    }

    $("#loginbtn").click(function() {
        var cadastro = pegaCadastro();
        var usuario = $('#loginUsuario').val().trim();
        var senha = $('#loginSenha').val().trim();

        var usuarioEncontrado = cadastro.find(function(user) {
            return user.nome === usuario && user.senha === senha;
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