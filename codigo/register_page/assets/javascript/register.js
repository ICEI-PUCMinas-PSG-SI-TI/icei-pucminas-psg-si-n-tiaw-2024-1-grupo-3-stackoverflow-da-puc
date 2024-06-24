$(document).ready(function() {

    function pegaCadastro() {
        return JSON.parse(localStorage.getItem("cadastro")) || [];
    }

    function salvarCadastro(cadastro) {
        localStorage.setItem("cadastro", JSON.stringify(cadastro));
    }

    function validarEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    $("#registerbtn").click(function() {
        var name = $('#newUsername').val().trim();
        var email = $('#newEmail').val().trim();
        var id = $('#newId').val().trim();
        var password = $('#newPassword').val().trim();
        var passwordC = $('#confirmPassword').val().trim();
        
        // Verificar se todos os campos estão preenchidos
        if (!name || !email || !id || !password || !passwordC) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validar o email
        if (!validarEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Verificar se as senhas coincidem
        if (password !== passwordC) {
            alert('As senhas não coincidem.');
            return;
        }

        const cadastro = pegaCadastro();
        cadastro.push({ 
            nome: name,
            email: email,
            id: id,
            db_id: cadastro.length + 1,
            senha: password,
            img_perfil:"../imagem/img.png" ,
        });
        salvarCadastro(cadastro);
        alert("Conta cadastrada com sucesso!");
        window.location.href = "../login_page/index.html";
    });
});
