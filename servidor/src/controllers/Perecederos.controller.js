const { findSession } = require("../query/Session.query");
const conexionFirebird = require("../config/conectionFirebird");

async function bodegas(req, res) {
  res.setHeader("Content-Type", "application/json");

  const user = req.user;
  findSession(user, (e, r) => {
    const datos = r;
    const password = datos.password;
    conexionFirebird(user, password, async (err, db) => {
      await db.query(
        "SELECT bode_cod as codigo , bode_nom as nombre FROM bodega WHERE bode_activa = 'S'",
        (err, datos) => {
          let bodegas = [];
          datos.map(dato => {
            bodegas.push({
              NOMBRE: dato.NOMBRE.toString(),
              CODIGO: dato.CODIGO.toString()
            });
          });
          db.detach() 
          return res.status(200).send({ res: bodegas });
        }
      );
    });
  });
}

async function ajustes(req, res) {
  res.setHeader("Content-Type", "application/json");

  const user = req.user;
  findSession(user, (e, r) => {
    const datos = r;
    const password = datos.password;
    conexionFirebird(user, password, async (err, db) => {
      await db.query(
        "SELECT FIRST 10 ajus_id AS ID,ajus_numero AS NUMERO FROM ajustes WHERE ajus_fecha >= '23.11.2015' AND ajus_anulado = 'N'ORDER BY ID DESC",
        (err, datos) => {
          let ajustes = [];
          datos.map(dato => {
            ajustes.push({
              ID: dato.ID.toString(),
              NUMERO: dato.NUMERO.toString()
            });
          });
          db.detach()
          return res.status(200).send({ res: ajustes });
        }
      );
    });
  });
}

function informe(req,res){
  res.setHeader("Content-Type", "application/json");

  const user = req.user;
  findSession(user, (e, r) => {
    const datos = r;
    const password = datos.password;
    conexionFirebird(user, password, async (err, db) => {
      await db.query(
        "SELECT FIRST 10 ajus_id AS ID,ajus_numero AS NUMERO FROM ajustes WHERE ajus_fecha >= '23.11.2015' AND ajus_anulado = 'N'ORDER BY ID DESC",
        (err, datos) => {
          let ajustes = [];
          datos.map(dato => {
            ajustes.push({
              ID: dato.ID.toString(),
              NUMERO: dato.NUMERO.toString()
            });
          });
          db.detach()
          return res.status(200).send({ res: ajustes });
        }
      );
    });
  });
}


function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  bodegas,
  ajustes,
  informe,
  error
};
