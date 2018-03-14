const user = require('../controllers/user')
const dashboard = require('../controllers/dashboard')
const routes = require('../models/authentication')
const crypto = require('crypto')
const path = require('path')
const fileUpload = require('express-fileupload')
module.exports = (application) => {
    application.get('/',(req,res,next)=>{
        routes.redirect(req, res)   
    })
    application.post('/login', (req,res)=>{user.loginUser(application, req, res)})
    application.get('/dashboard',(req,res)=>{
        routes.process(req,res)
        dashboard.renderDashboard(application,req,res)
    })
    application.get('/popular-banco',(req,res)=>{
        routes.process(req,res)
        dashboard.renderPopularBanco(application,req,res)
    })
    application.post('/enviar-csv',(req,res)=>{
        console.log(req.files)
    })
}
