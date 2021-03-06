const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const Participantes = mongoose.model('Participantes');
const crypto = require('crypto');
const path = require('path');
const fileUpload = require('express-fileupload');
const csvjson = require('csvjson');
const fs = require('fs');
const matchSorter = require('match-sorter');

exports.renderDashboard = async (application, req, res) => {
    const totalParticipantes = await Participantes.find({});
    var totalPresentes = 0;
    for (let i = 0; i < totalParticipantes.length; i++)
        if (totalParticipantes[i].statuscheckin) totalPresentes++;
    const totalAusentes = totalParticipantes.length - totalPresentes;
    res.render('dashboard', {
        totalParticipantes: totalParticipantes.length,
        totalPresentes: totalPresentes,
        totalAusentes: totalAusentes
    });
};
exports.renderPopularBanco = (application, req, res) => {
    res.render('popular-banco', { erro: false, sucesso: false })
};
exports.uploadPopularBanco = async (application, req, res) => {
    if (req.body.senha !== "001122334455") {
        res.render('popular-banco', { erro: true, sucesso: false });
        return;
    }
    const sampleFile = req.files.arquivo;
    if (sampleFile == undefined || path.extname(sampleFile.name) !== '.csv') {
        res.render('popular-banco', { erro: true, sucesso: false });
        return;
    }
    sampleFile.mv("src/temp/arquivoTemp.csv", async (err) => {
        if (err) return handleError(err);
        var urlSalvar = __dirname;
        urlSalvar = urlSalvar.replace("controllers/dashboard", "temp");
        //console.log(urlSalvar);
        var data = fs.readFileSync(path.join(urlSalvar, 'arquivoTemp.csv'), { encoding: 'utf8' });
        var options = {
            delimiter: ',',
            quote: '"'
        };
        const arrayParticipantes = csvjson.toObject(data, options)
        //console.log(csvjson.toObject(data, options));
        for (let i = 0; i < arrayParticipantes.length; i++) {
            for (let j = 0; j < 3; j++) {
                arrayParticipantes[i].cpf = arrayParticipantes[i].cpf.replace(".", "", arrayParticipantes[i].cpf)
                arrayParticipantes[i].cpf = arrayParticipantes[i].cpf.replace("-", "", arrayParticipantes[i].cpf)
            }
            arrayParticipantes[i].checkin = 0;
            arrayParticipantes[i].checkout = 0;
            arrayParticipantes[i].idPulseira = 0;
            let novoParticipante = new Participantes(arrayParticipantes[i])
            await novoParticipante.save();
        }
        fs.unlink(urlSalvar + "/arquivoTemp.csv", function (err) {
            if (err) console.log(err)
            console.log("Arquivo salvo com sucesso.")
        });
        res.render('popular-banco', { erro: false, sucesso: true })
    });
};
exports.buscarParticipantesEntrada = async (application, req, res) => {
    let buscaParticipantes = await Participantes.find({statuscheckin: false });
    buscaParticipantes = matchSorter(buscaParticipantes, req.body.cpf, {keys: ['nome', 'email','cpf']});
    res.status(200).json({ buscaParticipantes });
    return;
};
exports.buscarParticipantesSaida = async (application, req, res) => {
    let buscaParticipantes = await Participantes.find({statuscheckin: true });
    buscaParticipantes = matchSorter(buscaParticipantes, req.body.cpf, {keys: ['nome', 'email','cpf']});
    res.status(200).json({ buscaParticipantes });
    return;
};
exports.realizarEntrada = async (application, req, res) => {
    const dataCheckIn = new Date().getTime();
    if (req.body.idPulseira == "") {
        res.status(200).json({ status: false });
        return
    }
    await Participantes.update({ _id: req.body.idParticipante }, { $set: { idPulseira: req.body.idPulseira, checkin: dataCheckIn, statuscheckin: true } });
    res.status(200).json({ status: true });
    return
};
exports.realizarSaida = async (application, req, res) => {
    const dataCheckOut = new Date().getTime();
    await Participantes.update({ _id: req.body.idParticipante }, { $set: { checkout: dataCheckOut } });
    res.status(200).json({ status: true });
    return
};
exports.setupSystem = async (application, req, res) => {
    if (!req.body.senha == "001122334455") {
        res.status(200).json({ status: false })
    }
    const nomeUser = "Gim";
    const email = "gim@ect.ufrn.br";
    const senha = crypto.createHash("md5").update("gim@natal").digest("hex");
    const novoUsuario = new Usuarios({
        "nome": nomeUser,
        "email": email,
        "senha": senha
    })
    await novoUsuario.save();
    res.status(200).json({ status: true });
};
exports.apagarBanco = async (application, req, res) =>{
    let senha = req.body.senha;
    if(senha!=="001122334455") return res.status(200).json({status: false, msg: "Senha inválida"});
    const participantes = await Participantes.find({});
    if(participantes.length===0) return res.status(200).json({status:false, msg: "Não existem dados para serem apagados."});
    await Participantes.collection.drop();
    return res.status(200).json({status: true, msg: "Banco removido."});
};

exports.listarParticipantes = async (application, req, res) =>{
    const todosParticipantes = await Participantes.find();
    res.render('lista-participantes',{todosParticipantes});
};