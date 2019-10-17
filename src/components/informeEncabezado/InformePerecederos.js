import React, { Component } from "react";
import "./InformePerecederos.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Axios from 'axios';
import Tabla from '../tabla/TableContainer'

export default class Informe extends Component {
  state = {
    bodSel:"",
    trasIniSel:"",
    trasFinSel:"",
    inicio: new Date(),
    fin: new Date(),
    bodegas: [],
    ajustes: []
  };

  async componentDidMount() {

    const res =  await Axios.get("http://localhost:3001/perecederos/parametros/bodegas",{
        headers: {
            token: localStorage.getItem('token') 
      }})
     .catch(e=>{
       console.log("Error al ingresar "+ e)   
     })
    this.setState({
      bodegas:res.data.res
    })  
    
    const res2 =  await Axios.get("http://localhost:3001/perecederos/parametros/ajustes",{
        headers: {
            token: localStorage.getItem('token') 
      }})
     .catch(e=>{
       console.log("Error al ingresar "+ e)   
     })
     
    this.setState({
      ajustes:res2.data.res
    })  
     
  }

  handleChangeInicio = date => {
    this.setState({
      inicio: date
    });
  }
  handleChangeFin = date => {
    this.setState({
      fin: date
    });
  }
  onClick = async (e)=>{
    const res =  await Axios.get("http://localhost:3001/perecederos/parametros/fruver/informe",{
      headers: {
          token: localStorage.getItem('token') 
    }}).catch(e=>{
      console.log("Error al ingresar "+ e)   
    })    
    localStorage.setItem("datosInforme",JSON.stringify(res.data.inicial))
    window.location.assign("/perecederos/fruver/consolidado")
    e.preventDefault()
  }
  onChange=(e)=>{
      this.setState({
        [e.target.name] : e.target.value
      })
  }
  render() {
    
    return (
      <div className="opciones">
        <h1>INFORME PERECEDEROS</h1>
        <form>
          <div className="form-row">
            <div className="col">
              <label htmlFor="exampleInputEmail1">Bodega Ingreso</label>
              <select className="form-control form-control-lg" onChange = {this.onChange} name="bodSel">
                {this.state.bodegas.map(bodega => {
                  return <option key={bodega.CODIGO}>{bodega.NOMBRE}</option>;
                })}
              </select>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1">Datos Iniciales</label>
              <DatePicker
                selected={this.state.inicio}
                onChange={this.handleChangeInicio}
                name="inicio"
              />
              <select className="form-control form-control-lg"  onChange = {this.onChange} name="trasIniSel">
                {this.state.ajustes.map(ajuste => {
                  return <option key={ajuste.ID}>{ajuste.NUMERO}</option>;
                })}
              </select>
              
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1">Datos Finales</label>
              <DatePicker
                selected={this.state.fin}
                onChange={this.handleChange}
                name="fin"
              />
              <select className="form-control form-control-lg" onChange = {this.onChange} name="trasFinSel">
                {this.state.ajustes.map(ajuste => {
                  return <option key={ajuste.ID}>{ajuste.NUMERO}</option>;
                })}
              </select>
              
            </div>
            <div className="col-2">
              <button type="button" className="btn btn-outline-warning" onClick={this.onClick}>
                Consultar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
