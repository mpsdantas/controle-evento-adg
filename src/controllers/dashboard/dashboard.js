const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const Participantes = mongoose.model('Participantes');
const crypto = require('crypto');
const path = require('path');
const fileUpload = require('express-fileupload');
const csvjson = require('csvjson');
const fs = require('fs');
exports.renderDashboard = async (application, req, res) => {
    const totalParticipantes = await Participantes.find({});
    var totalPresentes = 0;
    for(let i=0; i<totalParticipantes.length; i++) 
        if(totalParticipantes[i].statuscheckin) totalPresentes++;
    const totalAusentes = totalParticipantes.length - totalPresentes;
    res.render('dashboard',{
        totalParticipantes:totalParticipantes.length, 
        totalPresentes:totalPresentes,
        totalAusentes:totalAusentes
    });
};
exports.renderPopularBanco = (application,req, res) => {
    res.render('popular-banco',{erro:false,sucesso:false})
};
exports.uploadPopularBanco = async (application, req, res) => {
    if(req.body.senha!=="001122334455"){
        res.render('popular-banco',{erro:true,sucesso:false});
        return;
    }
    console.log(req.body.senha)
    const sampleFile = req.files.arquivo;
    if(sampleFile==undefined || path.extname(sampleFile.name)!=='.csv'){
        res.render('popular-banco',{erro:true,sucesso:false});
        return;
    }
    sampleFile.mv("src/temp/arquivoTemp.csv", async (err) => {
        if (err) return handleError(err);
        var urlSalvar = __dirname;
        urlSalvar = urlSalvar.replace("controllers/dashboard", "temp");
        //console.log(urlSalvar);
        var data = fs.readFileSync(path.join(urlSalvar, 'arquivoTemp.csv'), { encoding : 'utf8'});
        var options = {
            delimiter : ',',
            quote     : '"' 
        };
        const arrayParticipantes = csvjson.toObject(data, options)
        //console.log(csvjson.toObject(data, options));
        for(let i =0;i<arrayParticipantes.length;i++){
            for(let j=0;j<3;j++){
                arrayParticipantes[i].cpf = arrayParticipantes[i].cpf.replace(".","",arrayParticipantes[i].cpf)
                arrayParticipantes[i].cpf = arrayParticipantes[i].cpf.replace("-","",arrayParticipantes[i].cpf)
            }
            arrayParticipantes[i].checkin = 0;
            arrayParticipantes[i].checkout = 0;
            let novoParticipante = new Participantes(arrayParticipantes[i])
            await novoParticipante.save();
        }
        fs.unlink(urlSalvar+"/arquivoTemp.csv", function(err){
            if(err) console.log(err)
            console.log("Arquivo salvo com sucesso.")
        }); 
        res.render('popular-banco',{erro:false,sucesso:true})
    });  
};
exports.buscarParticipantesEntrada = async (application, req, res) =>{
    const buscaParticipantes = await Participantes.find({cpf:req.body.cpf,statuscheckin:false});
    res.status(200).json({buscaParticipantes});
    return;
}