const { render } = require("ejs")
const Contact = require("../models/ContactModel.js")
const Login = require("../models/ContactModel.js")

module.exports.index = (req, res) => {

    res.render("contact", {
        titlePage: "Contato", 
        contact: {}
    })

}

module.exports.register = async (req, res) => {

    const contact = new Contact(req.body, req.session.user._id)

    try {

        const result = await contact.doRegister()

        if(result){

            req.flash("success", "Contato salvo com sucesso")

            req.session.save(() => {    

                return res.redirect('/')

            })

        } else {

            req.flash("errors", contact.errors)
            req.session.save(() => {    
                return res.redirect('back')
            })
        }

    } catch (err) {

        console.log(err)
        
    }

}

module.exports.edit = async(req, res) => {

    if(!req.params.id){
        return res.render("404", {
            titlePage: "Página não encontrada"
        })
    }

    try{

        const contact = await Contact.getContactById(req.params.id)

        if(req.session.user._id != contact.userId){
            req.session.save(()=>{res.redirect("/403")})
            return false 
        }

        if(contact!=false) {
            
            return res.render("contact", {
                titlePage: "Contato",
                contact
            })

        } else         
            return res.render("404", {
                titlePage: "Página não encontrada"
            })
    
    } catch (err){

        console.log(err)
    }
}

module.exports.update = async (req, res, next) => {

    if(!req.params.id){
        return res.render("404", {
            titlePage: "Página não encontrada"
        })
    }

    try {

        let contact = await Contact.getContactById(req.params.id)

        if(req.session.user._id != contact.userId){
            req.session.save(()=>{res.redirect("/403")})
            return 
        }
        
        contact = new Contact(req.body, req.session.user._id)
        const result = await contact.doUpdate(req.params.id)

        if(result){

            req.flash("success", "Contato atualizado com sucesso")

            req.session.save(() => {    

                return res.redirect('/')

            })

        } else {

            req.flash("errors", contact.errors)
            req.session.save(() => {    
                return res.redirect('back')
            })
        }

    } catch (err) {

        console.log(err)
        
    }
}

module.exports.delete = async (req, res, next) => {

    if(!req.params.id){
        return res.render("404", {
            titlePage: "Página não encontrada"
        })
    }

    try {

        const contact = await Contact.getContactById(req.params.id)

        if(req.session.user._id != contact.userId){
            req.session.save(()=>{res.redirect("/403")})
            return 
        }
        
        const result  = await Contact.deleteContact(req.params.id)

        if(result) {
            
            req.flash("success", "Contato excluido com sucesso")

            req.session.save(() => {    

                return res.redirect('/')

            })
            
        } else         
            return res.render("404", {
                titlePage: "Página não encontrada"
            })

    } catch (err) {

        console.log(err)
        return false
        
    }

}