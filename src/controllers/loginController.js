const Login = require("../models/LoginModel.js")

module.exports.index = (req, res, next) => {

    if(req.session.user){

        return res.redirect("/")

    }

    return res.render("login", {
        titlePage: "Login"
    })
}

module.exports.login = async (req, res) => {

    const login = new Login(req.body)

    try{ 
        const result = await login.doLogin()

        if(result){
            
            // salvar o usuário na sessão
            req.session.user = login.user

            req.session.save(() => {    

                return res.redirect('/')

            })
        
        } else {
            
            req.flash("errors", login.errors)
            req.session.save(() => {    
                return res.redirect('back')
            })
            
        }

    } catch (err){
        console.log(err)
    } 

}

module.exports.register = async (req, res, next) => {

    const login = new Login(req.body)

    try{ 
        const result = await login.doRegister()

        if(result){
            
            req.flash("success", "Usuário cadastrado com sucesso")
            req.session.save(() => {    
                return res.redirect('/login/index')
            })
        
        } else {
            
            req.flash("errors", login.errors)
            req.session.save(() => {    
                return res.redirect('back')
            })
            
        }

    } catch (err){
        console.log(err)
    } 

}

module.exports.useTerms = (req, res) => {

    res.render("useTerms", {
        titlePage: "Termos de Uso"
    })
}

module.exports.logout = (req, res) => {

    req.session = destroy();
    res.redirect('/login/index');

}