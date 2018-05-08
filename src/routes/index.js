const user = require('../controllers/user')
const dashboard = require('../controllers/dashboard')
const routes = require('../models/authentication')
const crypto = require('crypto')
module.exports = (application) => {
    application.get('/', (req, res, next) => {
        routes.redirect(req, res)
    });
    application.post('/login', (req, res) => { user.loginUser(application, req, res) })
    application.get('/dashboard', (req, res) => {
        routes.process(req, res)
        dashboard.renderDashboard(application, req, res)
    });
    application.get('/popular-banco', (req, res) => {
        routes.process(req, res)
        dashboard.renderPopularBanco(application, req, res)
    });
    application.post('/enviar-csv', (req, res) => {
        routes.process(req, res)
        dashboard.uploadPopularBanco(application, req, res)
    });
    application.get('/sair', (req, res) => {
        routes.process(req, res)
        user.sair(application, req, res)
    });
    application.get('/entrada-participantes', (req, res) => {
        routes.process(req, res)
        res.render('entrada-participantes');
    });
    application.post('/entrada-participantes', (req, res) => {
        routes.process(req, res)
        dashboard.buscarParticipantesEntrada(application, req, res);
    });
    application.post('/realizar-participante', (req, res) => {
        routes.process(req, res)
        dashboard.realizarEntrada(application, req, res);
    });
    application.get('/saida-participantes', (req, res) => {
        routes.process(req, res)
        res.render('saida-participante');
    });
    application.post('/saida-participantes', (req, res) => {
        routes.process(req, res)
        dashboard.buscarParticipantesSaida(application, req, res);
    });
    application.post('/realizar-saida-participante', (req, res) => {
        routes.process(req, res)
        dashboard.realizarSaida(application, req, res);
    });
    application.get('/setup', (req, res) => {
        res.render('setup');
    });
    application.post('/setup', (req, res) => {
        dashboard.setupSystem(application, req, res);
    });
    application.post('/deletar-banco', (req, res) =>{
        dashboard.apagarBanco(application, req, res);
    });
}
