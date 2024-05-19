$(document).ready(function(){

    function pegaCadastro() {
        return JSON.parse(localStorage.getItem("cadastro")) || [];
    }

    function salvarCadastro(cadastro) {
        localStorage.setItem("cadastro", JSON.stringify(cadastro));
    }

    $("#registerbtn").click(function() {
        var name = $('#newUsername').val().trim();
        var email = $('#newEmail').val().trim();
        var id = $('#newId').val().trim();
        var password = $('#newPassword').val().trim();
        var passwordC = $('#confirmPassword').val().trim();
        
        if (password !== passwordC) {
            alert('As senhas não coincidem.');
            return;
        }

        const cadastro = pegaCadastro();
        cadastro.push({ 
            nome: name,
            email: email,
            id: id,
            senha: password
        });
        salvarCadastro(cadastro);
        console.log(cadastro);
    });
});