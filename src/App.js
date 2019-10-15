import React, {Component} from 'react';
import Axios from 'axios';

import './App.css';
import './components/tabla/Tabla.scss'
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
import InformePerecederos from './components/informeEncabezado/InformePerecederos';
import SideBar from './components/sideBar/SideBar';


export default class App extends Component{
  state = {
    token: ""
  }

  componentDidMount(){
    this.setState({
        token: localStorage.getItem("token")
    }) 
  }

  ingresar = async(user, password) => {
     const res =  await Axios.post("http://localhost:3001/usuario/login",{user:user,pass:password})
     .catch(e=>{
       alert("Error al ingresar "+ e)
     })
    
     if(res.data.error){
        alert(res.data.error)
     }else{
       console.log("token: "+res.data);
       
       this.setState({token:res.data})
       console.log(this.state.token);
       
       localStorage.setItem("token",this.state.token)
     }
  }
  
  
  render(){ 

    if(this.state.token === null)
      return <Login ingresar = {this.ingresar} />
    
    else{
    return(
       <div className="contenedor-Home">
          <div className="navBar"><NavBar name={"Administrador"}/></div>
          <div className="sideBar"><SideBar name={"Administrador"}/></div>
          <div className="contenidoEncabezado"><InformePerecederos/></div>
      </div>
      ) 
            
            
    }
  }

}
