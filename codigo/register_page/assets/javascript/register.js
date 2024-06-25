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
        var nome = $('#novoUsuario').val().trim();
        var email = $('#novoEmail').val().trim();
        var id_estudante = $('#novoId').val().trim();
        var senha = $('#novaSenha').val().trim();
        var confirmaSenha = $('#confirmaSenha').val().trim();
        var tipoConta = $('#tipoConta').val();
        
        // Verificar se todos os campos estão preenchidos
        if (!nome || !email || !id_estudante || !senha || !confirmaSenha || !tipoConta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validar o email
        if (!validarEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Verificar se as senhas coincidem
        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem.');
            return;
        }
        
        // Verificar se o tipo de conta for selecionado
        if(tipoConta !== "1" && tipoConta !== "2"){
            alert('Por favor, insira um tipo de conta.');
            return;
        }

        const cadastro = pegaCadastro();

        // Verificar se o numero de pessoa existe
        if (idEstudanteExiste(id_estudante, cadastro)) {
            alert('O Número de pessoa já está em uso.');
            return;
        }

        cadastro.push({ 
            nome: nome,
            email: email,
            id_estudante: id_estudante,
            db_id: cadastro.length + 1,
            senha: senha,
            tipo_conta: tipoConta,
            img_perfil:"../imagem/img.png" ,
        });
        salvarCadastro(cadastro);
        alert("Conta cadastrada com sucesso!");
        window.location.href = "../login_page/index.html";
    });
});
