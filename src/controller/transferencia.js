const bancodedados = require("../../src/bancodedados")
const data = new Date()
const { format } = require('date-fns')

const transferencia = (req, res)=>{
     const {numero_conta_origem, numero_conta_destino,valor} = req.body
     for(conta of bancodedados.contas){
          if(Number(conta.numero) === Number(numero_conta_origem)){
               conta.saldo = conta.saldo - valor
          }
     } 
     for(conta of bancodedados.contas){
          if(Number(conta.numero) === Number(numero_conta_destino)){
                conta.saldo += valor
          }
     } 

     const novaTransferencia ={
          data: format(data, "yyyy/mm/dd HH:mm:ss"),
          numero_conta_origem,
          numero_conta_destino,
          valor
     }
     bancodedados.transferencias.push(novaTransferencia)
     return res.status(200).json({mensagem: 'Transferência realizado com sucesso'})
}

module.exports = {
    transferencia
}