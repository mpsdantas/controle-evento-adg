exports.process = (req,res) =>{
    if(req.session.autenticado!==true){
        res.redirect('/');
        return;
    }
}
exports.redirect = async (req,res) =>{
    if(req.session.autenticado==true){
        await res.redirect('/dashboard');
        return;
    }
    res.render('index')
}
