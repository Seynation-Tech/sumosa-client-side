import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Report.css";
import bell from "../../Images/notify.png";
import Real from "../Charts/Real";
import morearrow from "../../Images/icono.png";
import login from "../../Images/login.png";
import world from "../../Images/blue-world-globe.jpg";
import "./Mobile.css";
import connect from "../../Images/connect.png";
import insta from "../../Images/instagra.png";
import whatsp from "../../Images/whatsapp.png";
import youtube from "../../Images/youtub.png";
import linkin from "../../Images/linked.png";
import facebook from "../../Images/facebook.png";
import morarrow from "../../Images/rightarrow.png";
import long from "../../Images/startarrow.png";
import search from "../../Images/searchblue.png";
import sda from "../../Images/sdalogo.jpg";
import pcm from "../../Images/PCM LOGO.jpg";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import moment from "moment";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "cookie-universal";

let today = new Date();
let date =
  today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
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


const currentDate = new Date()
const currentDayofWeek = currentDate.getDay();

const startDate = new Date( currentDate );
startDate.setDate( currentDate.getDate() - currentDayofWeek + 1 );

const endDate = new Date( currentDate );
endDate.setDate( currentDate.getDate() - currentDayofWeek + 7 );

const formattedStartDate = currentDate.toISOString().split( 'T' )[ 0 ]
const formattedEndDate = endDate.toISOString().split( 'T' )[ 0 ]

// console.log(formattedStartDate)

