const bancodedados = require("../../src/bancodedados")

const consultarSaldo = (req, res)=>{
    const numero_conta = req.query.numero_conta
    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta)
    if(numero_conta === contaEncontrada.numero){
        res.json({
            saldo: contaEncontrada.saldo
        })
    }
}

module.exports = {
    consultarSaldo
}