const bancodedados = require("../src/bancodedados")
const verificarIdConta = (req, res, next)=>{
    const { numeroConta } = req.params
    const { numero_conta } = req.body
    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === numeroConta || conta.numero === numero_conta)
    if(!contaEncontrada){
      return res.status(404).json({mensagem: 'Conta não encontrada.'})
    }
    next()
}

const verificarContaOrigemEdestino = (req, res, next)=>{
    const { numero_conta_origem, numero_conta_destino } = req.body
    const contaOrigemEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta_origem)
    const contaDestinoEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta_destino)
    if(numero_conta_origem === undefined){
        return res.status(400).json({ mensagem: 'Erro: A conta de origem deve ser informada' })
    }
    if(numero_conta_destino === undefined){
       return res.status(400).json({ mensagem: 'Erro: A conta de destino deve ser informada' })
    }
    if (!contaOrigemEncontrada || Number(contaOrigemEncontrada.numero) !== Number(numero_conta_origem)) {
        return res.status(400).json({ mensagem: 'Erro: A conta de origem não foi encontrada.' })
    }
    if (!contaDestinoEncontrada || Number(contaDestinoEncontrada.numero) !== Number(numero_conta_destino)) {
        return res.status(400).json({ mensagem: 'Erro: A conta de destino não foi encontrada.' })
    }
    next()
}

const validaContaESenha = (req, res, next)=>{
    const { numero_conta, senha,numero_conta_origem } = req.body
    const contaEncontrada = bancodedados.contas.find(conta => conta.numero === numero_conta ||conta.numero === numero_conta_origem)
    if(senha === undefined){
        return res.status(400).json({mensagem: 'Erro: A senha deve ser informada.'})
    }
    if(!contaEncontrada){
        return res.status(404).json({mensagem: 'Erro: Conta não encontrada.'})
    }
    if(contaEncontrada){
        if(senha != contaEncontrada.usuario.senha){
            return res.status(401).json({mensagem: "Erro: Senha incorreta"})
        }
    }
    next()
}

const verificarPropriedades = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    if(nome || cpf || data_nascimento || telefone || email || senha){
        next()     
    }
    return res.status(400).json({mensagem: 'É necessário informar ao menos uma propriedade para ser atualizada.'})
}


const verificarContaEValor = (req, res, next) =>{
    const {numero_conta, valor, senha } = req.body
    if(!numero_conta){
       return res.status(400).json({mensagem: "Erro: É necessário informar o número de conta"})
    }
    if(valor === undefined){
       return res.status(400).json({mensagem: "Erro: É necessário informar o valor a ser depositado."})
    }    
    next()
}

module.exports = {
    verificarIdConta,
    verificarPropriedades,
    verificarContaEValor,
    validaContaESenha,
    verificarContaOrigemEdestino
}