export default function Expenses ()
{
  const [ pesa, setPesa ] = useState( false );
  const [ debts, setDebts ] = useState( false );
  const [ stocks, setStocks ] = useState( false );
  const [ moneycount, setMoneycount ] = useState( false );
  const [ zrepot, setZrepot ] = useState( "" );
  const [ status, setStatus ] = useState( "" );
  const [ notify, setNotify ] = useState( false );

  const [ notification, setNotification ] = useState( "" );
  let [ color, setColor ] = useState( "#ffffff" );
  const { url, days, petrolAmount, dieselAmount, dlita, plita, pAmount, dAmount, petrollitres, diesellitres } =
    useContext( AuthContext );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( null );
  const [ today, setToday ] = useState( date );

  const [ pmsonedigOpening, setPmsonedigOpening ] = useState( "" );
  const [ pmsonedigClosing, setPmsonedigClosing ] = useState( "" );

  const [ pmsoneanalogOpening, setPmsoneanalogOpening ] = useState( "" );
  const [ pmsoneanalogClosing, setPmsoneanalogClosing ] = useState( "" );

  const [ pmstwodigOpening, setPmstwodigOpening ] = useState( "" );
  const [ pmstwodigClosing, setPmstwodigClosing ] = useState( "" );

  const [ pmstwoanalogOpening, setPmstwoanalogOpening ] = useState( "" );
  const [ pmstwoanalogClosing, setPmstwoanalogClosing ] = useState( "" );

  const [ agoonedigOpening, setAgoonedigOpening ] = useState( "" );
  const [ agoonedigClosing, setAgoonedigClosing ] = useState( "" );

  const [ agooneanalogOpening, setAgooneanalogOpening ] = useState( "" );
  const [ agooneanalogClosing, setAgooneanalogClosing ] = useState( "" );

  const [ agotwodigOpening, setAgotwodigOpening ] = useState( "" );
  const [ agotwodigClosing, setAgotwodigClosing ] = useState( "" );

  const [ agotwoanalogOpening, setAgotwoanalogOpening ] = useState( "" );
  const [ agotwoanalogClosing, setAgotwoanalogClosing ] = useState( "" );

  const [ mPesa, setMpesa ] = useState( "" );
  const [ crdb, setCrdb ] = useState( "" );
  const [ nmb, setNmb ] = useState( "" );

  const [ name, setName ] = useState( "" );
  const [ amount, setAmount ] = useState( "" );

  const [ tenths, setTenths ] = useState( "" );
  const [ fiveths, setFiveths ] = useState( "" );
  const [ twoths, setTwoths ] = useState( "" );
  const [ oneths, setOneths ] = useState( "" );
  const [ fivehs, setFivehs ] = useState( "" );
  const [ twohs, setTwohs ] = useState( "" );
  const [ onehs, setOnehs ] = useState( "" );
  const [ fiftys, setFiftys ] = useState( "" );
  const [ sidebar, setSidebar ] = useState( false );

  const [ credits, setCred ] = useState( false );
  const [ mode, setMode ] = useState( "" );

  const [ pmsphyscal, setPhysicalpms ] = useState( "" );
  const [ pmsdispst, setDipstpms ] = useState( "" );

  const [ agophyscal, setPhysicalago ] = useState( "" );
  const [ agodispst, setDipstago ] = useState( "" );

  const [sure,setAre] = useState(false)
  const [deletes, setDelete] = useState(false);
  const navigate = useNavigate();

  const literHandler = async () =>
  {
    if (
      pmsonedigOpening &&
      pmsonedigClosing &&
      pmsoneanalogOpening &&
      pmsoneanalogClosing &&
      agoonedigOpening &&
      agoonedigClosing &&
      agooneanalogOpening &&
      agooneanalogClosing
    )
    {
      try
      {
        const dats = days.toLowerCase() + "," + date;
        let pmsOne = {
          uid: formattedEndDate,
          closingsanalog: pmsoneanalogClosing,
          closingdigital: pmsonedigClosing,
          openinganalog: pmsoneanalogOpening,
          openingdigital: pmsonedigOpening,
          outputvalue: Number( pmsonedigClosing ) - Number( pmsonedigOpening ),
        };

        let pmsTwo = {
          uid: dats,
          closingsanalog: pmstwoanalogClosing,
          closingdigital: pmstwodigClosing,
          openinganalog: pmstwoanalogOpening,
          openingdigital: pmstwodigOpening,
          outputvalue: Number( pmstwodigClosing ) - Number( pmstwodigOpening ),
        };

        let agoOne = {
          uid: dats,
          closingsanalog: agooneanalogClosing,
          closingdigital: agoonedigClosing,
          openinganalog: agooneanalogOpening,
          openingdigital: agoonedigOpening,
          outputvalue: Number( agoonedigClosing ) - Number( agoonedigOpening ),
        };

        let agoTwo = {
          uid: dats,
          closingsanalog: agotwoanalogClosing,
          closingdigital: agotwodigClosing,
          openinganalog: agotwoanalogOpening,
          openingdigital: agotwodigOpening,
          outputvalue: Number( agotwodigClosing ) - Number( agotwodigOpening ),
        };

        setLoading( true );

        const resone = await axios.post( `${ url }/api/pumps/petrol`, pmsOne );
        const restwo = await axios.post( `${ url }/api/pumps/petroltwo`, pmsTwo );
        const resthree = await axios.post( `${ url }/api/pumps/diesel`, agoOne );
        const resfour = await axios.post( `${ url }/api/pumps/dieseltwo`, agoTwo );

        setNotify( true );
        setNotification( resfour.data );
        setLoading( false );

        //
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const sureTy =()=>{
    setAre(true)
  }

  const confirm = async () =>
  {
    
    if ( isNaN( diesellitres ) && isNaN( dieselAmount ) && isNaN( petrolAmount ) && isNaN( petrollitres ) )
    {
      try
      {
       
        // console.log(Math.floor(pAmount),plita)
        const dats = date;
        let data = {
          uid: formattedStartDate,
          dieselamount: Math.floor( dAmount ),
          petrolamount: Math.floor( pAmount ),
          dieselvalue: dlita,
          petrolvalue: plita,
        };


        setLoading( true );

        const response = await axios.post( `${ url }/api/weeklydatas/data`, data );



        setNotify( true );
        setNotification( response.data );
        setLoading( false );
      } catch ( err ) { }
    } else
    {
      setNotify( true );
      setNotification( " Ensure all values data are filled!" );
    }
  };

  const pesaHandler = async () =>
  {
    if ( mPesa && nmb && crdb )
    {
      try
      {
        const dats = date;
        let virtualmoney = {
          uid: formattedEndDate,
          mpesa: mPesa,
          nmbpesa: nmb,
          crdbpesa: crdb,
          generalexpenses: "",
          debts: "",
        };
        setLoading( true );

        const resone = await axios.post(
          `${ url }/api/billing/virtmoney`,
          virtualmoney
        );

        setNotify( true );
        setNotification( resone.data );
        setLoading( false );

        //
      } catch ( err )
      {
        setLoading( false );

        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };
  const deletePop = () => {
    setDelete(true);
  };

  const cancPopdelete =()=>{
    setAre(false);
  }
  const credHandler = async () =>
  {
    if ( name && amount && mode )
    {
      try
      {
        const dats = date;
        let debtors = {
          uid: formattedEndDate,
          name: name,
          amount: amount,
          modeofpay: mode,
          date: mydate,
        };
        setLoading( true );

        const resone = await axios.post(
          `${ url }/api/billing/creditors`,
          debtors
        );
        setNotify( true );
        setNotification( resone.data );
        setLoading( false );
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const debtsHandler = async () =>
  {
    if ( name && amount )
    {
      try
      {
        const dats = date;
        let debtors = {
          uid: formattedEndDate,
          name: name,
          amount: amount,
          date: "12/23/34",
        };

        setLoading( true );

        const resone = await axios.post( `${ url }/api/billing/debtors`, debtors );
        setNotify( true );
        setNotification( resone.data );
        setLoading( false );

        //
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const stocksHandler = async () =>
  {
    if ( pmsphyscal && pmsdispst )
    {
      try
      {
        const dats = date;
        let pmsStock = {
          uid: formattedEndDate,
          physical: pmsphyscal,
          dipstick: pmsdispst,
          difference: Number( pmsphyscal ) - Number( pmsdispst ),
        };

        let agoStock = {
          uid: dats,
          physical: agophyscal,
          dipstick: agodispst,
          difference: Number( agophyscal ) - Number( agodispst ),
        };

        // console.log(pmsOne)

        const resone = await axios.post(
          `${ url }/api/billing/pmsfuelstock`,
          pmsStock
        );
        const reson = await axios.post(
          `${ url }/api/billing/agofuelstock`,
          agoStock
        );

        setNotify( true );
        setNotification( resone.data );
        setLoading( false );

        //
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const updateHandler=()=>{

  }

  const moneycountHandler = async () =>
  {
    if (
      tenths &&
      fivehs &&
      fiveths &&
      onehs &&
      oneths &&
      twohs &&
      fiftys &&
      zrepot &&
      twoths
    )
    {
      try
      {
        const dats = date;
        let collections = {
          uid: formattedEndDate,
          tenth: tenths,
          fiveth: fiveths,
          twoth: twoths,
          oneth: oneths,
          fiveh: fivehs,
          twoh: twohs,
          oneh: onehs,
          fifty: fiftys,
          zreport: zrepot,
        };

        setLoading( true );

        const resone = await axios.post(
          `${ url }/api/billing/collectmoney`,
          collections
        );

        setNotify( true );
        setNotification( resone.data );
        setLoading( false );

        //
      } catch ( err )
      {
        setLoading( false );
        console.log( err );
        setError( "Please refresh..." );
      }
    } else
    {
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const submitButton = async ( e ) =>
  {
    e.preventDefault();
    setLoading( true );
  };

  const handlePesa = () =>
  {
    setStocks( false );
    setMoneycount( false );
    setDebts( false );
    setPesa( true );
    setCred( false );
    setNotify( false );
  };

  const handleDebt = () =>
  {
    setPesa( false );
    setMoneycount( false );
    setStocks( false );
    setDebts( true );
    setCred( false );
    setNotify( false );
  };

  const handleCred = () =>
  {
    setPesa( false );
    setMoneycount( false );
    setStocks( false );
    setDebts( false );
    setCred( true );
    setNotify( false );
  };

  const handleMoneycount = () =>
  {
    setPesa( false );
    setStocks( false );
    setDebts( false );
    setNotify( false );
    setMoneycount( true );
    setCred( false );
  };

  const handleStocks = () =>
  {
    setPesa( false );
    setDebts( false );
    setNotify( false );
    setMoneycount( false );
    setStocks( true );
    setCred( false );
  };

  const handleAll = () =>
  {
    setPesa( false );
    setDebts( false );
    setMoneycount( false );
    setNotify( false );
    setStocks( false );
    setCred( false );
  };

  return (
    <div className="mysals">
      <Sidebar />

      <div className=""></div>

      <div className="sectionthresa">
        <div className="general">
          <p>DAILY REPORT FORMS</p>
        </div>
        <div className="year">
          <div className="dail">
            <p onClick={ handleAll }>LITRES</p>
          </div>

          <div className="dail">
            <p onClick={ handlePesa }>ONLINE PAY</p>
          </div>

          <div className="dail">
            <p onClick={ handleDebt }>DEBTS</p>
          </div>

          <div className="dail">
            <p onClick={ handleCred }>CREDITORS</p>
          </div>

          <div className="dail">
            <p onClick={ handleMoneycount }>MONEY COUNTS</p>
          </div>

          <div className="dail">
            <p onClick={ handleStocks }>FUEL STOCK</p>
          </div>

          <div className="download">
            {/* <p>Monday 12/03/2024</p> */ }
            {/* <p>12:00:00 AM</p> */ }
            <div className="down">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        {/* <Real /> */ }

        <div className="lsa">
          { pesa && (
            <div className="poppesa">
              <div className="contentones">
                <div className="jinss">
                  <p>ONLINE PAYMENTS</p>
                </div>
                <div className="chote">
                  <div className="bone">
                    <div className="thetwos">{/* <p>CLOSINGS</p> */ }</div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="M-pesa"
                        value={ mPesa }
                        onChange={ ( e ) => setMpesa( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="NMB"
                        value={ nmb }
                        onChange={ ( e ) => setNmb( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="CRDB"
                        value={ crdb }
                        onChange={ ( e ) => setCrdb( e.target.value ) }
                      />
                    </div>
                  </div>
                </div>

                { notify && (
                  <div className="inputmy">
                    <p>{ notification }</p>
                  </div>
                ) }

                <div className="bone">
                  <div className="thetwos">{/* <p></p> */ }</div>
                  <div className="thetwo">
                    <button onClick={ pesaHandler }>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          ) }

          { stocks && (
            <div className="poppesa">
              <div className="contentonest">
                <div className="jinss">
                  <p>FUEL STOCK MANAGEMENT</p>
                </div>
                <div className="chote">
                  <div className="bone">
                    <div className="thetwos">{/* <p>CLOSINGS</p> */ }</div>

                    <div className="twos">
                      <p>PETROL STOCK</p>
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="Physical stock"
                        value={ pmsphyscal }
                        onChange={ ( e ) => setPhysicalpms( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="Dipstick stock"
                        value={ pmsdispst }
                        onChange={ ( e ) => setDipstpms( e.target.value ) }
                      />
                    </div>

                    <div className="twos">
                      <p>DIESEL STOCK</p>
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="Physical stock"
                        value={ agophyscal }
                        onChange={ ( e ) => setPhysicalago( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="Dipstick stock"
                        value={ agodispst }
                        onChange={ ( e ) => setDipstago( e.target.value ) }
                      />
                    </div>

                    { notify && (
                      <div className="inputmy">
                        <p>{ notification }</p>
                      </div>
                    ) }

                    <div className="thetwo">
                      <button onClick={ stocksHandler }>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }
     
     {sure && (
        <div className="poppesao">
          <div className="contentonesty">
            <div className="canc" onClick={cancPopdelete}>
              {/* <img src="" alt="" /> */}
              <p>x</p>
            </div>
            <div className="ours">
              <div className="sdacont">
                <div className="totalcash">
                  <p>UPDATING' FUEL VALUES? </p>
                </div>
                <div className="forms">
                  

                  <div className="areyou">
                    <p>Adding to today values and amount.</p>
                    <p>Are you sure to do this?</p>
                  </div>

                  <div className="inputo">
                    <button onClick={cancPopdelete}>No</button>
                    <button onClick={confirm}>Yes</button>
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

          { debts && (
            <div className="poppesa">
              <div className="contentonesy">
                <div className="ours">
                  <div className="sdacont">
                    <div className="jinss">
                      <p>DEBTORS' REPORT</p>
                    </div>
                    <div className="forms">
                      <div className="input-two">
                        {/* <i>icon</i> */ }
                        <input
                          placeholder="Name"
                          value={ name }
                          onChange={ ( e ) => setName( e.target.value ) }
                        />
                      </div>

                      <div className="input-two">
                        {/* <i>icon</i> */ }
                        <input
                          type="number"
                          placeholder="Amount"
                          value={ amount }
                          onChange={ ( e ) => setAmount( e.target.value ) }
                        />
                      </div>
                    </div>

                    { notify && (
                      <div className="inputmy">
                        <p>{ notification }</p>
                      </div>
                    ) }

                    <div className="remember-opt">
                      <button onClick={ debtsHandler } className="sign-btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }

          { credits && (
            <div className="poppesa">
              <div className="contentonesy">
                <div className="ours">
                  <div className="sdacont">
                    <div className="jinss">
                      <p>CREDITORS' REPORT</p>
                    </div>
                    <div className="forms">
                      <div className="input-two">
                        {/* <i>icon</i> */ }
                        <input
                          placeholder="Name"
                          value={ name }
                          onChange={ ( e ) => setName( e.target.value ) }
                        />
                      </div>

                      <div className="input-two">
                        {/* <i>icon</i> */ }
                        <input
                          type="number"
                          placeholder="Amount"
                          value={ amount }
                          onChange={ ( e ) => setAmount( e.target.value ) }
                        />
                      </div>

                      <div className="input-two">
                        {/* <i>icon</i> */ }
                        <input
                          placeholder="Mode of Payment"
                          value={ mode }
                          onChange={ ( e ) => setMode( e.target.value ) }
                        />
                      </div>
                    </div>

                    { notify && (
                      <div className="inputmy">
                        <p>{ notification }</p>
                      </div>
                    ) }

                    <div className="remember-opt">
                      <button onClick={ credHandler } className="sign-btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }

          { moneycount && (
            <div className="poppesaa">
              <div className="contentonesa">
                <div className="jins">
                  <p>MONEY COLLECTION REPORT</p>
                </div>
                <div className="chotes">
                  <div className="bone">
                    {/* <div className="thetwos">
                      <p>Enter Money counts</p>
                    </div> */}
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="10,000"
                        value={ tenths }
                        onChange={ ( e ) => setTenths( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="5,000"
                        value={ fiveths }
                        onChange={ ( e ) => setFiveths( e.target.value ) }
                      />
                    </div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="2,000"
                        value={ twoths }
                        onChange={ ( e ) => setTwoths( e.target.value ) }
                      />
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="1,000"
                        value={ oneths }
                        onChange={ ( e ) => setOneths( e.target.value ) }
                      />
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="500"
                        value={ fivehs }
                        onChange={ ( e ) => setFivehs( e.target.value ) }
                      />
                    </div>
                  </div>

                  <div className="bone">
                    <div className="thetwos">{/* <p></p> */ }</div>
                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="200"
                        value={ twohs }
                        onChange={ ( e ) => setTwohs( e.target.value ) }
                      />
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="100"
                        value={ onehs }
                        onChange={ ( e ) => setOnehs( e.target.value ) }
                      />
                    </div>

                    <div className="thetwos">
                      <input
                        type="number"
                        placeholder="50"
                        value={ fiftys }
                        onChange={ ( e ) => setFiftys( e.target.value ) }
                      />
                    </div>

                    <div className="input-to">
                      <input
                        type="number"
                        placeholder="Z-REPORT AMOUNT"
                        value={ zrepot }
                        onChange={ ( e ) => setZrepot( e.target.value ) }
                      />
                    </div>

                    { notify && (
                      <div className="inputmy">
                        <p>{ notification }</p>
                      </div>
                    ) }
                    <div className="thetwo">
                      <button onClick={ moneycountHandler }>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }
          {/* body contents */ }
          <div className="body-contentc">
            <div className="our">
              <div className="bodyone">
                <div className="contentone">
                  <div className="jinsr">
                    <p>PMS 01</p>
                  </div>
                  <div className="chote">
                    <div className="bone">
                      <div className="thetwo">
                        <p>CLOSINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ pmsoneanalogClosing }
                          onChange={ ( e ) =>
                            setPmsoneanalogClosing( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ pmsonedigClosing }
                          onChange={ ( e ) => setPmsonedigClosing( e.target.value ) }
                        />
                      </div>
                    </div>

                    <div className="bone">
                      <div className="thetwo">
                        <p>OPENINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ pmsoneanalogOpening }
                          onChange={ ( e ) =>
                            setPmsoneanalogOpening( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ pmsonedigOpening }
                          onChange={ ( e ) => setPmsonedigOpening( e.target.value ) }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contentwo">
                  <div className="jinsr">
                    <p>AGO 01</p>
                  </div>
                  <div className="chote">
                    <div className="bone">
                      <div className="thetwo">
                        <p>CLOSINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ agooneanalogClosing }
                          onChange={ ( e ) =>
                            setAgooneanalogClosing( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ agoonedigClosing }
                          onChange={ ( e ) => setAgoonedigClosing( e.target.value ) }
                        />
                      </div>
                    </div>

                    <div className="bone">
                      <div className="thetwo">
                        <p>OPENINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ agooneanalogOpening }
                          onChange={ ( e ) =>
                            setAgooneanalogOpening( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ agoonedigOpening }
                          onChange={ ( e ) => setAgoonedigOpening( e.target.value ) }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bodytwo">
                <div className="contentone">
                  <div className="jinsr">
                    <p>PMS 02</p>
                  </div>
                  <div className="chote">
                    <div className="bone">
                      <div className="thetwo">
                        <p>CLOSINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ pmstwoanalogClosing }
                          onChange={ ( e ) =>
                            setPmstwoanalogClosing( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ pmstwodigClosing }
                          onChange={ ( e ) => setPmstwodigClosing( e.target.value ) }
                        />
                      </div>
                    </div>

                    <div className="bone">
                      <div className="thetwo">
                        <p>OPENINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ pmstwoanalogOpening }
                          onChange={ ( e ) =>
                            setPmstwoanalogOpening( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ pmstwodigOpening }
                          onChange={ ( e ) => setPmstwodigOpening( e.target.value ) }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contentwo">
                  <div className="jinsr">
                    <p>AGO 02</p>
                  </div>
                  <div className="chote">
                    <div className="bone">
                      <div className="thetwo">
                        <p>CLOSINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ agotwoanalogClosing }
                          onChange={ ( e ) =>
                            setAgotwoanalogClosing( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ agotwodigClosing }
                          onChange={ ( e ) => setAgotwodigClosing( e.target.value ) }
                        />
                      </div>
                    </div>

                    <div className="bone">
                      <div className="thetwo">
                        <p>OPENINGS</p>
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Analog values"
                          value={ agotwoanalogOpening }
                          onChange={ ( e ) =>
                            setAgotwoanalogOpening( e.target.value )
                          }
                        />
                      </div>
                      <div className="thetwo">
                        <input
                          type="number"
                          placeholder="Digital values"
                          value={ agotwodigOpening }
                          onChange={ ( e ) => setAgotwodigOpening( e.target.value ) }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="updateing">

                <div className="edits" onClick={ literHandler } >
                  <p>SAVE VALUES</p>
                </div>

                { notify && (
                  <div className="inputmy">
                    <p>{ notification }</p>
                  </div>
                ) }

                <button onClick={ sureTy } >SUBMIT FORM</button>
                {/* <button onClick={confirm}>CONFIRM</button> */ }
              </div>
            </div>
          </div>

          <div className="rght"></div>
        </div>
      </div>
    </div>
  );
}
