const bancodedados = require("../src/bancodedados")

const todosOsCampos = (req, res, next) =>{
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body
    if(!nome||!email||!cpf||!data_nascimento||!telefone||!senha){
        return res.status(400).json({mensagem: "Atenção! Todos os campos são obrigatórios"})
    }
    next()
}

const cpfUnico = (req, res, next) =>{
    const { cpf } = req.body
    const verificaCpf = bancodedados.contas.find(conta => conta.usuario.cpf === cpf);
    if(verificaCpf) {
        return res.status(409).json({ mensagem: "CPF Existente" });
    }
    next()
}

const emailUnico = (req, res, next) =>{
    const { email } = req.body
    const verificaEmail = bancodedados.contas.find(conta => conta.usuario.email === email);
    if(verificaEmail) {
        return res.status(409).json({ mensagem: "E-mail Existente" });
    }
    next()
}




module.exports = {
    todosOsCampos,
    cpfUnico,
    emailUnico,
}