const bancodedados = require("../../src/bancodedados")

const atualizarUsuario = (req, res)=>{
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body
    const { numeroConta } = req.params
    for (conta of bancodedados.contas) {
        if(Number(conta.numero) === Number(numeroConta)) {
            if(nome !== undefined){
            conta.usuario.nome = nome;
            } 
            if(email !== undefined){
            conta.usuario.email = email;
            }
            if(cpf !== undefined){
            conta.usuario.cpf = cpf;
            }
            if(data_nascimento !== undefined){
            conta.usuario.data_nascimento = data_nascimento;
            }
            if(telefone !== undefined){
            conta.usuario.telefone = telefone;
            }
            if(senha !== undefined){
            conta.usuario.senha = senha;
            }
        }
    }
     return res.status(200).json({mensagem: 'Conta atualizada com sucesso'})
}

module.exports = {
    atualizarUsuario
}