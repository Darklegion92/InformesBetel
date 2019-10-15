const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config/config')
const {deleteSession, findSession} = require('../query/Session.query')

async function isAuth(req,res,next){
    
    if(!req.headers.token){
        return res.status(403).send({res: "No Tiene Autorización"})
    }

    const token =req.headers.token
    const payload = jwt.verify(token, config.SECRET_TOKEN)

    if(payload.exp<=moment().unix()){
        await deleteSession(payload.usr)
        return res.status(401).send({res: "El token ha caducado"})
    }
    req.user = payload.usr
    next()
}

module.exports = {
    isAuth
}