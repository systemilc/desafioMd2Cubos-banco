const bancodedados = require("../bancodedados")
const data = new Date()
const { format } = require('date-fns')

const deposito = (req, res)=>{
    const {numero_conta, valor } = req.body
         for(conta of bancodedados.contas){
              if(Number(conta.numero) === Number(numero_conta)){
              conta.saldo += valor
         }
    }
    const novoDeposito ={
         data: format(data, "yyyy/mm/dd HH:mm:ss"),
         numero_conta: numero_conta,
         valor: valor
    }
    bancodedados.depositos.push(novoDeposito)
    return res.status(200).json({mensagem: "Depósito realizado com sucesso"})
}

module.exports = {
    deposito
}