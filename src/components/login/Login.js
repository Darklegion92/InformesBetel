import React, {Component} from 'react';
import './Login.css'

export default class Login extends Component{

  state = {
      user: "",
      password: ""
  }

  onSubmit = e => {
      this.props.ingresar(this.state.user,this.state.password)
      e.preventDefault();
  }

  onChange =e => {
      this.setState({
          [e.target.name] : e.target.value
      })
  }

    render(){
        return(
            <div className="wrapper fadeInDown">
            <div id="formContent">
        
              <div className="fadeIn first">
                <img src="../img/logo.webp" id="icon" alt="User Icon" className = "img-rounded" />
              </div>
          
              <form onSubmit = {this.onSubmit}>
                <input 
                  type="text" 
                  id="login" 
                  className="fadeIn second" 
                  name="user" 
                  placeholder="Usuario" 
                  required = "true"
                  onChange={this.onChange} 
                />
                <input 
                  type="password" 
                  id="password" 
                  className="fadeIn third" 
                  name="password"
                  required = "true"
                  placeholder="Contraseña"
                  onChange={this.onChange}
                />
                <input 
                  type="submit" 
                  className="fadeIn fourth" 
                  value="Ingresar"
                />
              </form>
          
            </div>
          </div>
        )
    }
}