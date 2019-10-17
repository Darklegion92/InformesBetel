const { findSession } = require("../query/Session.query");
const conexionFirebird = require("../config/conectionFirebird");
const {
  obtenerCostos,
  obtenerBase,
  obtenerMovimientos,
  obtenerVentas,
  obtenerDevVentas,
  comparar,
  agrupar
} = require("./logiaNegocio.controller");

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
          db.detach();
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
          db.detach();
          return res.status(200).send({ res: ajustes });
        }
      );
    });
  });
}

function informeFruver(req, res) {
  res.setHeader("Content-Type", "application/json");
  
  const idFamilia = "23"
  const user = req.user;
  findSession(user, (e, r) => {
    const datos = r;
    const password = datos.password;
    conexionFirebird(user, password, async (err, db) => {
      obtenerCostos("26.02.2018", "05.03.2018",idFamilia,db, costos => {//Costos articulos por rango de fechas
        obtenerBase("26.02.2018", idFamilia, db, ini => { //Inventario inicial
          obtenerMovimientos("26.02.2018", "05.03.2018", idFamilia, 21, db, comp => {//compras
            obtenerBase("05.03.2018", 23, db, fin => {//inventario final
              obtenerVentas("26.02.2018", "05.03.2018", idFamilia, db, vent => {//ventas
                obtenerDevVentas("26.02.2018", "05.03.2018", idFamilia, db, dev => {//devoluciones de venta
                  obtenerMovimientos("26.02.2018", "05.03.2018", idFamilia, 12, db, ave => {//averias
                  let inicialCostos = comparar(costos, ini);
                  let Iinicial = agrupar(inicialCostos, "SUCURSAL");
                  let finalCostos = comparar(costos, fin);
                  let Ifinal = agrupar(finalCostos, "SUCURSAL");
                  let comprasCostos = comparar(costos, comp);
                  let compras = agrupar(comprasCostos, "SUCURSAL");
                  let ventas = agrupar(vent, "SUCURSAL");
                  let devVentas = agrupar(dev, "SUCURSAL")
                  let averiasCostos = comparar(costos, ave);
                  let averias = agrupar(averiasCostos, "SUCURSAL");
                  db.detach();
                  return res
                    .status(200)
                    .send({ Iinicial, compras, Ifinal, ventas, devVentas, averias });
                });
              });
              });
            });
          });
        });
      });
    });
  });
}

function error(req, res) {
  res.status(404).send({ error: "Página no encontrada" });
}

module.exports = {
  bodegas,
  ajustes,
  informeFruver,
  error
};
