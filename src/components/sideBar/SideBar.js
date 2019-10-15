import React, { Component } from "react";
import "./SideBar.css";

export default class SideBar extends Component {
  render() {
    return (
      <div className="main">
        <aside>
          <div className="sidebar left ">
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src="https://img.icons8.com/ios/192/000000/user-female-circle.png"
                  className="rounded-circle"
                  alt="User"
                />
              </div>
              <div className="pull-left info">
                <p>{this.props.name}</p>
                <a href="##">
                  <i className="fa fa-circle text-success"></i> Online
                </a>
              </div>
            </div>
            <ul className="list-sidebar bg-defoult">
              <li>
                {" "}
                <a
                  href="##"
                  data-toggle="collapse"
                  data-target="#dashboard"
                  className="collapsed active"
                >
                  {" "}
                  <i className="fa fa-th-large"></i>{" "}
                  <span className="nav-label"> Configuraciones </span>{" "}
                  <span className="fa fa-chevron-left pull-right"></span>{" "}
                </a>
                <ul className="sub-menu collapse" id="dashboard">
                  <li className="active">
                    <a href="##">Parametros</a>
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <a
                  href="##"
                  data-toggle="collapse"
                  data-target="#products"
                  className="collapsed active"
                >
                  {" "}
                  <i className="fa fa-bar-chart-o"></i>{" "}
                  <span className="nav-label">Informes Perecederos</span>{" "}
                  <span className="fa fa-chevron-left pull-right"></span>{" "}
                </a>
                <ul className="sub-menu collapse" id="products">
                  <li className="active">
                    <a href="/consolidado">Consolidado</a>
                  </li>
                  <li className="active">
                    <a href="/carne">Carne</a>
                  </li>
                  <li className="active">
                    <a href="/pescado">Pescado</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
}
