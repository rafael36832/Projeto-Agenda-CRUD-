const Contact = require("./../models/ContactModel")

exports.index = async(req, res) => {

    try{

        const contacts = await Contact.getContactByUser(req.session.user._id)
        
        res.render('home', {
            titlePage: "Agenda",
            contacts
        })

    } catch (err){

        req.flash("errors", "É necessário fazer login para acessar")
        res.redirect('/login/index')

    }
}

