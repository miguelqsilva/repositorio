const express = require(`express`)
const router = express.Router();
const produtoController = require(`../controller/produtoController`);

router.get(`/Produtos`, produtoController.listarProdutos);
router.get(`/Produtos/:id`, produtoController.buscarProdutoId)
router.get(`/Produtos/nome/:nome_produto`, produtoController.buscarProdutoNome);
router.post(`/Produtos`, produtoController.adicionarProduto)
router.put(`/Produto/:id`, produtoController.deletarProduto);
module.exports = router