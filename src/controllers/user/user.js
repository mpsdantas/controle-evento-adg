const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios')
const crypto = require('crypto')
exports.loginUser = async (application, req, res) => {
    req.body.senha = crypto.createHash("md5").update(req.body.senha).digest("hex")
    let buscaPorUsuario = await Usuarios.findOne(req.body)
    if(buscaPorUsuario==null) return res.json({status:false,msg:"Email ou senha inválido"})
    req.session.autenticado = true;
    req.session.nome = buscaPorUsuario.nome;
    req.session.email = buscaPorUsuario.nome;
    return res.json({ status: true, msg: "Usuário autorizado, login realizado" })
}
