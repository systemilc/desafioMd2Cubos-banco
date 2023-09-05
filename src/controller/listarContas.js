const bancodedados = require("../bancodedados")

const listarContas = (req, res)=>{
    if(bancodedados.contas.length <=0){
        return res.status(200).json({mensagem: "Não há conta cadastrada"})
    }
    return res.status(200).json(bancodedados.contas)
}

module.exports = {
    listarContas
}