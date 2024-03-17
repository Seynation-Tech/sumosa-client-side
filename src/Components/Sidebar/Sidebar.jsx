import React from "react";
import { NavLink } from "react-router-dom";
import home from "../../Images/hoo.png";
import logos from "../../Images/sumoo.png";
import profile from "../../Images/one.png";
import sales from "../../Images/sale.png";
import epxenses from "../../Images/expenses.png";
import report from "../../Images/repo.png";
import stock from "../../Images/stock.png";
import logout from "../../Images/login.png";

export default function Sidebar() {
  return (
    <div className="sectionone">
      <div className="uppersect">
        <img src={logos} alt="" />
        <p id="sum">SUMOSA</p>
      </div>

      <div className="profilesect">
        <div className="profimg">
          <img src={profile} alt="" />
        </div>
        <div className="profcaption">
          <p>Salum Ally</p>
          <p>Station Manager</p>
        </div>
      </div>

      <div className="midsect">
        <NavLink to="/">
          <div className="sectcont">
            <img src={home} alt="" />
            <p>Dashboard</p>
          </div>
        </NavLink>

        <NavLink to="/sales">
          <div className="sectcont">
            <img src={sales} alt="" />
            <p>Sales</p>
          </div>
        </NavLink>

        <NavLink to="/expenses">
          <div className="sectcont">
            <img src={epxenses} alt="" />
            <p>Epxenses</p>
          </div>
        </NavLink>

        <NavLink to="/report">
          <div className="sectcont">
            <img src={report} alt="" />
            <p>Daily Report</p>
          </div>
        </NavLink>

        <NavLink to="/expenses">
        <div className="sectcont">
          <img src={stock} alt="" />
          <p>Data Review</p>
        </div>
        </NavLink>


       
      </div>
      <div className="lowersect">
        <div className="logimg">
          <img src={logout} alt="" />
        </div>
        <p>Log out</p>
      </div>

      <div className="copyright">
        <p>copyright @2024</p>
      </div>
    </div>
  );
}
