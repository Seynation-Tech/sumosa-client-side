import React, { useContext, useEffect, useState } from 'react'
import home from "../../Images/hoo.png";
import logos from "../../Images/sumoo.png";
import profile from "../../Images/one.png";
import sales from "../../Images/sale.png";
import epxenses from "../../Images/expenses.png";
import report from "../../Images/repo.png";
import stock from "../../Images/stock.png";
import logout from "../../Images/login.png";


import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import moment from "moment";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "cookie-universal";

axios.defaults.withCredentials = true;

export default function Sidebar() {

    const cookies = new Cookies();
    const { currentUser,tokns, url, logoout } = useContext(AuthContext);
    const [currentUsers, setCurrentUser] = useState(null);
    const navigate = useNavigate();

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
          <p>{currentUser[0]?.name}</p>
          <p>{currentUser[0]?.role}</p>
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

      <NavLink className="lowersect" to="/">
          
     
        <div className="logimg">
          <img src={logout} alt="" />
        </div>
        <p>Log out</p>
   
        </NavLink>

     

      <div className="copyright">
        <p>copyright @2024</p>
      </div>
    </div>
  );
}
