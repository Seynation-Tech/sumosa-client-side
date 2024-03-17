import React, { useContext, useEffect, useState } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import "./Report.css";
import bell from "../../Images/notify.png";
import Real from "../Charts/Real";
import morearrow from "../../Images/icono.png";
import login from "../../Images/login.png";
import world from "../../Images/blue-world-globe.jpg";

import connect from "../../Images/connect.png";
import insta from "../../Images/instagra.png";
import whatsp from "../../Images/whatsapp.png";
import youtube from "../../Images/youtub.png";
import linkin from "../../Images/linked.png";
import facebook from "../../Images/facebook.png";
import morarrow from "../../Images/rightarrow.png";
import long from "../../Images/startarrow.png";
import search from "../../Images/searchblue.png";
import sda from "../../Images/sdalogo.jpg";
import pcm from "../../Images/PCM LOGO.jpg";

import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import moment from 'moment'
import DotLoader from "react-spinners/DotLoader";
import Cookies from 'cookie-universal'

axios.defaults.withCredentials = true


export default function Expenses ()
{
    const [pesa,setPesa] = useState(false)
    const [debts,setDebts] = useState(false)
    const [stocks,setStocks] = useState(false)
    const [moneycount,setMoneycount] = useState(false)

    const handlePesa =()=>{
        setStocks(false)
        setMoneycount(false)
        setDebts(false)
        setPesa(true)
    }

    const handleDebt =()=>{
        setPesa(false)
        setMoneycount(false)
        setStocks(false)
        setDebts(true)
    }

    const handleMoneycount =()=>{
        setPesa(false)
        setStocks(false)
        setDebts(false)
        setMoneycount(true)

    }

    const handleStocks =()=>{
        setPesa(false)
        setDebts(false)
        setMoneycount(false)
        setStocks(true)
    }

    const handleAll=()=>{
        setPesa(false)
        setDebts(false)
        setMoneycount(false)
        setStocks(false)
    }

    return (
        <div className="mysals">
            <Sidebar />

            <div className=""></div>

            <div className="sectionthresa">
                <div className="general">
                    <p>DAILY REPORT FORMS</p>
                </div>
                <div className="year">
                    <div className="dail">
                        <p onClick={handleAll}>LITRES</p>
                    </div>

                    <div className="dail">
                        <p onClick={handlePesa}>ONLINE PAY</p>
                    </div>

                    <div className="dail">
                        <p onClick={handleDebt}>DEBTS</p>
                    </div>

                    <div className="dail">
                        <p onClick={handleMoneycount}>MONEY COUNTS</p>
                    </div>

                    <div className="download">
                        <p>Monday 12/03/2024</p>
                        <p>12:00:00 AM</p>
                        <div className="down">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                {/* <Real /> */ }

                <div className="lsa">
                    { pesa && (
                        <div className="poppesa">
                            <div className="contentones">
                                <div className="jins">
                                    <p>ONLINE PAYMENTS</p>
                                </div>
                                <div className="chote">
                                    <div className="bone">
                                        <div className="thetwos">{/* <p>CLOSINGS</p> */ }</div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="M-pesa" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="NMB" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="M-pesa" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="NMB" />
                                        </div>
                                    </div>

                                    <div className="bone">
                                        <div className="thetwos">{/* <p></p> */ }</div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="CRDB" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="M-pesa" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="NMB" />
                                        </div>
                                        <div className="thetwo">
                                            <button>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) }

                    { stocks && (
                        <div className="poppesa">
                            <div className="contentonest">
                                <div className="jins">
                                    <p>FUEL STOCK MANAGEMENT</p>
                                </div>
                                <div className="chote">
                                    <div className="bone">
                                        <div className="thetwos">{/* <p>CLOSINGS</p> */ }</div>

                                        <div className="thetwos">
                                            <input type="text" placeholder="Physical stock" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="Dipstick stock" />
                                        </div>

                                        <div className="thetwo">
                                            <button>Submit</button>
                                        </div>
                                    </div>

                                  
                                </div>
                            </div>
                        </div>
                    ) }

                    { debts && (
                        <div className="poppesa">
                            <div className="contentonesy">
                                <div className="ours">
                                    <div className="sdacont">
                                        <div className="jins">
                                            <p>DEBTORS' REPORT</p>
                                        </div>
                                        <div className="forms">
                                            <div className="input-two">
                                                {/* <i>icon</i> */ }
                                                <input placeholder="Name" />
                                            </div>

                                            <div className="input-two">
                                                {/* <i>icon</i> */ }
                                                <input placeholder="Amount" />
                                            </div>
                                        </div>

                                        <div className="remember-opt">
                                            <Link to="/" style={ { textDecoration: "none" } }>
                                                <button className="sign-btn">Submit</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) }

                    { moneycount && (
                        <div className="poppesaa">
                            <div className="contentonesa">
                                <div className="jins">
                                    <p>MONEY COLLECTION REPORT</p>
                                </div>
                                <div className="chote">
                                    <div className="bone">
                                        <div className="thetwos">
                                            <p>Enter Money counts</p>
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="10,000" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="5,000" />
                                        </div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="2,000" />
                                        </div>

                                        <div className="thetwos">
                                            <input type="text" placeholder="1,000" />
                                        </div>

                                        <div className="thetwos">
                                            <input type="text" placeholder="500" />
                                        </div>
                                    </div>

                                    <div className="bone">
                                        <div className="thetwos">{/* <p></p> */ }</div>
                                        <div className="thetwos">
                                            <input type="text" placeholder="200" />
                                        </div>

                                        <div className="thetwos">
                                            <input type="text" placeholder="100" />
                                        </div>

                                        <div className="thetwos">
                                            <input type="text" placeholder="50" />
                                        </div>

                                        {/* <div className="thetwos">
                                            <input type="text" placeholder="CRDB" />
                                        </div> */}
                                        <div className="thetwo">
                                            <button>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) }
                    {/* body contents */ }
                    <div className="body-contentc">
                        <div className="our">
                            <div className="bodyone">
                                <div className="contentone">
                                    <div className="jins">
                                        <p>PMS 01</p>
                                    </div>
                                    <div className="chote">
                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>CLOSINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>

                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>OPENINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="contentwo">
                                    <div className="jins">
                                        <p>AGO 01</p>
                                    </div>
                                    <div className="chote">
                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>CLOSINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>

                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>OPENINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bodytwo">
                                <div className="contentone">
                                    <div className="jins">
                                        <p>PMS 02</p>
                                    </div>
                                    <div className="chote">
                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>CLOSINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>

                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>OPENINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="contentwo">
                                    <div className="jins">
                                        <p>AGO 02</p>
                                    </div>
                                    <div className="chote">
                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>CLOSINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>

                                        <div className="bone">
                                            <div className="thetwo">
                                                <p>OPENINGS</p>
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Analog values" />
                                            </div>
                                            <div className="thetwo">
                                                <input type="text" placeholder="Digital values" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="updateing">
                                <div className="edits">
                                    <img src="" alt="" />
                                </div>
                                <button>SUBMIT</button>
                            </div>
                        </div>
                    </div>

                    <div className="rght"></div>
                </div>
            </div>
        </div>
    );
}
