const bancodedados = require("../../src/bancodedados")
const data = new Date()
const { format } = require('date-fns')



const saque = (req, res)=>{
     const {numero_conta, valor} = req.body
     for(conta of bancodedados.contas){
          if(Number(conta.numero) === Number(numero_conta)){
               conta.saldo = conta.saldo - valor
          }
     }
     const novoSaque ={
          data: format(data, "yyyy/mm/dd HH:mm:ss"),
          numero_conta: numero_conta,
          valor: valor
     }

     bancodedados.saques.push(novoSaque)

     return res.status(200).json({mensagem: 'Saque realizado com sucesso'})

}

module.exports = {
    saque
}