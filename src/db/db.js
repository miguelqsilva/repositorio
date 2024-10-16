//******* configuração do Banco de dados mySQl
const mysql = require(`mysql2/promise`); //importando MYSQL
require(`dotenv`).config();
//Configurando uma conexão com bamco de dados
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// prencher de acordo com seu banco de dados 

//Testar a conexão com MySQL

//AQUI DECLARAMOS QUE ESTA CONSTRUÇÃO SERÁ UM MÓDULO E QUE IREMOS EXPORTAR PARA SER USADO.
//Testar a conexão ao iniciar a aplicação
(async () => {
    try {
        const connection = await db.getConnection();
        console.log(`Conexão com o banco de dados estebelecida com sucesso`);
        connection.release(); //Libere a conexão de volta para pool
    } catch (err) {
        console.error(`Erro ao conectar ao banco de dados:`, err);
    }


})();
module.exports = db;
