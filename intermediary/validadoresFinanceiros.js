const bancodedados = require("../src/bancodedados")

const validaSaldoPositivo = (req, res, next) =>{
    const { valor } = req.body
    if(valor <= 0){
        return res.status(400).json({mensagem: 'Erro: Você deve informar valores Positivos para Depósitos, saques ou transferências.'})
    }
    next()
}

const validaLimite = (req, res, next)=>{
    const { numero_conta, numero_conta_origem, valor } = req.body;
    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta || conta.numero === numero_conta_origem);
    if (contaEncontrada) {
        if (valor > contaEncontrada.saldo) {
            return res.status(403).json({ mensagem: `Saldo insuficiente para o saque ou transferência. Saldo disponível: ${contaEncontrada.saldo}` });
        }
    }
    next();
}


module.exports = {
    validaSaldoPositivo,
    validaLimite
}
