const mongoose = require('mongoose')
const validator = require("validator");
const bcryptjs = require("bcryptjs")

const { LoaderTargetPlugin } = require('webpack');
const salt = bcryptjs.genSaltSync()
const LoginSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true },
    email: {
        type: String, 
        required: true },
    telephone: {
        type: String, 
        required: true },
    password: {
        type: String, 
        required: true },
})

const LoginModel = mongoose.model('Users', LoginSchema);

class Login{
    
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
        this.stayLogged = this.body.stayLoggedLogin ? this.body.stayLoggedLogin : false 
        
        if(this.stayLogged!=false){
            if(this.stayLogged=="on")
                this.stayLogged = true
        }
        
    }
    //
    // Register's Functions 
    //

    async doRegister(){
        
        this.verifyRegister()

        if(this.errors.length > 0) // Check primary errors
            return false

        if(await this.getUserByEmail()!=false){  // Check if is there a user with this email
            this.errors.push("Já exsite um cadastro com esse email")
            return false
        }

        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)
        return true

    }

    verifyRegister(){

         // Accept terms' field verified in HTML 
        this.cleanUP()
        
        if(this.body.passwordRegister1 !== this.body.passwordRegister2) {
            this.errors.push("As senhas não são iguais!")      
        }

        if(!validator.isEmail(this.body.emailRegister)){
            this.errors.push("Email inválido!")  
        }

        if(this.body.passwordRegister1.length < 6 || this.body.passwordRegister1.length > 50) {
            this.errors.push("As senhas precisam ter entre 6 e 50 caracteres!")      
        }
        
        console.log(this.errors)
        // Removing every unnecessary field, e.g. csrfToken 
        // Accept field verified in HTML 
        if(this.errors.length == 0){
            this.body = {
                name: this.body.nameRegister,
                email: this.body.emailRegister,
                telephone: this.body.telephoneRegister,
                password: this.body.passwordRegister1
            }
        }
   
    }

    //
    // Login's Functions 
    //

    async doLogin(){
        
        this.verifyLogin()

        if(this.errors.length > 0) // Check primary errors
            return false
        
        this.user = await this.getUserByEmail()

        if(!validator.isEmail(this.body.email)){
            this.errors.push("Email inválido!")  
            return false
        }

        if(this.user == false){
            this.errors.push("Não existe um cadastro com esse email")
            return false
        }

        if(bcryptjs.compareSync(this.body.password, this.user.password)!=true){
            this.errors.push("Email e/ou senhas inválidos")
            return false
        }

        return true

    }

    verifyLogin(){

        this.cleanUP()

        if(this.errors.length == 0){

            this.body = {
                email: this.body.emailLogin,
                password: this.body.passwordLogin
            }

        }

    }

    //
    // General Functions
    //

    cleanUP(){

        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ""
                this.errors.push(`Erro no formulário. Entradas inválidas. Tenta novamente`)
            } 
        }

    }

    async getUserByEmail(){
        
        try {
            const user = await LoginModel.findOne({
                email: this.body.email
            })

            if(user)            
                return user
            
            return false

        } catch (err){

            return false

        }
    
    }
}

module.exports = Login;