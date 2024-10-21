const express = require(`express`)
const router = express.Router();
const clienteController = require(`../controller/clienteController`); // Importa o controller de  clientes

// Rota para listar todos os clientes
router.get(`/clientes`, clienteController.listarCliente);
// Rota para buscar um cliente por cpf
router.get(`/clientes/:cpf`, clienteController.listarClienteCpf);
// Rota para adicionar um novo cliente
router.post(`/clientes`, clienteController.adicionarCliente);
//Rota para atualizar um cliente por cpf
router.put(`/Clientes/:cpf`, clienteController.atualizarCliente);
//rota para deletar um cliente por cpf
router.delete(`/Clientes/:cpf`, clienteController.deletarCliente)

module.exports = router;