//******* configuração do Banco de dados mySQl
const mysql = require(`mysql`); //importando MYSQL

//Configurando uma conexão com bamco de dados
const db = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `root`,
    database: `pizzariaT`,

})// prencher de acordo com seu banco de dados 

//Testar a conexão com MySQL
db.connect((err) => {
    if (err) {
        console.error(`ERRO AO CONECTAR AO MySQL`, err);
    } else {
        console.log(`CONECTADO AO MySQL`)
    }

});

module.exports = db;
//AQUI DECLARAMOS QUE ESTA CONSTRUÇÃO SERÁ UM MÓDULO E QUE IREMOS EXPORTAR PARA SER USADO.