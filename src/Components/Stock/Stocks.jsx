import React, { useContext, useEffect, useState } from "react";
import growth from "../../Images/sum.png";
import Sidebar from "../Sidebar/Sidebar";
import "./Stock.css";
import { NavLink } from "react-router-dom";
import growths from "../../Images/evs.png";
import axios from "axios";
import { AuthContext } from "../AuthContext";

let today = new Date();

export default function Sales() {
  const { lastpetrol, lastdiesel, url, values } = useContext(AuthContext);
  const [notify, setNotify] = useState(false);
  const [notification, setNotification] = useState("");
  const [setdelete, setDeletename] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [daily, setDaily] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [tableData, setData] = useState([]);
  const [tableDat, setDatas] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const resptwo = await axios.get(`${url}/api/pumps/petrolone/`, {
          withCredentials: true,
        });

        setData(resptwo.data);

        // console.log(last_value.zreport)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  }, []);

  const handlePmsone = async () => {
    try {
      // console.log(pmsOne)

      const resptwo = await axios.get(`${url}/api/pumps/petrolone/`, {
        withCredentials: true,
      });

      setData(resptwo.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const handlePmstwo = async () => {
    try {
      // console.log(pmsOne)

      const resptwo = await axios.get(`${url}/api/pumps/petroltwo/`, {
        withCredentials: true,
      });

      setData(resptwo.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const handleAgoone = async () => {
    try {
      // console.log(pmsOne)

      const respone = await axios.get(`${url}/api/pumps/dieselone/`, {
        withCredentials: true,
      });

      setData(respone.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const handleAgotwo = async () => {
    try {
      // console.log(pmsOne)

      const respone = await axios.get(`${url}/api/pumps/dieseltwo/`, {
        withCredentials: true,
      });

      setData(respone.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  return (
    <div className="mysales">

      <div className="opa">
           <Sidebar />
      </div>
      <div className=""></div>
      <div className="sectiontwos">
        <div className="lineage"></div>

        <div className="upsections">
          <p>FUEL LITRES METRICS</p>
        </div>

        <div className="lowsections">
          <div className="lefts">
            <div className="dashs">
              <div className="ps">
                <p>Litres Overview</p>
                <p>Current Sale Metrics</p>
              </div>

              <div className="sss">
                <img src={growth} style={{ width: "23px" }} alt="" />
              </div>
            </div>
            <div className="alls">
              <div className="sds">
                <p>
                  {Number(
                    Number(values.pmsonedigitaloutput) +
                      Number(values.pmstwodigitaloutput)
                  ).toLocaleString()}{" "}
                  L
                </p>
                <p>Total Petol Litres </p>
              </div>
              <div className="sds">
                <p>
                  {" "}
                  {Number(
                    Number(values.agoonedigitaloutput) +
                      Number(values.agotwodigitaloutput)
                  ).toLocaleString()}{" "}
                  L
                </p>
                <p>Total Diesel Litres</p>
              </div>
            </div>

            <NavLink to="/sales" className="bbbs">
              <div className="tota">
              <img src={growths} style={{ width: "23px" }} alt="" />
                <p>TOTAL SALES</p>
              </div>
            </NavLink>

            {/* <div className="stoc">
              <div className="bba">Analog Value</div>
              <div className="bba">Digial Value</div>
            </div> */}
          </div>

          <div className="leftsa">
            <div className="bbbsa">Total Digital Value</div>
            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>PMS 01</p>
              </div>

              <p>{Number(values.pmsonedigitaloutput).toLocaleString()} L</p>
            </div>
            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>PMS 02</p>
              </div>

              <p>{Number(values.pmstwodigitaloutput).toLocaleString()} L</p>
            </div>

            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>AGO 01</p>
              </div>

              <p>{Number(values.agoonedigitaloutput).toLocaleString()} L</p>
            </div>

            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>AGO 02</p>
              </div>

              <p>{Number(values.agotwodigitaloutput).toLocaleString()} L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionthreesa">
        <div className="yeara">
          <div className="daila" onClick={handlePmsone}>
            <p>PMS 01</p>
          </div>

          <div className="daila" onClick={handlePmstwo}>
            <p>PMS 02</p>
          </div>

          <div className="daila" onClick={handleAgoone}>
            <p>AGO 01</p>
          </div>

          <div className="daila" onClick={handleAgotwo}>
            <p>AGO 02</p>
          </div>

          {/* <div className="downloads">
            <p>Weekly</p>
            <div className="downs">
              <img src="" alt="" />
            </div>
          </div> */}
        </div>
        {/* <Graphs /> */}

        <div className="pays">
          <p>DIGITAL LITRES OUTPUT VALUES</p>

          {/* <div className="search">
            <input type="text" placeholder="Search" />
          </div> */}
        </div>

        <div className="ls">
          <div className="crcs"></div>

          <div className="lft">
            <div className="alld">
              <table className="home-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>DATE</th>
                    <th>CLOSING</th>

                    <th>OPENING</th>
                    <th>OUPTUT</th>
                  </tr>
                </thead>
                {tableData.map((val, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{val.uid.split(",")[0]}</td>
                      <td>{Number(val.closingdigital).toLocaleString()}</td>
                      <td>{Number(val.openingdigital).toLocaleString()}</td>
                      <td>{Number(val.outputvalue).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="rght"></div>
        </div>

        <div className="pays">
          <p>ANALOG LITRES OUTPUT VALUES</p>
        </div>

        <div className="ls">
          <div className="crcs"></div>

          <div className="lft">
            <div className="alld">
              <table className="home-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>DATE</th>
                    <th>CLOSING</th>

                    <th>OPENING</th>
                    <th>OUPTUT</th>
                  </tr>
                </thead>
                {tableData.map((val, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{val.uid.split(",")[0]}</td>
                      <td>{Number(val.closingsanalog).toLocaleString()}</td>
                      <td>{Number(val.openinganalog).toLocaleString()}</td>
                      <td>{Number(val.outputvalue).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="rght"></div>
        </div>
      </div>
    </div>
  );
}
