const {createToken} = require("../services/index.service");
const CONFIG = require("../config/config");
const Firebird = require("node-firebird");
const conexionFirebird = require('../config/conectionFirebird')

const {createSession } = require('../query/Session.query')

async function login(req, res) {
  res.setHeader("Content-Type", "application/json");

  const user = req.body.user;
  const password = req.body.pass;

  const token = createToken(user);

   conexionFirebird(user,password, async (err,db)=>{
    if (err) {
        return res.status(201).send({ error: "usuario o clave incorrectas" });
      } else {
        await createSession(user,password,token,res)
        db.detach()
        return res.status(200).send(token)
      }
  })
 
}
function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  login,
  error
};
