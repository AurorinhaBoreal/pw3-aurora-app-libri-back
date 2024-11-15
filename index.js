const sequelize = require('./database/database.js');
const express = require('express');
const cors = require('cors');

const routerLivro = require('./route/routesLivro');
const routesCategoria = require('./route/routesCategoria');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerLivro);
app.use('/', routesCategoria);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

startServer()

module.exports = app;