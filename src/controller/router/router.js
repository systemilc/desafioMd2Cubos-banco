const express = require('express')
const { senhaInformada, validaSenhaBanco, validaSenhaConta } = require('../../../intermediary/validaSenha')
const { emailUnico, cpfUnico, todosOsCampos } = require('../../../intermediary/camposObrigatorios')
const { verificarIdConta, verificarPropriedades, verificarContaEValor, validaContaESenha, verificarContaOrigemEdestino } = require('../../../intermediary/verificarCampos')
const { validaSaldoPositivo, validaLimite } = require('../../../intermediary/validadoresFinanceiros')
const { listarContas } = require('../listarContas')
const { criarConta } = require('../criarConta')
const { atualizarUsuario } = require('../atualizarUsuario')
const { deletarConta } = require('../deletarConta')
const { deposito } = require('../deposito')
const { saque } = require('../saque')
const { transferencia } = require('../transferencia')
const { consultarSaldo } = require('../consultarsaldo')
const { extrato } = require('../extrato')
const router = express()

router.get("/contas",senhaInformada, validaSenhaBanco, listarContas )
router.post("/contas/",todosOsCampos ,cpfUnico, emailUnico, criarConta )
router.put("/contas/:numeroConta/usuario",verificarIdConta, verificarPropriedades, cpfUnico, emailUnico, atualizarUsuario)
router.delete("/contas/:numeroConta/", verificarIdConta,deletarConta)

router.post("/transacoes/depositar", verificarContaEValor, verificarIdConta, validaSaldoPositivo, deposito)
router.post("/transacoes/sacar", validaContaESenha, validaLimite,validaSaldoPositivo, saque)
router.post("/transacoes/transferir",verificarContaOrigemEdestino, validaContaESenha ,validaLimite,validaSaldoPositivo, transferencia)

router.get("/contas/saldo", validaSenhaConta ,consultarSaldo)
router.get("/contas/extrato",validaSenhaConta , extrato)

module.exports = {
    router
}