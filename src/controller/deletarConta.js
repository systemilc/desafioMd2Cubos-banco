const bancodedados = require("../../src/bancodedados")

const deletarConta = (req, res)=>{
    const { numeroConta } = req.params;
    for (let i = 0; i < bancodedados.contas.length; i++) {
        const conta = bancodedados.contas[i];
        if(Number(conta.numero) === Number(numeroConta)) {
            if(conta.saldo === 0) {
                bancodedados.contas.splice(i, 1);
                return res.status(200).json({ mensagem: 'Conta excluída com sucesso' });
            } else {
                return res.status(400).json({ mensagem: 'Erro: Não é possível deletar conta com saldo positivo.' });
            }
        }
    }
}

module.exports = {
  deletarConta  
}