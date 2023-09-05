const bancodedados = require("../../src/bancodedados")

const extrato = (req, res)=>{
    const numero_conta = req.query.numero_conta
    const saques = bancodedados.saques.filter(saques => saques.numero_conta === numero_conta)
    const depositos = bancodedados.depositos.filter(depositos => depositos.numero_conta === numero_conta)
    const transferenciasEnviadas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta)
    const transferenciasRecebidas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)

    const novoExtrato = {
        saques,
        depositos,
        transferenciasEnviadas,
        transferenciasRecebidas    
    }
    return res.status(200).json(novoExtrato)
}

module.exports ={
    extrato
}