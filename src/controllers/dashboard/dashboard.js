const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios')
const crypto = require('crypto')
exports.renderDashboard = (application, req, res) =>{
    res.render('dashboard')
}
exports.renderPopularBanco = (application,req, res) =>{
    res.render('popular-banco')
}