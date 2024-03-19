import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Mids from "../Charts/Mids";
import Real from "../Charts/Real";
import sales from "../../Images/sale.png";
import petrol from "../../Images/sum.png";
import epxenses from "../../Images/expenses.png";
import report from "../../Images/repo.png";
import stock from "../../Images/stock.png";
import settings from "../../Images/setting.png";
import message from "../../Images/chat.png";
import logout from "../../Images/login.png";
import overview from "../../Images/routine.png";
import Sidebar from "../Sidebar/Sidebar";

import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import moment from "moment";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "cookie-universal";

axios.defaults.withCredentials = true;

const amount = 3000;

export default function Home() {
  const cookies = new Cookies();
  const { totalliters, allexpenses, url, dieselprice, petrolprice , diff,
    zrepos,alldebts,
    totalEarnings,
    dieselAmount,
    petrolAmount} =
    useContext(AuthContext);

  const [currentUsers, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(last_value.zreport)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      {/* SECTION TWO THE CONTENT PAGE */}

      <div className="sectiontwo">
        <div className="lineage"></div>
        <div className="upsection">
          <div className="leftsect">
            <div className="leftimg">
              <img src={overview} alt="" />
            </div>

            <div className="over">
              <p id="act">Overview</p>
              <p id="acts">Sumuso overall data</p>
            </div>
          </div>

          <div className="msection">
            <div className="plan">
              <p></p>
            </div>
          </div>

          <div className="leftsect">
            {/* <img src="" alt="" /> */}

            {/* <p id='thisw'>This week</p> */}
            <div className="leftimgs">
              <img src={message} alt="" />
            </div>
            <div className="leftimgs">
              <img src={message} alt="" />
            </div>
            <div className="leftimgs">
              <img src={settings} alt="" />
            </div>
          </div>
        </div>

        <div className="lowsection">
          <div className="misect">
            <div className="left">
              <div className="head">
                <div className="leftims">
                  <img src={settings} alt="" />
                </div>

                <div className="headword">
                  <p>Oil Litres</p>
                </div>
              </div>

              <div className="graph">
                <Mids />
              </div>

              <div className="head">
                <div className="leftims">
                  <img src={settings} alt="" />
                </div>

                <div className="headword">
                  <p>Oil Litres</p>
                </div>
              </div>

              <div className="graphs">
                <Mids />
              </div>

              <div className="grap">
                <p>Graphical data analysis</p>
              </div>
            </div>

            <div className="right">
              <div className="lowersects">
                {/* <div className="logimg"> */}
                {/* <img src={ logout } alt="" /> */}
                {/* </div> */}

                <div className="cc">
                  <p>General Data</p>
                  <p id="cons">Fuel Usage Metrics</p>
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={petrol} alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Petrol</p>

                      <div className="pri">
                        <p>Tsh {petrolprice}</p>
                        {/* <img src={pend} alt="" /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  {/* <div className="ds"></div> */}
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={petrol} alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Diesel</p>

                      <div className="pri">
                        <p>Tsh {dieselprice}</p>
                        {/* <img src={pend} alt="" /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  {/* <div className="ds"></div> */}
                </div>
              </div>

              <div className="midsects">
                <div className="sectconts">
                  {/* <img src={ home } alt="" /> */}
                  <p>Metrics</p>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Total Litres</p>
                  </div>

                  <div className="amount">
                    <p> {totalliters}</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Sales</p>
                  </div>

                  <div className="amount">
                    <p>Tsh {totalEarnings}</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Expenses</p>
                  </div>

                  <div className="amount">
                    <p>Tsh {allexpenses}</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Debts</p>
                  </div>

                  <div className="amount">
                    <p>Tsh {alldebts}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionthree">
        <div className="lowersecta">
          <div className="logimg">
            <img src={logout} alt="" />
          </div>
          <p>Log out</p>
        </div>
        <div className="first">
          <div className="fs">
            <div className="ex">
              <img src="" alt="" />
              <p>Collection</p>
            </div>

            <div className="curr">
              <p>currences</p>
            </div>
          </div>
          <div className="sc">
            <div className="pd">
              <div className="pet">
                <img src="" alt="" />
                <p>Petrol</p>
              </div>
              <div className="exch">
                <img src="" alt="" />
              </div>

              <div className="dies">
                <img src="" alt="" />
                <p>Diesel</p>
              </div>
            </div>
            <div className="totalamount">
              <div className="tot">
                {/* <img src="" alt="" /> */}
                {/* <p id="ids">Total Amount</p> */}
              </div>

              <p>Tsh {String(10000000).toLocaleString()}</p>
              <p>
                <span id="aval"> Cash: </span>Tsh{" "}
                {String(5000000).toLocaleString()}
              </p>
            </div>

            <div className="remamount">
              <p>Remain: {String(12000000).toLocaleString()}/=</p>
            </div>
          </div>
          <div className="thr">
            {/* <div className="st">
              <div className="pp">
                <div className="ccs"></div>
                <p>Cash collected</p>
              </div>
              <p id="dg">12000000</p>
            </div>

            <div className="st">
              <div className="pp">
                <div className="ccs"></div>
                <p>Cash collected</p>
              </div>
              <p id="dg">12000000</p>
            </div>

            <div className="st">
              <div className="pp">
                <div className="ccs"></div>
                <p>Cash collected</p>
              </div>
              <p id="dg">12000000</p>
            </div>

            <div className="st">
              <div className="pp">
                <div className="ccs"></div>
                <p>Cash collected</p>
              </div>
              <p id="dg">12000000</p>
            </div> */}
          </div>
        </div>

        <div className="second">
          <div className="midsectss">
            <div className="sectconta">
              <p>Debtors</p>
            </div>

            <div className="sectcontt">
              <img src={sales} alt="" />
              <p>Sales</p>
            </div>

            <div className="sectcontt">
              <img src={epxenses} alt="" />
              <p>Epxenses</p>
            </div>

            <div className="sectcontt">
              <img src={report} alt="" />
              <p>Daily Report</p>
            </div>

            <div className="sectcontt">
              <img src={stock} alt="" />
              <p>Dipstick Stock</p>
            </div>

            <div className="check">
              <p>Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
