

async function obtenerCostos(fechaInicial,fechaFinal,idFamilia,db,callback){
    await db.query(
        "SELECT d.arti_cod AS CODIGO,SUM(d.fcde_prunit)/COUNT(d.faco_id) AS COSTO FROM facturas_compras_detalle d, facturas_compra c, articulo a" 
        +" WHERE d.faco_id = c.faco_id AND a.arti_cod = d.arti_cod"
        +" AND c.faco_fecha >= ? AND c.faco_fecha<=? AND a.fain_cod = ? GROUP BY d.arti_cod",[fechaInicial,fechaFinal,idFamilia.toString()],
        (err, datos) => {
            if(err)
                console.log(err);
            let costos = [];
            datos.map(dato=>{
                costos.push({
                   COSTO:dato.COSTO.toString(),
                   CODIGO:dato.CODIGO.toString(), 
                })
            })          
          return callback(costos)
        }
      );
}
async function obtenerBase(fecha,idFamilia,db,callback){
    await db.query(
        "SELECT AJUS_EXNUE AS CANTIDAD, s.sucu_nombre AS SUCURSAL, a.arti_cod as CODIGO from ajustes_detalle a, articulo ar, bodega b, sucursales s, ajustes aj"
        +" WHERE a.arti_cod = ar.arti_cod AND a.bode_cod = b.bode_cod AND b.sucu_id = s.sucu_id AND aj.ajus_id = a.ajus_id AND aj.ajus_fecha = ? AND ar.fain_cod = ?",[fecha,idFamilia.toString()],
        (err, datos) => {
            if(err)
                console.log(err);
            
            let cantidad = [];
            datos.map(dato=>{
                cantidad.push({
                   CANTIDAD:dato.CANTIDAD.toString(),
                   CODIGO:dato.CODIGO.toString(),
                   SUCURSAL:dato.SUCURSAL.toString() 
                })
            })
                       
          return callback(cantidad)
        }
      );
}

async function obtenerMovimientos(fechaIni,fechaFin,idFamilia,idMovimiento,db,callback){
    await db.query(
        "SELECT m.arti_cod AS CODIGO, s.sucu_nombre AS SUCURSAL, m.mvar_cant AS CANTIDAD FROM movimiento_articulo m, articulo a, bodega b, sucursales s"
        +" WHERE a.arti_cod = m.arti_cod AND b.bode_cod = m.bode_cod AND s.sucu_id = b.sucu_id"
        +" AND m.mvar_fecha >= ? AND m.mvar_fecha<= ? AND m.mvar_tipodoc = ? AND a.fain_cod = ?",[fechaIni,fechaFin,idMovimiento,idFamilia.toString()],
        (err, datos) => {
            if(err)
                console.log(err);
            
            let cantidad = [];
            datos.map(dato=>{
                cantidad.push({
                   CANTIDAD:dato.CANTIDAD.toString(),
                   CODIGO:dato.CODIGO.toString(),
                   SUCURSAL:dato.SUCURSAL.toString() 
                })
            })
                       
          return callback(cantidad)
        }
      );
}

async function obtenerVentas(fechaIni,fechaFin,idFamilia,db,callback){
    await db.query(
        "SELECT SUM(fd.fade_total) AS VALOR, s.sucu_nombre AS SUCURSAL FROM facturas_detalle fd, facturas f,articulo a, bodega b, sucursales s"
        +" WHERE fd.fact_id = f.fact_id AND a.arti_cod = fd.arti_cod AND b.bode_cod = fd.bode_cod AND b.sucu_id = s.sucu_id"
        +" AND f.fact_fecha>= ? AND f.fact_fecha<=? AND f.fact_anulado='N' AND a.fain_cod = ?"
        +" GROUP BY SUCURSAL",[fechaIni,fechaFin,idFamilia.toString()],
        (err, datos) => {
            if(err)
                console.log(err);
            
            let valor = [];
            datos.map(dato=>{
                valor.push({
                   VALOR:dato.VALOR,
                   SUCURSAL:dato.SUCURSAL.toString() 
                })
            })
                       
          return callback(valor)
        }
      );
}

async function obtenerDevVentas(fechaIni,fechaFin,idFamilia,db,callback){
    await db.query(
        "SELECT SUM(dd.dvde_total) AS VALOR, s.sucu_nombre AS SUCURSAL FROM devoluciones_ventas_detalle dd,devoluciones_ventas d,articulo a, bodega b, sucursales s"
        +" WHERE d.devt_id = dd.devt_id AND a.arti_cod = dd.arti_cod AND b.bode_cod = dd.bode_cod AND s.sucu_id = b.sucu_id"
        +" AND d.devt_fecha >= ? AND d.devt_fecha<= ? AND d.devt_anulado= 'N' AND a.fain_cod = ? GROUP BY SUCURSAL;",[fechaIni,fechaFin,idFamilia.toString()],
        (err, datos) => {
            if(err)
                console.log(err);
            
            let valor = [];
            datos.map(dato=>{
                valor.push({
                   VALOR:dato.VALOR,
                   SUCURSAL:dato.SUCURSAL.toString() 
                })
            })
                       
          return callback(valor)
        }
      );
}


function comparar(costos,cantidades){
    let datos =[]
   costos.map(costo=>{
        cantidades.map(cantidad=>{
            if(costo.CODIGO === cantidad.CODIGO){
                datos.push({
                    SUCURSAL: cantidad.SUCURSAL,
                    VALOR: costo.COSTO * cantidad.CANTIDAD
                })
            }
        })
    })
    return datos
    
}

function agrupar(datos,prop){
    return datos.reduce(function(groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || {SUCURSAL: item.SUCURSAL, VALOR: 0};
        groups[val].VALOR += item.VALOR;
        return groups;
    }, {});
    
}

module.exports = {
    obtenerCostos,
    obtenerBase,
    obtenerMovimientos,
    obtenerVentas,
    obtenerDevVentas,
    comparar,
    agrupar
}