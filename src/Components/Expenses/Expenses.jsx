import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Expenses.css";
import cancs from "../../Images/o.png";
import Real from "../Charts/Real";
import Monthly from "../Charts/Expmonthly";
import Weekly from "../Charts/Expweekly";
import "./Mobile.css";
import axios from "axios";
import pen from "../../Images/pen.png";
import { AuthContext } from "../AuthContext";

let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
let mydate =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  " " +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();

const currentDate = new Date();
const currentDayofWeek = currentDate.getDay();

const startDate = new Date(currentDate);
startDate.setDate(currentDate.getDate() - currentDayofWeek + 1);

const endDate = new Date(currentDate);
endDate.setDate(currentDate.getDate() - currentDayofWeek + 7);

const formattedStartDate = currentDate.toISOString().split("T")[0];
const formattedEndDate = endDate.toISOString().split("T")[0];

// console.log(formattedStartDate)

axios.defaults.withCredentials = true;

export default function Expenses() {
  const [usage, setUsage] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(false);
  const { url, days } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [tableData, setData] = useState([]);
  const [deletes, setDelete] = useState(false);

  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [notification, setNotification] = useState("");
  const [totalexpense, setTotalexpense] = useState("0");
  const [notify, setNotify] = useState(false);

  const [sidbar, setSisdebar] = useState("desktop");
  const [alldat, setAlls] = useState([]);
  const [ids, setIds] = useState("");

  const [sidebar, setSidebar] = useState(false);
  const [delets, setDelets] = useState(false);

  const [name, setName] = useState("");
  const [amounts, setAmounts] = useState("");

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const resptwo = await axios.get(`${url}/api/billing/allexpenses`, {
            withCredentials: true,
          });
          let expens = 0;
          for (let i = 0; i < resptwo.data.length; i++) {
            expens = Number(resptwo.data[i].amount) + expens;
            setTotalexpense(expens);
            // console.log(expens)
          }

          setData(resptwo.data);

          //
        } catch (err) {
          setLoading(false);
          console.log(err);
          // setError( "Please refresh..." );
        }
      };
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWeekly = () => {
    setWeekly(true);
    setYearly(false);
    setMonthly(false);
  };

  const handleMonthly = () => {
    setWeekly(false);
    setYearly(false);
    setMonthly(true);
  };

  const cancpop = () => {
    setDelete(false);
    setDelets(false);
  };

  const popdelete = () => {
    setDelete(false);
    setDelets(true);
  };

  const cancPopdelete = () => {
    setDelete(false);
  };

  const handleExpenses = () => {
    setExpenses(true);
    setNotify(false);
  };

  const cancelExpense = () => {
    setExpenses(false);
    setNotify(false);
  };

  const expenseHandler = async () => {
    if (usage && amount) {
      try {
        const uid = days.toLowerCase() + "," + date;
        let debtors = {
          uid: formattedStartDate,
          usages: usage,
          amount: amount,
        };

        // console.log(pmsOne)

        const resone = await axios.post(`${url}/api/billing/expenses`, debtors);

        setNotify(true);
        setNotification(resone.data);
        setLoading(false);
        setExpenses(false);

        setExpenses(false);
        setNotify(false);
        setDelete(false);
        setDelets(false);

        // setAmounts("")
        // setName("")

        //
      } catch (err) {
        setLoading(false);
        console.log(err);
        //   setError("Please refresh...");
      }
    } else {
      setNotify(true);
      setNotification("Fill all fields!");
    }
  };

  const deletePop = async (e) => {
    setDelete(true);

    // console.log(e)
    setName(e?.usages);
    setAmounts(e?.amount);
    setIds(e?.id);

    try {
      const respfour = await axios.get(`${url}/api/billing/expenses/${e?.id}`, {
        withCredentials: true,
      });

      // setName("")
      // setAmounts("")
      setExpenses(false);
      setNotify(false);
      // setDelete( false );
      setDelets(false);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError( "Please refresh..." );
    }
  };

  const deleteHandler = async (e) => {
    try {
      //  alert(alldat.name)
      const resone = await axios.delete(`${url}/api/billing/expenses/${ids}`, {
        withCredentials: true,
      });
      setNotify(true);
      setNotification(resone.data);
      setLoading(false);
      setExpenses(false);
      setNotify(false);
      setDelete(false);
      setDelets(false);
    } catch (err) {}
  };

  const updateExpenses = async (e) => {
    setNotify(false);

    // const uid = (e.target.value)
    // alert(ids)

    let data = {
      usages: name,
      amount: amounts,
    };

    try {
      const res = await axios.put(`${url}/api/billing/expenses/${ids}`, data, {
        withCredentials: true,
      });
      // setStatus(res.data)
      setNotify(true);

      setNotification(res.data);
      // setName("")
      // setAmounts("")
      setExpenses(false);
      setNotify(false);
      setDelete(false);
      setDelets(false);

      // console.log(res.data)

      // setNotfs(true)
      setLoading(false);
      // setStatus(res.data);
    } catch (err) {
      // setNotfs(true)
      // setStatus("Registration Failed!");
    }
  };

  return (
    <div className="mysals">
      <Sidebar />

      <div className={sidbar}>{/* <Sidebar /> */}</div>

      <div className={sidbar}>{/* <Sidebar /> */}</div>

      <div className=""></div>

      <div className="sectionthres">
        {/* <div className="general">
          <p>EXPENSES MANAGEMENT REPORT</p>
        </div> */}

        {/* 
        {weekly &&  <Weekly />}
        {monthly && <Monthly />} */}

        {expenses && (
          <div className="poppes">
            <div className="contentonesya">
              <div className="canc" onClick={cancelExpense}>
                <img src={cancs} alt="" />
              </div>
              <div className="ours">
                <div className="sdacont">
                  <div className="jins">
                    <p>EXPENSES' REPORT</p>
                  </div>
                  <div className="forms">
                    <div className="input-two">
                      {/* <i>icon</i> */}
                      <input
                        placeholder="Usage"
                        value={usage}
                        onChange={(e) => setUsage(e.target.value)}
                      />
                    </div>

                    <div className="input-two">
                      {/* <i>icon</i> */}
                      <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {notify && (
                    <div className="inputmya">
                      <p>{notification}</p>
                    </div>
                  )}

                  <div className="remember-opt">
                    <button onClick={expenseHandler} className="sign-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {delets && (
          <div className="poppesaoo">
            <div className="contentonestyo">
              <div className="canc" onClick={cancpop}>
                <img src={cancs} alt="" />
                {/* <p>x</p> */}
              </div>
              <div className="ours">
                <div className="sdacont">
                  <div className="totalcash">
                    <p>DELETE' DETAILS? </p>
                  </div>
                  <div className="forms">
                    <div className="areyou">
                      <p>Are you sure to delete?</p>
                    </div>

                    <div className="inputo">
                      <button onClick={cancpop}>No</button>
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

        {deletes && (
          <div className="poppesaoo">
            <div className="contentonestyo">
              <div className="canc" onClick={cancPopdelete}>
                <img src={cancs} alt="" />
              </div>
              <div className="ours">
                <div className="sdacont">
                  <div className="totalcash">
                    <p>UPDATE EXPENSES </p>
                  </div>

                  <div className="forms">
                    <div className="input-two">
                      {/* <i>icon</i> */}
                      <input
                        type="text"
                        placeholder="Usage"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="input-two">
                      <input
                        type="text"
                        placeholder="Amount "
                        value={amounts}
                        onChange={(e) => setAmounts(e.target.value)}
                      />
                    </div>
                  </div>

                  {notify && (
                    <div className="inputmy">
                      <p>{notification}</p>
                    </div>
                  )}

                  <div className="inputo">
                    <button onClick={popdelete}>DELETE</button>
                    <button onClick={updateExpenses}>UPDATE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="paysa">
          <p>EXPENSES GENERAL REPORT</p>

          <div className="pesaa">
            <div className="mpesaa">
              <p>Total: Tsh {Number(totalexpense).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="lss">
          {/* <div className="crc"></div> */}

          <div className="lft">
            <div className="alld">
              <table className="home-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>USAGES</th>
                    <th>AMOUNT</th>

                    <th>DATE</th>

                    <th></th>
                  </tr>
                </thead>
                {tableData.map((val, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{val.usages}</td>
                      <td>{Number(val.amount).toLocaleString()}</td>
                      <td>{val.uid.split(",")[0]}</td>

                      <div className="editexp" onClick={(e) => deletePop(val)}>
                        <img src={pen} alt="" />
                      </div>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>

          <div className="addexpenses" onClick={handleExpenses}>
            <button>Add Expenses</button>
          </div>
          <div className="rght"></div>
        </div>
      </div>
    </div>
  );
}
