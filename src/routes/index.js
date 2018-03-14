module.exports = (application) => {
    application.get('/',(req,res)=>{res.render('index')})
    application.post('/login', (req,res)=>{res.json(req.body)})
}
