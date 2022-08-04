require('dotenv').config(); // Senhas em espaços não públicos

const express = require('express')
const expressFavicon = require('serve-favicon')
const routes = require("./routes")
const path = require("path")
const app = express()
const globalMiddleware = require('./src/middleware/middleware')
const helmet = require("helmet")
const csrf = require("csurf")

app.use(expressFavicon("./public/assets/img/agenda.ico"));

const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING, {useUnifiedTopology: true}) // CONNECTIONSTRING do arquivo .env
    .then((msg)=>{
        console.log("Conexão com DB estabelecida");
        app.emit("DBOK");
    })
    .catch((err)=> console.log(err))

//sessões
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const sessionOptions = session({
    secret: 'abcdefghij54321',
    store: MongoStore.create( { mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000*60*60*24*7, // 7 dias 
        httpOnly: true
    } 
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionOptions)
app.use(flash())
app.use(express.urlencoded({extended: true}))               // Permite a tradução dos bodies
app.use(express.json())                                      
app.set('views', path.resolve(__dirname, 'src', 'views'))   // Caminhos das views
app.set('view engine', 'ejs');                              // Engine de renderização das views

//app.use(helmet())
app.use(csrf())
app.use(globalMiddleware.global)
app.use(globalMiddleware.checkCsrfError)
app.use(globalMiddleware.csrfMiddleware)

app.use(routes) //Usar as rotas importadas 
app.on("DBOK", () =>{
app.listen(3000, () => {
    console.log("Start Server port:3000")
    console.log("http://localhost:3000/contact/index")

})})