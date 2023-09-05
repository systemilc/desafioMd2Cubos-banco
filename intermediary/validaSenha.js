const bancodedados = require("../src/bancodedados")

const senhaInformada = (req, res, next) => {
    const senha_banco = req.query.senha_banco
    if(!senha_banco){
        return res.status(400).json({mensagem: 'A senha deve ser informada na requisição'})
    }
    next()
} 

const validaSenhaBanco = (req, res, next) => {
    const senha_banco = req.query.senha_banco;
    if(senha_banco != bancodedados.banco.senha){
        return res.status(401).json({mensagem: 'Senha incorreta. Verifique a senha digitada'})
    }
    next()
};

const validaSenhaConta = (req, res, next) => {
    const numero_conta = req.query.numero_conta
    const senha = req.query.senha;
    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta)
    if(!contaEncontrada){
        return res.status(404).json({mensagem: 'ERRO! Conta não encontrada'})
    }
    if(!senha){
       return res.status(401).json({mensagem: 'A senha deve ser informada na requisição'})   
    }
    if(senha != contaEncontrada.usuario.senha){
       return res.status(401).json({mensagem: 'Senha incorreta. Verifique a senha digitada'})
    }
    next()
};

module.exports = {
    senhaInformada,
    validaSenhaBanco,
    validaSenhaConta
}