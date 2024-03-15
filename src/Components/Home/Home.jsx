import React from "react";
import "./Home.css";
import Mids from "../Charts/Mids";
import Real from "../Charts/Real";
import Graphs from "../Charts/Graphs";
import home from "../../Images/hoo.png";
import logos from "../../Images/sumoo.png";
import profile from "../../Images/one.png";
import sales from "../../Images/sale.png";
import petrol from "../../Images/sum.png";
import epxenses from "../../Images/expenses.png";
import report from "../../Images/repo.png";
import stock from "../../Images/stock.png";
import pend from "../../Images/quality.png";
import settings from "../../Images/setting.png";
import message from "../../Images/chat.png";
import logout from "../../Images/login.png";
import overview from "../../Images/routine.png";

export default function Home() {
  return (
    <div className="mainpage">
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
          <div className="sectcont">
            <img src={home} alt="" />
            <p>Dashboard</p>
          </div>

          <div className="sectcont">
            <img src={sales} alt="" />
            <p>Sales</p>
          </div>

          <div className="sectcont">
            <img src={epxenses} alt="" />
            <p>Epxenses</p>
          </div>

          <div className="sectcont">
            <img src={report} alt="" />
            <p>Daily Report</p>
          </div>

          <div className="sectcont">
            <img src={stock} alt="" />
            <p>Manage Stock</p>
          </div>
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
                <Real />
              </div>
            </div>

            <div className="right">
              <div className="lowersects">
                <div className="logimg">
                  <img src={logout} alt="" />
                </div>

                <div className="cc">
                  <p>General Data</p>
                  <p id="cons">Consumption</p>
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={petrol} alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Petrol/Litre</p>

                      <div className="pri">
                        <p>Tsh 23000</p>
                        <img src={pend} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  <div className="ds"></div>
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={petrol} alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Diesel/Litre</p>

                      <div className="pri">
                        <p>Tsh 23000</p>
                        <img src={pend} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  <div className="ds"></div>
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
                    <p>Sales</p>
                  </div>

                  <div className="amount">
                    <p>120230340</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Expenses</p>
                  </div>

                  <div className="amount">
                    <p>120230340</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={report} alt="" />
                    <p>Remained Debts</p>
                  </div>

                  <div className="amount">
                    <p>120230340</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={stock} alt="" />
                    <p>Dipstick Stock</p>
                  </div>

                  <div className="amount">
                    <p>120230340</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="midsect">
            <div className="sectcont">
              <img src={home} alt="" />
              <p>Dashboard</p>
            </div>

            <div className="sectcont">
              <img src={sales} alt="" />
              <p>Sales</p>
            </div>

            <div className="sectcont">
              <img src={epxenses} alt="" />
              <p>Epxenses</p>
            </div>

            <div className="sectcont">
              <img src={report} alt="" />
              <p>Daily Report</p>
            </div>

            <div className="sectcont">
              <img src={stock} alt="" />
              <p>Dipstick Stock</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionthree"></div>
    </div>
  );
}
