const bancodedados = require("../../src/bancodedados")

const criarConta = (req, res)=> {
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body
    let ultimoNumero = 0
    for(let numero of bancodedados.contas){
        if(numero.numero != ultimoNumero && numero.numero > ultimoNumero){
             ultimoNumero = numero.numero
        }
     }
     let ultimoNumeroConvertido = parseInt(ultimoNumero, 10)
     let proximoNumero = ultimoNumeroConvertido +1
     let numeroConta = proximoNumero.toString()
     const novaConta = {
            numero: numeroConta,
            saldo: 0,
            usuario:{ 
                nome,
                email,
                cpf,
                data_nascimento,
                telefone,
                senha
        }

    }
    bancodedados.contas.push(novaConta)
    return res.status(201).json({
        numero: novaConta.numero, 
        saldo: novaConta.saldo,
        usuario: {
            nome: novaConta.usuario.nome,
            cpf: novaConta.usuario.cpf,
            data_nascimento: novaConta.usuario.data_nascimento,
            telefone: novaConta.usuario.telefone,
            email: novaConta.usuario.email,
            senha: novaConta.usuario.senha
        }})
    
}

module.exports ={
    criarConta
}