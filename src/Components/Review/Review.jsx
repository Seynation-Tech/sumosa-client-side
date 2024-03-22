import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Review.css";
import bell from "../../Images/notify.png";
import Real from "../Charts/Real";
import Monthly from "../Charts/Expmonthly";
import Weekly from "../Charts/Expweekly";

import axios from "axios";
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

axios.defaults.withCredentials = true;

export default function Review() {
  const [usage, setUsage] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(false);
  const { url, diff, days, zrepos, totalEarnings, dieselAmount, petrolAmount } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [tableData, setData] = useState([]);

  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);

  const [totalexpense, setTotalexpense] = useState("0");

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          // console.log(pmsOne)

          const resptwo = await axios.get(`${url}/api/billing/allexpenses`, {
            withCredentials: true,
          });
          // console.log(resptwo.data);
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
    }, 3500);
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

  const handleExpenses = () => {
    setExpenses(true);
  };

  const cancelExpense = () => {
    setExpenses(false);
  };

  const expenseHandler = async () => {
    try {
      const uid = days.toLowerCase() + "," + date;
      let debtors = {
        uid: uid,
        usages: usage,
        amount: amount,
      };

      // console.log(pmsOne)

      const resone = await axios.post(`${url}/api/billing/expenses`, debtors);

      // console.log(res)
      alert(resone.data);
      // console.log(resone.data);

      //
    } catch (err) {
      setLoading(false);
      console.log(err);
      //   setError("Please refresh...");
    }
  };

  return (
    <div className="mysals">
      <Sidebar />

      <div className=""></div>

      <div className="sectionthres">
        <div className="general">
          <p>GENERAL REPORT</p>
        </div>

        <div className="report">
          <div className="line"></div>
          <div className="allo">
            <div className="allrep">
              <div className="dda">
                <div className="dots"></div>
                <p className="moja">Total amount</p>
              </div>

              <p className="mbili">Tsh {totalEarnings}</p>
            </div>

            <div className="allrep">
              <div className="dda">
                <div className="dots"></div>
                <p className="moja">Z-Report</p>
              </div>

              <p className="mbili">Tsh {zrepos}</p>
            </div>

            <div className="allrep">
              <div className="dda">
                <div className="dots"></div>
                <p className="moja">Sales difference</p>
              </div>

              <p className="mbili">Tsh {diff}</p>
            </div>

            <div className="allrep">
              <div className="dda">
                <div className="dots"></div>
                <p className="moja">Debts amount</p>
              </div>

              <p className="mbili">Tsh {totalEarnings}</p>
            </div>
          </div>

          <div className="conts">
            <div className="prics">
                <p>PMS 01</p>
              <p>Tsh {0}</p>
            </div>

            <div className="prics">
                <p>PMS 02</p>
              <p>Tsh {0}</p>
            </div>

            <div className="prics">
                <p>AGO 01</p>
              <p>Tsh {0}</p>
            </div>

            <div className="prics">
                <p>AG0 02</p>
              <p>Tsh {0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
