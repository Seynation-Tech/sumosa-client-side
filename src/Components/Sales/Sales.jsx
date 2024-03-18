import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Sales.css";
import bell from "../../Images/notify.png";
import Graphs from "../Charts/Graphs";

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

axios.defaults.withCredentials = true;

export default function Sales() {
  const [prices, setPrices] = useState(false);
  const [dieselprice, setDieselprice] = useState("");
  const [petrolprice, setPetrolprice] = useState("");

  const { url, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [totalEarnings, setEarnings] = useState("0");
  const [dieselAmount, setdieselAmount] = useState("0");
  const [petrolAmount, setpetrolAmount] = useState("0");
  const [reasons, setReasons] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/billing/allpricings`, {
          withCredentials: true,
        });

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

        const dieselamout = Number(res.data[0].diesel);
        const petrolamount = Number(res.data[0].petrol);

        const pmsoneAmount =
          Number(
            Number(resptwo.data[0].closingdigital) -
              Number(resptwo.data[0].openingdigital)
          ) * petrolamount;
        const pmstwoAmount =
          Number(
            Number(respfour.data[0].closingdigital) -
              Number(respfour.data[0].openingdigital)
          ) * petrolamount;

        const agooneAmount =
          Number(
            Number(respone.data[0].closingdigital) -
              Number(respone.data[0].openingdigital)
          ) * dieselamout;
        const agotwoAmount =
          Number(
            Number(respthree.data[0].closingdigital) -
              Number(respthree.data[0].openingdigital)
          ) * dieselamout;

        // console.log(pmsoneAmount,pmstwoAmount,agooneAmount,agotwoAmount)

        const totalAmount = Number(
          pmsoneAmount + pmstwoAmount + agooneAmount + agotwoAmount
        );
        const totalPetrol = Number(pmsoneAmount) + Number(pmstwoAmount);
        const totalDiesel = Number(agooneAmount) + Number(agotwoAmount);

        setdieselAmount(totalDiesel);
        setpetrolAmount(totalPetrol);
        setEarnings(totalAmount);
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  }, []);

  const handleReasons = () => {
    setReasons(true);
  };

  const cancelReason = () => {
    setReasons(false);
  };

  const handleHandle = () => {
    setPrices(true);
  };

  const cancPrice = () => {
    setPrices(false);
  };

  const reasonsHandler = async () => {
    try {
      let pricings = {
        uid: date,
        petrol: petrolprice
      };

      // console.log(pmsOne)

      const resone = await axios.post(`${url}/api/billing/pricings`, pricings);

      // console.log(res)
      console.log(resone.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const priceHandler = async () => {
    try {
      let pricings = {
        uid: date,
        petrol: petrolprice,
        diesel: dieselprice,
      };

      // console.log(pmsOne)

      const resone = await axios.post(`${url}/api/billing/pricings`, pricings);

      // console.log(res)
      console.log(resone.data);

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

        <div className="upsections"></div>

        <div className="lowsections">
          <div className="lefts">
            <div className="dash">
              <div className="p">
                <p>Sales Overview</p>
                <p>Fuel Sale Metrics</p>
              </div>

              <div className="sss"></div>
            </div>

            <div className="ean">
              <div className="an">
                <p id="sd">Earnings</p>
                {/* <div className="bel">
                  <img src={bell} alt="" />
                </div> */}
              </div>

              <div className="en">
                <div className="mon">
                  <p>Tsh {totalEarnings}</p>
                </div>
                <div className="mm">
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div className="bbb">Last Month Summary</div>
          </div>
          <div className="lefts">
            <div className="alls">
              <div className="sds">
                <p>Tsh {petrolAmount}</p>
                <p>Current Petrol Sales </p>
              </div>
              <div className="sds">
                <p>Tsh {dieselAmount}</p>
                <p>Current Diesel Earnings</p>
              </div>
            </div>

            <div className="bbb">Sales Difference Tsh 5000</div>

            <div className="stoc">
              <div className="bb" onClick={handleHandle}>
                Price Changes
              </div>
              <div className="bb">Difference Data</div>
            </div>
          </div>

          {/* <div className="rights">
                        <div className="grs">
                            <Graphs />
                        </div>

                        <div className="ls">

                        </div>
                    </div> */}
        </div>
      </div>

      {reasons && (
        <div className="poppesao">
          <div className="contentonesty">
            <div className="canc" onClick={cancPrice}>
              <img src="" alt="" />
            </div>
            <div className="ours">
              <div className="sdacont">
                <div className="jins">
                  <p>TOTAL CASH DIFFERENCES</p>
                </div>
                <div className="forms">
                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      placeholder="Petrol"
                      value={petrolprice}
                      onChange={(e) => setPetrolprice(e.target.value)}
                    />
                  </div>

                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      placeholder="Diesel "
                      value={dieselprice}
                      onChange={(e) => setDieselprice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="remember-opt">
                  <button onClick={priceHandler} className="sign-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {prices && (
        <div className="poppesao">
          <div className="contentonesty">
            <div className="canc" onClick={cancPrice}>
              <img src="" alt="" />
            </div>
            <div className="ours">
              <div className="sdacont">
                <div className="jins">
                  <p>CHANGE MONTHLY PRICE </p>
                </div>
                <div className="forms">
                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      placeholder="Petrol"
                      value={petrolprice}
                      onChange={(e) => setPetrolprice(e.target.value)}
                    />
                  </div>

                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      placeholder="Diesel "
                      value={dieselprice}
                      onChange={(e) => setDieselprice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="remember-opt">
                  <button onClick={priceHandler} className="sign-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sectionthrees">
        <div className="year">
          <div className="dail">
            <p>DAILY</p>
          </div>

          <div className="dail">
            <p>WEEKLY</p>
          </div>

          <div className="dail">
            <p>MONTHLY</p>
          </div>

          <div className="dail">
            <p>YEARLY</p>
          </div>

          <div className="download">
            <p>Download Report</p>
            <div className="down">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <Graphs />

        <div className="pays">
          <p>Payments</p>

          <div className="pesa">
            <div className="mpesa">
              <p>M-PESA</p>
            </div>

            <div className="mpesa">
              <p>NMB</p>
            </div>

            <div className="mpesa">
              <p>CRDB</p>
            </div>

            <div className="mpesa">
              <p>DEBTORS</p>
            </div>
          </div>

          {/* <div className="search">
                        <input type="text" placeholder="Search" />
                    </div> */}

          {/* <div className="other">
                        <img src="" alt="" />
                    </div> */}
        </div>

        <div className="con">
          {/* <div className="sea">
                        <p>Payments</p>
                        <div className="search">
                            <input type="text" placeholder="Search " />
                            <img src="" alt="" />
                        </div>
                    </div> */}

          <div className="tbb">
            <p>S/N</p>
            <p>Name</p>
            <p>Amount</p>
            <p>Mode</p>
            <p>Date</p>
          </div>
        </div>
        <div className="ls">
          {/* <div className="crc"></div> */}

          <div className="lft">
            <div className="alld">
              <table className="home-table">
                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>12,000,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Theonest Basina</td>
                  <td>12,000,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>

                <tbody>
                  <td>01</td>
                  <td>Apolinary Theonest Basina</td>
                  <td>300,000/=</td>
                  <td>Cash</td>
                  <td>Tues,12/09/2024</td>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rght"></div>
        </div>
      </div>
    </div>
  );
}
