const Contact = require("./../models/ContactModel")

exports.global = function(req, res, next) {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
};
 
exports.checkCsrfError = function(err, req, res, next){
    
    if(err && err.code == "EBADCSRFTOKEN"){
        return res.render("404", {
            titlePage: "Erro 404: Page not found"
        })
    } else if(err){
        return res.send(`Error code: ${err}`)
    }

    next()
}

exports.csrfMiddleware = function (req, res, next){
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = function (req, res, next){
    
    // If is not logged, return
    if(!req.session.user || req.session.user == null){
        
        req.flash("errors", "É preciso estar logado para acessar a página")
        req.session.save(()=>{res.redirect("/login/index")})
        return 
    }

    // If is logged, go to next middlewar
    
    next()
}

exports.specificContactUser = function (req, res, next){

    console.log(req.session.user._id)
    console.log(req.session.contactRequestUserId)
    
    if(req.session.user._id != req.session.contactRequestUserId){
        req.session.save(()=>{res.redirect("/403")})
        return 
    }

    next()
}