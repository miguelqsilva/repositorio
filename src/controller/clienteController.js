const db = require(`../db/db`); //Módulo de conexão com o banco de dados
const Joi = require(`joi`); // Biblioteca de validação de dados
const bcrypt = require(`bcrypt`); // Para encriptação de senhas 

// Validação com Joi
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(), // CPF deve ser uma string de exatamnete 11 caracteres
    nome: Joi.string().required().max(50),
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    telefone: Joi.string().required(),
    senha: Joi.string().min(6).required()

});
exports.listarCliente = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM cliente`);
        res.json(result);
    } catch (err) {
        console.error(`Erro ao buscar cliente:`, err);
        res.status(500).json({ error: `Erro interno do servidor` });
    }
};

exports.listarClienteCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query(`SELECT * FROM cliente WHERE cpf = ?`, [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: `cliente não encontrado` });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(`Erro ao buscar o cliente:`, err);
        res.status(500).json({ error: `Erro interno do servidor` })
    }
};

exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {

        await db.query(`DELETE FROM cliente WHERE cpf = ?`, [cpf]);
        res.json({ message: `Cliente deletado com sucesso` });

    } catch (err) {
        console.error(`Erro ao deletar cliente:`, err);
        res.status(500).json({ erro: `Erro ao deletar cliente` });

    }
};
exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, telefone, cidade, senha } = req.body;

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, telefone, cidade, senha })
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        //criptografando senha
        const hash = await bcrypt.hash(senha, 10);
        const novoCliente = { cpf, nome, endereco, bairro, telefone, cidade, senha: hash };
        await db.query(`INSERT INTO CLIENTE SET ?`, novoCliente);

        res.json({ message: `CLIENTE ADICIONADO COM SUCASSO` });

    } catch (err) {
        console.error(`ERRO AO ADICIONAR CLIENTE:`, err);
        res.status(500).json({ error: `ERRO AO ADICIONAR CLIENTE` });
    }
}

exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, telefone, cidade, senha } = req.body;

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, telefone, cidade, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });

    }
    try {
        const hash = await bcrypt.hash(senha, 10);

        const clienteAtualizado = { cpf, nome, endereco, bairro, telefone, cidade, senha: hash };
        await db.query(`UPDATE CLIENTE SET ? WHERE CPF = ?`, [clienteAtualizado, cpf]);

        res.json({ message: `CLIENTE ATUALIZADO COM SUCESSO` });
    } catch (err) {
        console.error(`ERRO AO ATUALIZAR CLIENTE:`, err);
        res.status(500).json({ error: `ERRO AO ATUALIZAR CLIENTE` });
    }
};