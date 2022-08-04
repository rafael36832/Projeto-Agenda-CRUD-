import validator from "validator"

export default class ContactValidator{

    constructor(){
        console.log("Contrutor de contactValidator")
        this.form = document.querySelector(".contactForm")
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

        const name = el.querySelector("#nameContact")
        const email = el.querySelector("#emailContact")
        const telephone = el.querySelector("#telephoneContact")

        const nameMessage = el.querySelector("#nameContactMessage")
        const emailMessage = el.querySelector("#emailContactMessage")
        const telephoneMessage = el.querySelector("#telephoneContactMessage")

        emailMessage.innerText = ""
        nameMessage.innerText = ""
        telephoneMessage.innerText = ""

        let error = false

        if(!name.value){
            error = true
            nameMessage.innerText = "O campo nome não pode ser vazio"
        }

        if(!email.value && !telephone.value){
            error = true
            emailMessage.innerText = "Telefone e email não podem ser ambos vazios"
            telephoneMessage.innerText = "Telefone e email não podem ser ambos vazios"
        }

        if(email.value){
            if(!validator.isEmail(email.value)){
                error = true
                emailMessage.innerText = "Email inválido"
            }
        }

        if(!error) {
            
            el.submit()
            console.log("Envia sem erros")

        }
    }

}