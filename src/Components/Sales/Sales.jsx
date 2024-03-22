import React, { useContext, useEffect, useState } from "react";
import Daily from "../Charts/Daily";
import Graphs from "../Charts/Graphs";
import Monthly from "../Charts/Monthly";
import Yearly from "../Charts/Yearly";
import Sidebar from "../Sidebar/Sidebar";
import "./Sales.css";
import "./Mobile.css"
import downlo from "../../Images/download.png";
import drop from "../../Images/dropdo.png";

import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

axios.defaults.withCredentials = true;

export default function Sales() {
  const [prices, setPrices] = useState(false);
  const [dieselprice, setDieselprice] = useState("");
  const [petrolprice, setPetrolprice] = useState("");

  const { url, diff, days, zrepos, totalEarnings, dieselAmount, petrolAmount } =
    useContext(AuthContext);
  const [loadings, setLoading] = useState(false);
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
  const [notify, setNotify] = useState(false);

  const [setdelete,setDeletename] = useState("");
  const [sidebar, setSidebar] = useState(false);

  const [notification, setNotification] = useState("");
  const [deletes, setDelete] = useState(false);

  const navigate = useNavigate();
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    setLoading(true);
    // const interval = setInterval(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0,0)
        const dets = await axios.get(`${url}/api/billing/debtors`, {
          withCredentials: true,
        });

        setData(dets.data);
        // console.log(dets.data)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
    // }, 1500);
    // return () => clearInterval(interval);
  }, []);

  const popUpside = () => {

    let flag = sidebar;
    flag = !flag;
    setSidebar(flag);
  };

  const deletePop = () => {
    setDelete(true);
  };

  const cancPopdelete =()=>{
    setDelete(false);
  }

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
    setNotify(false);
  };

  const cancelReason = () => {
    setReasons(false);
    setNotify(false);
  };

  const handleHandle = () => {
    window.scrollTo(0,0)
    setPrices(true);
    setNotify(false);
  };

  const cancPrice = () => {
    setPrices(false);
    setNotify(false);
  };

  const popClick = () => {
    setClick(true);
    setNotify(false);
  };

  const handleLitres = () => {
    navigate("/sales/litres");
  };

  const deleteHandler = async(e)=>{
    try{
//  alert(alldat.name)
      const resone = await axios.delete(`${url}/api/billing/debtors/${alldat.name}`,{withCredentials: true});
        setNotify(true);
        setNotification(resone.data);
        setLoading(false);

    }catch(err){

    }
  }

  const reasonsHandler = async () => {
    if (reason && amountinwords) {
      try {
        let inwords = {
          uid: date,
          differencereason: reason,
          totalamount: amountinwords,
        };
        setLoading(true);

        const resone = await axios.post(`${url}/api/billing/reason`, inwords);
        setNotify(true);
        setNotification(resone.data);
        setLoading(false);
        //
      } catch (err) {
        setLoading(false);
        console.log(err);
        // setError( "Please refresh..." );
      }
    } else {
      setNotify(true);
      setNotification("Fill all the details!");
    }
  };

  const priceHandler = async () => {
    if (petrolprice && dieselprice) {
      try {
        const uid = days.toLowerCase() + "," + date;
        let pricings = {
          uid: uid,
          petrol: petrolprice,
          diesel: dieselprice,
        };

        setLoading(true);
        const resone = await axios.post(
          `${url}/api/billing/pricings`,
          pricings
        );
        setNotify(true);
        setNotification(resone.data);
        setLoading(false);

        //
      } catch (err) {
        setLoading(false);
      }
    } else {
      setNotify(true);
      setNotification("Fill all the details!");
    }
  };

  const debtorcrediLoad = async () => {
    try {
      const respfour = await axios.get(`${url}/api/billing/debtors`, {
        withCredentials: true,
      });
      setData(respfour.data);

      // setLoading(false);
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
       {sidebar && <Sidebar />}

       {/* <div className="upbove">
        <div className="aboveall">
          <img src={logos} alt="" />
        </div>
        <div className="aboves">
          <p>SUMOSA</p>
        </div>

        <img className="dropdo" onClick={popUpside} src={drop} alt="" />
      </div> */}

      <div className=""></div>
      <div className="sectiontwos">
        <div className="lineage"></div>

        <div className="upsections">FUEL SALES METRICS</div>

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

            <div className="bbbp"> SUMOSA FILLING STATION</div>
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

            <div className="bbb">
              <p>Sales Difference</p>
              <p>{diff}/=</p>
            </div>

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
          <div className="contentonestya">
            <div className="canc" onClick={cancelReason}>
              <img src="" alt="" />
            </div>
            <div className="ours">
              <div className="sdacont">
                <div className="totalcash">
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

                {notify && (
                  <div className="inputmy">
                    <p>{notification}</p>
                  </div>
                )}
                {/* 
                {loadings ? (
              <div className="spin">
                {" "}
                <DotLoader
                  color={color}
                  loading={loadings}
                  // cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <></>
            )} */}

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

      
{deletes && (
        <div className="poppesao">
          <div className="contentonesty">
            {/* <div className="canc" onClick={cancPrice}>
              <img src="" alt="" />
            </div> */}
            <div className="ours">
              <div className="sdacont">
                <div className="totalcash">
                  <p>CLIENTS' DETAILS? </p>
                </div>
                <div className="forms">
                  <div className="userinfo">
                    <div className="infos">
                      <p>NAME</p>
                      <p>{alldat?.name}</p>
                    </div>
                    <div className="infos">
                      <p>AMOUNT</p>
                      <p>{alldat?.amount}</p>
                    </div>
                    <div className="infos">
                      <p>DATE</p>
                      <p>{alldat?.date}</p>
                    </div>
                  </div>

                  <div className="areyou">
                    <p>Are you sure to delete?</p>
                  </div>

                  <div className="inputo">
                    <button onClick={cancPopdelete}>No</button>
                    <button onClick={deleteHandler}>Yes</button>
                  </div>
                </div>

                {notify && (
                  <div className="inputmy">
                    <p>{notification}</p>
                  </div>
                )}

                {/* {loadings ? (
              <div className="spin">
                {" "}
                <DotLoader
                  color={color}
                  loading={loadings}
                  // cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <></>
            )} */}

            
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
                <div className="totalcash">
                  <p>CHANGE MONTHLY PRICE </p>
                </div>

                <div className="forms">
                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      type="number"
                      placeholder="Petrol"
                      value={petrolprice}
                      onChange={(e) => setPetrolprice(e.target.value)}
                    />
                  </div>

                  <div className="input-two">
                    {/* <i>icon</i> */}
                    <input
                      type="number"
                      placeholder="Diesel "
                      value={dieselprice}
                      onChange={(e) => setDieselprice(e.target.value)}
                    />
                  </div>
                </div>

                {notify && (
                  <div className="inputmy">
                    <p>{notification}</p>
                  </div>
                )}

                {/* {loadings ? (
              <div className="spin">
                {" "}
                <DotLoader
                  color={color}
                  loading={loadings}
                  // cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <></>
            )} */}

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
          {/* <div className="dail" onClick={handleDaily}>
            <p>DAILY</p>
          </div> */}

          <div className="dail" onClick={handleWeekly}>
            <p>WEEKLY</p>
          </div>

          <div className="dail" onClick={handleMonthly}>
            <p>MONTHLY</p>
          </div>

          <div className="dails" onClick={handleLitres}>
            <p>LITRES</p>
          </div>

          <div className="download">
            <p>Report</p>
            <div className="down">
              <img src={downlo} alt="" />
            </div>
          </div>
        </div>
        {daily && <Daily />}
        {weekly && <Graphs />}

        {monthly && <Monthly />}

        {yearly && <Yearly />}

        <div className="payo">
          <p id='pa'>PAYMENT</p>

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

        {/*  */}
        <div className="ls">
          {/* <div className="crc"></div> */}

          <div className="lft">
            <div className="alld">
              <table className="home-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                    <th>MODE</th>
                    <th>DATE</th>
                    <div className="delets"></div>
                  </tr>
                </thead>
                <tbody onClick={popClick}>
                  {tableData.map((val, key) => {
                    return (
                      <tr onClick={() => setAlls(val)}>
                        <td>{key + 1}</td>
                        <td>{val.name}</td>
                        <td>{Number(val.amount).toLocaleString()}</td>
                        <td>{val?.modeofpay || "-"}</td>
                        <td>{(val.uid).split(" ")[0]}</td>
                        <div className="deletes" onClick={deletePop}>
                          {/* <img src={delete} alt="" /> */}
                        </div>
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
