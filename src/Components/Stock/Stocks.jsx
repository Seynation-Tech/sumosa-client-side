import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import bell from "../../Images/notify.png";
import Graphs from "../Charts/Graphs";
import "./Stock.css";

import moment from "moment";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "cookie-universal";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

let today = new Date();
let date =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  "," +
  today.getHours() +
  ":" +
  today.getMinutes();
let mydate =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  "," +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();

export default function Sales() {
  const {
    pmsonelitres,
    pmstwolitres,
    agoonelitres,
    agotwolitres,
    petrollitres,
    diesellitres,
    lastpetrol,
    lastdiesel,
    url,
  } = useContext(AuthContext);

  const [weekly, setWeekly] = useState(false);
  const [daily, setDaily] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [tableData, setData] = useState([]);
  const [tableDat, setDatas] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const respone = await axios.get(`${url}/api/pumps/dieselone/`, {
          withCredentials: true,
        });

        const resptwo = await axios.get(`${url}/api/pumps/petrolone/`, {
          withCredentials: true,
        });

        const respthree = await axios.get(`${url}/api/pumps/dieseltwo/`, {
          withCredentials: true,
        });

        const respfour = await axios.get(`${url}/api/pumps/petroltwo/`, {
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
      <Sidebar />

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

              <div className="sss"></div>
            </div>
            <div className="alls">
              <div className="sds">
                <p>{petrollitres} L</p>
                <p>Total Petol Litres </p>
              </div>
              <div className="sds">
                <p> {diesellitres} L</p>
                <p>Total Diesel Litres</p>
              </div>
            </div>

            <div className="bbbs">
              <p id="ll">Last Stock Summary</p>
              <div className="lats">
                <p>Petrol: {lastpetrol} L</p>
                <p>Diesel: {lastdiesel} L</p>
              </div>
            </div>

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

              <p>{pmsonelitres} L</p>
            </div>
            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>PMS 02</p>
              </div>

              <p>{pmstwolitres} L</p>
            </div>

            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>AGO 01</p>
              </div>

              <p>{agoonelitres} L</p>
            </div>

            <div className="bbba">
              <div className="sdaa">
                <div className="da"></div>
                <p>AGO 02</p>
              </div>

              <p>{agotwolitres} L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionthrees">
        <div className="year">
          <div className="dail" onClick={handlePmsone}>
            <p>PMS 01</p>
          </div>

          <div className="dail" onClick={handlePmstwo}>
            <p>PMS 02</p>
          </div>

          <div className="dail" onClick={handleAgoone}>
            <p>AGO 01</p>
          </div>

          <div className="dail" onClick={handleAgotwo}>
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
                      <td>{val.uid}</td>
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
                      <td>{val.uid}</td>
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
