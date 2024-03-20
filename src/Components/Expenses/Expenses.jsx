import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Expenses.css";
import bell from "../../Images/notify.png";
import Real from "../Charts/Real";
import Monthly from "../Charts/Expmonthly";
import Weekly from "../Charts/Expweekly";

import axios from "axios";
import { AuthContext } from "../AuthContext";

let today = new Date();
let date =
  today.getDate() +
  "/" +
  ( today.getMonth() + 1 ) +
  "/" +
  today.getFullYear() +
  " " +
  today.getHours() +
  ":" +
  today.getMinutes();
let mydate =
  today.getDate() +
  "/" +
  ( today.getMonth() + 1 ) +
  "/" +
  today.getFullYear() +
  " " +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();

axios.defaults.withCredentials = true;

export default function Expenses ()
{
  const [ usage, setUsage ] = useState( "" );
  const [ amount, setAmount ] = useState( "" );
  const [ expenses, setExpenses ] = useState( false );
  const { url, login } = useContext( AuthContext );
  const [ loading, setLoading ] = useState( false );
  const [ tableData, setData ] = useState( [] );

  const [ weekly, setWeekly ] = useState( true );
  const [ monthly, setMonthly ] = useState( false );
  const [ yearly, setYearly ] = useState( false );

  const [ totalexpense, setTotalexpense ] = useState( "0" );

  useEffect( () =>
  {
    setLoading( true );

    // const interval = setInterval(() => {
    const fetchData = async () =>
    {
      try
      {
        // console.log(pmsOne)

        const resptwo = await axios.get( `${ url }/api/billing/allexpenses`, {
          withCredentials: true,
        } );
        // console.log(resptwo.data);
        let expens = 0;
        for ( let i = 0; i < resptwo.data.length; i++ )
        {
          expens = Number( resptwo.data[ i ].amount ) + expens;
          setTotalexpense( expens );
          // console.log(expens)
        }

        setData( resptwo.data );

        //
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        // setError( "Please refresh..." );
      }
    };
    fetchData();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [] );

  const handleWeekly = () =>
  {
    setWeekly( true );
    setYearly( false );
    setMonthly( false );
  };

  const handleMonthly = () =>
  {
    setWeekly( false );
    setYearly( false );
    setMonthly( true );
  };

  const handleExpenses = () =>
  {
    setExpenses( true );
  };

  const cancelExpense = () =>
  {
    setExpenses( false );
  };

  const expenseHandler = async () =>
  {
    try
    {
      let debtors = {
        uid: date,
        usages: usage,
        amount: amount,
      };

      // console.log(pmsOne)

      const resone = await axios.post( `${ url }/api/billing/expenses`, debtors );

      // console.log(res)
      alert( resone.data );
      // console.log(resone.data);

      //
    } catch ( err )
    {
      setLoading( false );
      console.log( err );
      //   setError("Please refresh...");
    }
  };

  return (
    <div className="mysals">
      <Sidebar />

      <div className=""></div>

      <div className="sectionthres">
        {/* <div className="general">
          <p>EXPENSES MANAGEMENT REPORT</p>
        </div> */}

        {/* 
        {weekly &&  <Weekly />}
        {monthly && <Monthly />} */}

        { expenses && (
          <div className="poppes">
            <div className="contentonesya">
              <div className="canc" onClick={ cancelExpense }>
                <img src="" alt="" />
              </div>
              <div className="ours">
                <div className="sdacont">
                  <div className="jins">
                    <p>EXPENSES' REPORT</p>
                  </div>
                  <div className="forms">
                    <div className="input-two">
                      {/* <i>icon</i> */ }
                      <input
                        placeholder="Usage"
                        value={ usage }
                        onChange={ ( e ) => setUsage( e.target.value ) }
                      />
                    </div>

                    <div className="input-two">
                      {/* <i>icon</i> */ }
                      <input
                        placeholder="Amount"
                        value={ amount }
                        onChange={ ( e ) => setAmount( e.target.value ) }
                      />
                    </div>
                  </div>

                  <div className="remember-opt">
                    <button onClick={ expenseHandler } className="sign-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) }

        <div className="paysa">
          <p>EXPENSES GENERAL REPORT</p>


          <div className="pesaa">
            <div className="mpesaa">
              <p>TOTAL: Tsh { Number( totalexpense ).toLocaleString() }</p>
            </div>
          </div>


        </div>

        <div className="lss">
          {/* <div className="crc"></div> */ }

          <div className="lft">
            <div className="alld">
              <table className="home-table">
              <thead>
                  <tr>
                    <th>S/N</th>
                    <th>USAGES</th>
                    <th>AMOUNT</th>

                    <th>DATE</th>
                  </tr>
                </thead>
                { tableData.map( ( val, key ) =>
                {
                  return (
                    <tr>
                      <td>{ key + 1 }</td>
                      <td>{ val.usages }</td>
                      <td>{ Number( val.amount  ).toLocaleString()}</td>
                      <td>{ val.uid }</td>
                    </tr>
                  );
                } ) }
              </table>
            </div>
          </div>
          
          <div className="addexpenses" onClick={ handleExpenses }>
            <button>Add Expenses</button>
          </div>
          <div className="rght"></div>
        </div>
      </div>
    </div>
  );
}
