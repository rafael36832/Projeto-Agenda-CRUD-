import validator from "validator"

export default class LoginValidator{

    constructor(){
        this.form = document.querySelector(".loginUserForm")
        this.init()
    }

    init(){

        this.listeners()
    }

    listeners(){
        
        if(!this.form) return

        this.form.addEventListener('submit', (ev) => {
            ev.preventDefault() 
            this.validate(ev.target) 
        })

    }

    validate(el){
        
        const email = el.querySelector("#emailLogin")
        const password = el.querySelector("#passwordLogin")
        const emailMessage = el.querySelector("#emailLoginMessage")
        const passwordMessage = el.querySelector("#passwordLoginMessage")
        emailMessage.innerText = ""
        passwordMessage.innerText = ""
        
        let error = false

        if(!email.value){
            emailMessage.innerText = "O campo email não pode ser vazio"
            error = true
        } else if(!validator.isEmail(email.value)){
            error = true
            emailMessage.innerText = "Email inválido"
        }

        if(password.value.length < 6 || password.value.length >50){
            error = true
            passwordMessage.innerText = "A senha contém entre 6 e 50 caracteres"
        } 

        if(!error) el.submit()
    }

}