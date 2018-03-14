const user = require('../controllers/user')
const crypto = require('crypto')
module.exports = (application) => {
    application.get('/',(req,res)=>{res.render('index')})
    application.post('/login', (req,res)=>{user.loginUser(application, req, res)})
}
