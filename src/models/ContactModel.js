const mongoose = require('mongoose')
const validator = require("validator");

const ContactSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true},

    email: {
        type: String,
        required: false, 
        default: ""},
    
    telephone: {
        type: String,
        required: false, 
        default: ""},

    createDate: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: String,
        required: true
    }
})

const ContactModel = mongoose.model('Contato', ContactSchema);

class Contact{

    constructor(body, userId){
        this.body = body
        this.errors = []
        this.contact = null
        this.userId = userId
    }

    async doRegister(){

        this.verifyContact()

        if(this.errors.length>0)
            return false

        this.contact = await ContactModel.create(this.body)

        return true

    }

    async doUpdate(id){

        if(typeof id != 'string') 
            return false

        this.verifyContact()

        if(this.errors.length>0)
            return false

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})

        if(!this.contact){
            this.errors.push("Contato não encontrado")
            return false
        }

        return true
    }

    // general functions

    verifyContact(){

        this.cleanUP()

        if(!this.body.name){
            this.errors.push("É necessário digitar um nome")
        }

        if(!this.body.email && !this.body.telephone){
            this.errors.push("Digite pelo menos um: Email ou telefone!")  
        }

        if(this.body.email != ""){
            if(!validator.isEmail(this.body.email)){
                this.errors.push("Email inválido!")  
            }   
        }
    
    }

    cleanUP(){

        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ""
                this.errors.push(`Erro no formulário. Entradas inválidas. Tente novamente`)
            } 
        }

        this.body = {
            name: this.body.nameContact,
            telephone: this.body.telephoneContact,
            email: this.body.emailContact,
            userId: this.userId
        }
    }
}

module.exports = Contact;

module.exports.getContactById = async(id)=>{

    if(typeof id != 'string')
        return false
       
    try {

        const contact = await ContactModel.findById(id)
        
        if(contact)            
            return contact
        
        return false

    } catch (err){

        console.log(err)
        return false

    }

}

module.exports.getContactByUser = async(userId)=>{

    if(typeof userId != 'string')
        return false
       
    try {

        const contacts = await ContactModel.find({
            userId
        }).sort({name: 1})
        
        if(contacts)            
            return contacts
        
        return false

    } catch (err){

        console.log(err)
        return false

    }

}

module.exports.deleteContact = async(id) => {

    if(typeof id != 'string')
        return false

    const result = await ContactModel.findOneAndDelete({_id: id})

    return result 

}