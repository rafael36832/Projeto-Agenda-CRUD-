import validator from "validator"

export default class RegisterValidator{

    constructor(){
        this.form = document.querySelector(".registerUserForm")
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

        const name = el.querySelector("#nameRegister")
        const email = el.querySelector("#emailRegister")
        const password1 = el.querySelector("#passwordRegister1")
        const password2 = el.querySelector("#passwordRegister2")
        const telephone = el.querySelector("#telephoneRegister")

        const nameMessage = el.querySelector("#nameRegisterMessage")
        const emailMessage = el.querySelector("#emailRegisterMessage")
        const passwordMessage1 = el.querySelector("#passwordRegisterMessage1")
        const passwordMessage2 = el.querySelector("#passwordRegisterMessage2")
        const telephoneMessage = el.querySelector("#telephoneRegisterMessage")

        nameMessage.innerText = ""
        emailMessage.innerText = ""
        passwordMessage1.innerText = ""
        passwordMessage2.innerText = ""
        telephoneMessage.innerText = ""

        let error = false

        if(!name.value){
            nameMessage.innerText = "O campo nome não pode ser vazio"
            error = true
        } 

        if(!email.value){
            error = true
            emailMessage.innerText = "O campo email não pode ser vazio"
        } else if(!validator.isEmail(email.value)){
            error = true
            emailMessage.innerText = "Email inválido"
        }
    
        if(password1.value.length < 6 || password1.value.length >50){
            error = true
            passwordMessage1.innerText += "A senha deve conter entre 6 e 50 caracteres \n"
        } 

        if(password2.value.length < 6 || password2.value.length >50){
            error = true
            passwordMessage2.innerText += "A senha deve conter entre 6 e 50 caracteres \n"
        } 

        if(password1.value != password2.value){
            error = true
            passwordMessage1.innerText += "As senhas não são iguais"
            passwordMessage2.innerText += "As senhas não são iguais"
        } 

        if(!telephone.value){
            telephoneMessage += "O campo telefone não pode ser vazio"
        }

        if(!error) el.submit()

    }

}