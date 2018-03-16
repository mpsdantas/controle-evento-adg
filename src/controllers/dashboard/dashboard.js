const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios')
const crypto = require('crypto')
const path = require('path')
const fileUpload = require('express-fileupload')
const csvjson = require('csvjson')
const fs = require('fs');
exports.renderDashboard = (application, req, res) => {
    res.render('dashboard')
}
exports.renderPopularBanco = (application,req, res) => {
    res.render('popular-banco',{erro:false,sucesso:false})
}
exports.uploadPopularBanco = (application, req, res) => {
    const sampleFile = req.files.arquivo
    if(sampleFile==undefined || path.extname(sampleFile.name)!=='.csv'){
        res.render('popular-banco',{erro:true,sucesso:false})
    }
    sampleFile.mv("src/temp/arquivoTemp.csv", (err) => {
        if (err) return handleError(err);
        var urlSalvar = __dirname
        urlSalvar = urlSalvar.replace("controllers/dashboard", "temp");
        console.log(urlSalvar)
        var data = fs.readFileSync(path.join(urlSalvar, 'arquivoTemp.csv'), { encoding : 'utf8'});
        var options = {
            delimiter : ',', // optional
            quote     : '"' // optional
          };
          // for multiple delimiter you can use regex pattern like this /[,|;]+/
           
          /* 
            for importing headers from different source you can use headers property in options 
            var options = {
              headers : "sr,name,age,gender"
            };
          */
           
        console.log(csvjson.toObject(data, options));
    });
    
    
}