import React, { useContext, useEffect, useState } from "react";
import Daily from "../Charts/Daily";
import Graphs from "../Charts/Graphs";
import Monthly from "../Charts/Monthly";
import Yearly from "../Charts/Yearly";
import Sidebar from "../Sidebar/Sidebar";
import "./Sales.css";

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

axios.defaults.withCredentials = true;

export default function Sales() {
  const [prices, setPrices] = useState(false);
  const [dieselprice, setDieselprice] = useState("");
  const [petrolprice, setPetrolprice] = useState("");

  const {
    url,
    diff,
    zrepos,
    totalEarnings,
    dieselAmount,
    petrolAmount
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [amountinwords, setAmountinwords] = useState("");

  const [reasons, setReasons] = useState(false);

  const [weekly, setWeekly] = useState(false);
  const [daily, setDaily] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [tableData, setData] = useState([]);


  const [alldat, setAlls] = useState([]);
  const [click, setClick] = useState(false);


  useEffect(() => {
    setLoading(true);
    // const interval = setInterval(() => {
    const fetchData = async () => {
      try {
        const dets = await axios.get(`${url}/api/billing/debtors`, {
          withCredentials: true,
        });

        setData(dets.data)
        console.log(dets.data)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  // }, 1500);
  // return () => clearInterval(interval);
  }, []);

  const handleWeekly = () => {
    setWeekly(true);
    setDaily(false);
    setYearly(false);
    setMonthly(false);
  };

  const handleMonthly = () => {
    setWeekly(false);
    setDaily(false);
    setYearly(false);
    setMonthly(true);
  };

  const handleDaily = () => {
    setWeekly(false);
    setDaily(true);
    setYearly(false);
    setMonthly(false);
  };

  const handleYearly = () => {
    setWeekly(false);
    setDaily(false);
    setYearly(true);
    setMonthly(false);
  };

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

  const popClick = () => {
    setClick(true);
  };


  const reasonsHandler = async () => {
    try {
      let inwords = {
        uid: date,
        differencereason: reason,
        totalamount: amountinwords,
      };

      // console.log(pmsOne)

      const resone = await axios.post(`${url}/api/billing/reason`, inwords);

      // console.log(res)
      console.log(resone.data);
      alert(resone.data);

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
      alert(resone.data);
      console.log(resone.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const debtorcrediLoad = async () => {
    try {
      const respfour = await axios.get(`${url}/api/billing/debtors`, {
        withCredentials: true,
      });
      setData(respfour.data);
      // alert(respfour.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const creditorLoad = async () => {
    try {
      const respfour = await axios.get(`${url}/api/billing/creditors`, {
        withCredentials: true,
      });
      setData(respfour.data);
      // alert(respfour.data);

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
                <p>Today's Petrol Sales </p>
              </div>
              <div className="sds">
                <p>Tsh {dieselAmount}</p>
                <p>Today's Diesel Earnings</p>
              </div>
            </div>

            <div className="bbb">Sales Difference Tsh {diff}</div>

            <div className="stoc">
              <div className="bb" onClick={handleHandle}>
                Price Changes
              </div>
              <div className="bb" onClick={handleReasons}>
                Z-Report
              </div>
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
            <div className="canc" onClick={cancelReason}>
              <img src="" alt="" />
            </div>
            <div className="ours">
              <div className="sdacont">
                <div className="jins">
                  <p>TOTAL CASH DIFFERENCES</p>
                </div>
                <div className="forms">
                  <div className="input-twos">
                    {/* <i>icon</i> */}
                    <p>CASH</p>
                    <p>{totalEarnings}</p>
                  </div>

                  <div className="input-twos">
                    {/* <i>icon</i> */}
                    <p>Z-REPORT</p>
                    <p>{zrepos}</p>
                  </div>

                  <div className="input-twoos">
                    {/* <i>icon</i> */}
                    <p>DIFFERENCE</p>
                    <p>9087009</p>
                  </div>
                </div>
                <div className="input-twoo">
                  {/* <i>icon</i> */}
                  <input
                    placeholder="Reason of the difference"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <div className="input-too">
                  {/* <i>icon</i> */}
                  <input
                    placeholder="Amounts collected in words"
                    value={amountinwords}
                    onChange={(e) => setAmountinwords(e.target.value)}
                  />
                </div>

                <div className="remember-opt">
                  <button onClick={reasonsHandler} className="sign-bt">
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
          <div className="dail" onClick={handleDaily}>
            <p>DAILY</p>
          </div>

          <div className="dail" onClick={handleWeekly}>
            <p>WEEKLY</p>
          </div>

          <div className="dail" onClick={handleMonthly}>
            <p>MONTHLY</p>
          </div>

          <div className="dail" onClick={handleYearly}>
            <p>YEARLY</p>
          </div>

          <div className="download">
            <p>Download Report</p>
            <div className="down">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        {daily && <Daily />}
        {weekly && <Graphs />}

        {monthly && <Monthly />}

        {yearly && <Yearly />}

        <div className="pays">
          <p>Payments</p>

          <div className="pesa">
            <div className="mpesa">
              <p onClick={debtorcrediLoad}>DEBTORS</p>
            </div>
            <div className="mpesa">
              <p onClick={creditorLoad}>CREDITORS</p>
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
                <tbody onClick={popClick}>
                  {tableData.map((val, key) => {
                    return (
                      <tr onClick={() => setAlls(val)}>
                        <td>{key + 1}</td>
                        <td>{val.name}</td>
                        <td>{Number(val.amount).toLocaleString()}</td>
                        <td>{val?.modeofpay || "-"}</td>
                        <td>{val.uid}</td>
                      </tr>
                    );
                  })}
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
