'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const usuarioRouter = require('./routes/Usuario.routes')
const perecederosRouter = require('./routes/Perecederos.routes')
const path = require('path')
const session = require('express-session')
const CONFIG = require("./config/config")
const {isAuth} = require('./middlewares/acceso')

const APP = express();

//MiddelWare
APP.use(cors())
APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({extended: false}))
APP.use(session({
    secret: CONFIG.SECRET_TOKEN,
    resave: true,
    saveUninitialized: true
}))
APP.use(morgan('dev'))

//Ruta
APP.use('/usuario',usuarioRouter)
APP.use('/perecederos',isAuth,perecederosRouter)
//APP.use('/',inicioRouter)

//Elementos Estaticos
APP.use(express.static(path.join(__dirname,'public')))
module.exports = APP;
