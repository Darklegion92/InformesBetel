import React, { Component } from "react";
import "./NavBar.css";
import $ from 'jquery';


export default class NavBar extends Component {

    componentDidMount(){
      $('#salir').click(function (event)
        {
            localStorage.removeItem("token")
            window.location.replace("/");
        });
  
    }

  render() {
    return (
      <div>
        <header className="header">
          <nav className="navbar navbar-toggleable-md navbar-light pt-0 pb-0 ">
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand p-0 mr-5" href="##">
              <img src="./img/logo.webp"  width = "50%" alt="logo"/>
            </a>
            <div
              className="collapse navbar-collapse flex-row-reverse"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown  user-menu">
                  <a
                    className="nav-link dropdown-toggle"
                    href="http://example.com"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i 
                        className="fas fa-user-circle"
                    />
                    <span className="hidden-xs">{this.props.name}</span>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                      <a className="dropdown-item" href="##" id="salir">
                      Salir
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
