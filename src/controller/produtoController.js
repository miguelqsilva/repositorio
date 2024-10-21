const { json } = require("stream/consumers");
const db = require(`../db/db`);
const joi = require(`joi`)

const produtoSchema = joi.object({
    nomeProduto: joi.string().required(),
    descricao: joi.string().required(),
    valorUnit: joi.string.required(),
    imagem: joi.string.allow(" ")

});
exports.listarProdutos = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM produto`);
        res.json(result);
    } catch (err) {
        console.error(`ERRO AO BUSCAR PRODUTO:`, err);
        res.status(500).json({ error: `ERRO INTERNO DO SERVIDOR` });
    }
};
exports.buscarProdutoId = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(`SELECT * FROM produto WHERE codigoProduto = ?`, [id])
        if (result.length === 0) {
            return res.status(404).json({ error: `Produto não encontrado` });
        }
        res.json(result[0]);

    } catch (err) {
        console.error(`Erro ao buscar produto:`, err);
        res.status(500).json({ error: `Erro interno do servidor` });

    }
};
exports.buscarProdutoNome = async (req, res) => {
    const { nomeProduto } = req.params;

    try {
        const [result] = await db.query(`Select * From produto WHERE nomeProduto Like ?`, [`${nomeProduto}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: `Produto não encontrado` });
        }
        res.json(result);

    } catch (err) {
        console.error(`Erro ao buscar produto:`, err);
        res.status(500).json({ error: `Erro interno do servidor` });
    }
};

exports.adicionarProduto = async (req, res) => {
    const { nomeProduto, descricao, valorUnit, imagem } = req.body;
    //validação dos dados com joi
    const { error } = produtoSchema.validade({ nomeProduto, descricao, valorUnit, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const novoProduto = { nomeProduto, descricao, valorUnit, imagem };
    try {
        await db.query(`Insert Into produto set ?`, novoProduto);
        res.json({ message: `produto adicionado com sucesso` })

    } catch (err) {
        console.error(`Erro ao adicionar produto:`, err);
        res.status(500), json({ error: `Erro ao adicionar produto` })

    }

}

exports.atualizarProduto = async (req, res) => {
    const { codigoProduto } = req.params;
    const { nomeProduto, descricao, valorUnit, imagem } = req.body

    const { error } = produtoSchema.validate({ nomeProduto, descricao, valorUnit, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });

    }
    const id = { nomeProduto, descricao, valorUnit, imagem };
    try {
        await db.query(`Update produto Set ? WHERE codigoProduto = ?`, [produtoAtualizado, id]);
        res.json({ message: `Produto atualizado com sucesso` });

    } catch (err) {
        console.error(`Erro ao atualizar produto`, err);
        res.status(500).json({ error: `Érro ao atualizar produto` })
    }

};

exports.deletarProduto = async (req, res) => {

    const { id } = req.params;

    try {
        await db.query(`Delete from produto Where codigoProduto = ?`, [id]);

    } catch (err) {
        console.error(`Erro ao deletar produto:`, err);
        res.status(500).json({ error: `Erro ao deletar prduto` });

    }
};

