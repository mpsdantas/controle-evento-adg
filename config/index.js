/* importar o módulo do framework express */
const express = require('express')

/* iniciar o objeto do express */
const app = express();

/* importar o módulo do consign */
const consign = require('consign')

/* importar o módulo do body-parser */
const bodyParser = require('body-parser')

/* importar o módulo do express-validator */
const expressValidator = require('express-validator')

/* Importar o módulo do express-session. */
const expressSession = require('express-session')

/* Importar o módulo do express-fileupload. */
const fileUpload = require('express-fileupload')

/*Importando modulo morgan*/
const morgan = require('morgan')

/* Importar o módulo do express-session. */
const mongoose = require('mongoose')

/*Importar configurações do banco*/
const db = require('./db.js')

/* Abrindo conexão com mongodb */
mongoose.connect(db.database)

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs')
app.set('views', './src/views')

/* configurar o middleware express.static */
app.use(express.static('./src/public'))

/*Configurando o fileUpload*/
app.use(fileUpload({ limits: { fileSize: 4 * 1024 * 1024 },
	safeFileNames: true, preserveExtension: true }));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

/* configurar o middleware express-validator */
app.use(expressValidator())

/* Configurar o middleware express-session */
app.use(expressSession({
	secret: '80d499cac5e64c17620654587ec37dc5',
	resave: false,
	saveUninitialized: false
}))

/* Setando morgan */
app.use(morgan('dev'))

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign().include('src/schemas')
	.then('src/routes')
	.then('src/models')
	.then('src/controllers').into(app);

/* exportar o objeto app */
module.exports = app;
