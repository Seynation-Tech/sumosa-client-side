import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Report.css";
import "./Mobile.css";
import cancs from "../../Images/o.png";
import Loaders from "../Loaders/Loaders.jsx";
import Return from '../Return/Return.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { NavLink } from "react-router-dom";
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

  const [ sure, setAre ] = useState( false )
  const [ deletes, setDelete ] = useState( false );
  const navigate = useNavigate();

  const [ mydate, setDate ] = useState( "none" );

  const [ salesdata, setSales ] = useState( {
    totalsales: "0",
    difference: "0",
    totaldebts: "0",
    zreport: "0",
    agophysical: "0",
    agodipstick: "0",
    pmsphysical: "0",
    creditors: [],
    debtors: [],
    dieselsales: "0",
    pmssales: "0",
    expenses: "0",
    expensesdata: [],
    pmsdipstick: [],
    pmsoneoutput: "0",
    pmstwooutput: "0",
    agooneoutput: "0",
    agotwooutput: "0",
  } );

  const [ values, setValues ] = useState( {
    pmsonedigitalclosing: "0",
    pmsonedigitalopening: "0",
    pmsonedigitaloutput: "0",

    pmstwodigitalclosing: "0",
    pmstwodigitalopening: "0",
    pmstwodigitaloutput: "0",

    agoonedigitalclosing: "0",
    agoonedigitalopening: "0",
    agoonedigitaloutput: "0",

    agotwodigitalclosing: "0",
    agotwodigitalopening: "0",
    agotwodigitaloutput: "0",

    pmsoneanalogclosing: "0",
    pmsoneanalogopening: "0",
    pmsoneanalogoutput: "0",

    pmstwoanalogclosing: "0",
    pmstwoanalogopening: "0",
    pmstwoanalogoutput: "0",

    agooneanalogclosing: "0",
    agooneanalogopening: "0",
    agooneanalogoutput: "0",

    agotwoanalogclosing: "0",
    agotwoanalogopening: "0",
    agotwoanalogoutput: "0",
  } );

  function getFormattedDate ()
  {
    const today = new Date();
    const year = today.getFullYear();
    const month = String( today.getMonth() + 1 ).padStart( 2, "0" );
    const day = String( today.getDate() ).padStart( 2, "0" );
    return `${ year }-${ month }-${ day }`;
  }

  const handleUpdateF=()=>{
    setAgotwoanalogOpening( "" )
    setAgotwoanalogClosing( "" )
    setAgooneanalogOpening( "" )
    setAgooneanalogClosing( "" )

    setAgoonedigOpening( "" )
    setAgoonedigClosing( "" )
    setAgotwodigOpening( "" )
    setAgotwodigClosing( "" )

    setPmsonedigOpening( "" )
    setPmsonedigClosing( "" )
    setPmsoneanalogOpening( "" )
    setPmsoneanalogClosing( "" )

    setPmstwodigOpening( "" )
    setPmstwodigClosing( "" )
    setPmstwoanalogOpening( "" )
    setPmstwoanalogClosing( "" )
  }

  const handleUpdate = async ( event ) =>
  {
    setLoading(true)
   
      // setSidebar(false)
      setDate( event.target.value );

      const mydates = getFormattedDate();
      // const mydates =  '2024-03-22'

      const allreportBYid = await axios.get(
        `${url}/api/pumps/alldatavalues/${ mydates }`,
        {
          withCredentials: true,
        }
      );

      const allreportsbyid = await axios.get(
        `${url}/api/pumps/alldata/${ mydates }`,
        {
          withCredentials: true,
        }
      );

      const datas = allreportBYid.data;
      const mydatas = allreportsbyid.data;

      const pmsoneouput = datas.petrol.pmsone[ 0 ]?.outputvalue ?? 0;
      const pmstwooutput = datas.petrol.pmstwo[ 0 ]?.outputvalue ?? 0;

      const agooneoutput = datas.diesel.agoone[ 0 ]?.outputvalue ?? 0;
      const agotwooutput = datas.diesel.agotwo[ 0 ]?.outputvalue ?? 0;

      // console.log(datas)

      const pmsonedigitalclosing = mydatas.pmsone[ 0 ]?.closingdigital ?? 0;
      const pmsonedigitalopening = mydatas.pmsone[ 0 ]?.openingdigital ?? 0;
      const pmsonedigitaloutputvalue = mydatas.pmsone[ 0 ]?.outputvalue ?? 0;

      const pmsoneanalogclosing = mydatas.pmsone[ 0 ]?.closingsanalog ?? 0;
      const pmsoneanalogopening = mydatas.pmsone[ 0 ]?.openinganalog ?? 0;
      const pmsoneanalogoutputvalue = mydatas.pmsone[ 0 ]?.outputvalue ?? 0;

      setPmsonedigOpening( pmsonedigitalopening )
      setPmsonedigClosing( pmsonedigitalclosing )
      setPmsoneanalogOpening( pmsoneanalogopening )
      setPmsoneanalogClosing( pmsoneanalogclosing )

      const pmstwodigitalclosing = mydatas.pmstwo[ 0 ]?.closingdigital ?? 0;
      const pmstwodigitalopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
      const pmstwodigitaloutputvalue = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

      const pmstwoanalogClosing = mydatas.pmstwo[ 0 ]?.closingsanalog ?? 0;
      const pmstwoanalogopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
      const pmstwoanalogoutput = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

      setPmstwodigOpening( pmstwodigitalopening )
      setPmstwodigClosing( pmstwodigitalclosing )
      setPmstwoanalogOpening( pmstwoanalogopening )
      setPmstwoanalogClosing( pmstwoanalogClosing )

      const agoonedigitalclosing = mydatas.agoone[ 0 ]?.closingdigital ?? 0;
      const agoonedigitalopening = mydatas.agoone[ 0 ]?.openingdigital ?? 0;
      const agoonedigitaloutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

      const agotwodigitalclosing = mydatas.agotwo[ 0 ]?.closingdigital ?? 0;
      const agotowodigitalopening = mydatas.agotwo[ 0 ]?.openingdigital ?? 0;
      const agotwodigitaloutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

      setAgoonedigOpening( agoonedigitalopening )
      setAgoonedigClosing( agoonedigitalclosing )
      setAgotwodigOpening( agotowodigitalopening )
      setAgotwodigClosing( agotwodigitalclosing )

      const agooneanalogclosing = mydatas.agoone[ 0 ]?.closingsanalog ?? 0;
      const agooneanalogopening = mydatas.agoone[ 0 ]?.openinganalog ?? 0;
      const agooneanalogoutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

      const agotwoanalogclosing = mydatas.agotwo[ 0 ]?.closingsanalog ?? 0;
      const agotwoanalogopening = mydatas.agotwo[ 0 ]?.openinganalog ?? 0;
      const agotwoanalogoutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

      setAgotwoanalogOpening( agotwoanalogopening )
      setAgotwoanalogClosing( agotwoanalogclosing )
      setAgooneanalogOpening( agooneanalogopening )
      setAgooneanalogClosing( agooneanalogclosing )

      // the

      setValues( {
        pmsonedigitalclosing: pmsonedigitalclosing,
        pmsonedigitalopening: pmsonedigitalopening,
        pmsonedigitaloutput: pmsonedigitaloutputvalue,

        pmstwodigitalclosing: pmstwodigitalclosing,
        pmstwodigitalopening: pmstwodigitalopening,
        pmstwodigitaloutput: pmstwodigitaloutputvalue,

        agoonedigitalclosing: agoonedigitalclosing,
        agoonedigitalopening: agoonedigitalopening,
        agoonedigitaloutput: agoonedigitaloutput,

        agotwodigitalclosing: agotwodigitalclosing,
        agotwodigitalopening: agotowodigitalopening,
        agotwodigitaloutput: agotwodigitaloutput,

        pmsoneanalogclosing: pmsoneanalogclosing,
        pmsoneanalogopening: pmsoneanalogopening,
        pmsoneanalogoutput: pmsoneanalogoutputvalue,

        pmstwoanalogclosing: pmstwoanalogClosing,
        pmstwoanalogopening: pmstwoanalogopening,
        pmstwoanalogoutput: pmstwoanalogoutput,

        agooneanalogclosing: agooneanalogclosing,
        agooneanalogopening: agooneanalogopening,
        agooneanalogoutput: agooneanalogoutput,

        agotwoanalogclosing: agotwoanalogclosing,
        agotwoanalogopening: agotwoanalogopening,
        agotwoanalogoutput: agotwoanalogoutput,
      } );

      // console.log( oneData.petrol.pmsone )

      setSales( {
        totalsales: datas?.totalsales,
        difference: datas?.difference,
        totaldebts: datas?.debts,
        zreport: datas?.zreport,
        agophysical: datas?.agopysical,
        agodipstick: datas?.agodipstick,
        pmsphysical: datas?.pmsphysical,
        creditors: datas?.creditors,
        debtors: datas?.debtors,
        dieselsales: datas?.dieselsales,
        pmssales: datas?.pmssales,
        expenses: datas?.expenses,
        expensesdata: datas?.expensesdata,
        pmsdipstick: datas?.pmsdipstic,
        pmsoneoutput: pmsoneouput,
        pmstwooutput: pmstwooutput,
        agooneoutput: agooneoutput,
        agotwooutput: agotwooutput,
      } );
   
      setLoading(false)

  };

  const literHandler = async () =>
  { 
    setNotify( false );
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
      {setLoading(true)
        const dats = getFormattedDate()
        let pmsOne = {
          uid: dats,
          closingsanalog: pmsoneanalogClosing,
          closingdigital: pmsonedigClosing,
          openinganalog: pmsoneanalogOpening,
          openingdigital: pmsonedigOpening,
          outputvalue: Number( pmsonedigOpening ) - Number( pmsonedigClosing ),
        };

        let pmsTwo = {
          uid: dats,
          closingsanalog: pmstwoanalogClosing,
          closingdigital: pmstwodigClosing,
          openinganalog: pmstwoanalogOpening,
          openingdigital: pmstwodigOpening,
          outputvalue: Number( pmstwodigOpening ) - Number( pmstwodigClosing ),
        };
        let agoOne = {
          uid: dats,
          closingsanalog: agooneanalogClosing,
          closingdigital: agoonedigClosing,
          openinganalog: agooneanalogOpening,
          openingdigital: agoonedigOpening,
          outputvalue: Number( agoonedigOpening ) - Number( agoonedigClosing ),
        };
        let agoTwo = {
          uid: dats,
          closingsanalog: agotwoanalogClosing,
          closingdigital: agotwodigClosing,
          openinganalog: agotwoanalogOpening,
          openingdigital: agotwodigOpening,
          outputvalue: Number( agotwodigOpening ) - Number( agotwodigClosing ),
        };

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
        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
      setNotify( true );
      setNotification( "Fill all the details!" );
    } setLoading(false)
  };

  const sureTy = () =>
  {
    setNotify( false )
    setNotification( "" );
    setAre( true )

  }

  const confirm = async () =>
  { 
    setNotify( false )
    setNotification( "" );

    console.log(diesellitres,dieselAmount,petrolAmount,petrollitres)

    if ( isNaN( diesellitres ) && isNaN( dieselAmount ) && isNaN( petrolAmount ) && isNaN( petrollitres ) )
    {setLoading(true)
      try
      {
        const dats = getFormattedDate()
        let data = {
          uid: dats,
          dieselamount: Math.floor( dAmount ),
          petrolamount: Math.floor( pAmount ),
          dieselvalue: dlita,
          petrolvalue: plita,
        };

        const response = await axios.post( `${ url }/api/weeklydatas/data`, data );

        setNotify( true );
        setNotification( response.data );
        setLoading( false );

      } catch ( err ) { setLoading(false) }
    } else
    {
      setNotify( true );
      setLoading(false)
      setNotification( "Ensure all todays' data are filled!" );
    }setLoading(false)
  };

  const pesaHandler = async () =>
  {
    setNotify( false )
    setNotification( "" );
    if ( mPesa && nmb && crdb )
    {setLoading(true)
      try
      {
        const dats = getFormattedDate()
        let virtualmoney = {
          uid: dats,
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
        setNmb( "" )
        setCrdb( "" )
        setMpesa( "" )

        //
      } catch ( err )
      {
        setLoading( false );

        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
      setNotify( true );
      setNotification( "Fill all the details!" );
    }setLoading(false)
  };
  const deletePop = () =>
  {
    setDelete( true );
  };

  const cancPopdelete = () =>
  {
    setNotify( false )
    setNotification( "" );
    setAre( false );
  }
  const credHandler = async () =>
  {
    setNotify( false )
    setNotification( "" );
    if ( name && amount && mode )
    {setLoading(true)
      try
      {
        const dats = getFormattedDate()
        let debtors = {
          uid: dats,
          name: name,
          amount: amount,
          modeofpay: mode,
          date: mydate
        };
        setLoading( true );

        const resone = await axios.post(
          `${ url }/api/billing/creditors`,
          debtors
        );
        setNotify( true );
        setNotification( resone.data );
        setLoading( false );
        setName( "" )
        setAmount( "" )
        setMode( "" )

      } catch ( err )
      {
        setLoading( false );
        
        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const debtsHandler = async () =>
  {
    setNotify( false )
    setNotification( "" );
   
    if ( name && amount )
    { setLoading(true)
      try
      {
        const dats = getFormattedDate()

        let debtors = {
          uid: dats,
          name: name,
          amount: amount,
          date: dats,
        };

        setLoading( true );

        const resone = await axios.post( `${ url }/api/billing/debtors`, debtors );
        setNotify( true );
        setNotification( resone.data );
        setLoading( false );

        setName( "" )
        setAmount( "" )

        //
      } catch ( err )
      {
        setLoading( false );
        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const stocksHandler = async () =>
  {
    setNotify( false )
    setNotification( "" );
    if ( pmsphyscal && pmsdispst )
    {setLoading(true)
      try
      {
        const dats = getFormattedDate()
        let pmsStock = {
          uid: dats,
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
        setPhysicalago( "" )
        setPhysicalpms( "" )
        setDipstago( "" )
        setDipstpms( "" )

        //
      } catch ( err )
      {
        setLoading( false );
        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
      setNotify( true );
      setNotification( "Fill all the details!" );
    }
  };

  const updateHandler = () =>
  {

  }

  const moneycountHandler = async () =>
  {
    setNotify( false )
    setNotification( "" );
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
      {setLoading(true)
        const dats = getFormattedDate()
        let collections = {
          uid: dats,
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

        setOnehs( "" )
        setTwohs( "" )
        setFivehs( "" )
        setOneths( "" )
        setTwoths( "" )
        setFiveths( "" )
        setTenths( "" )
        setFiftys( "" )

        //
      } catch ( err )
      {
        setLoading( false );
        setError( "Please refresh..." );
      }
    } else
    {setLoading(false)
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
    setNotify( false )
    setNotification( "" );
  };

  const handleDebt = () =>
  {
    setPesa( false );
    setMoneycount( false );
    setStocks( false );
    setDebts( true );
    setCred( false );
    setNotify( false )
    setNotification( "" );
  };

  const handleCred = () =>
  {
    setPesa( false );
    setMoneycount( false );
    setStocks( false );
    setDebts( false );
    setCred( true );
    setNotify( false )
    setNotification( "" );
  };

  const handleMoneycount = () =>
  {
    setPesa( false );
    setStocks( false );
    setDebts( false );
    setNotify( false )
    setNotification( "" );
    setMoneycount( true );
    setCred( false );
  };

  const handleStocks = () =>
  {
    setPesa( false );
    setDebts( false );
    setNotify( false )
    setNotification( "" );
    setMoneycount( false );
    setStocks( true );
    setCred( false );
  };

  const handleAll = () =>
  {
    setPesa( false );
    setDebts( false );
    setMoneycount( false );
    setNotify( false )
    setNotification( "" );
    setStocks( false );
    setCred( false );
  };

  return (
    <div className="mysals">
   
      <div className="opa">
           <Sidebar />
      </div>
      {loading && <Loaders/>}
      <div className="reloa">
        <NavLink to="/home">
           <Return />
        </NavLink>
       
      </div>

      <div className=""></div>

      <div className="sectionthresa">
        <div className="general">
          <p>DAILY REPORT FORMS</p>

        </div>
        <div className="yearrr">
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

          <div className="dail">
            <p  onClick={ handleUpdate }>EDIT DATA</p>  
          </div>

          <div className="dail" >
           <p onClick={ handleUpdateF }>ERASE FIELDS</p>
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
                  <div style={{width: "210px"}} className="inputmy">
                    <p>{ notification }</p>
                  </div>
                ) }

                <div className="bone">
                  <div className="thetwos">{/* <p></p> */ }</div>
                  <div style={{width: "210px"}} className="thetwo">
                    <button style={{width: "210px"}} onClick={ pesaHandler }>Submit</button>
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

          { sure && (
            <div className="poppesaoo">
              <div className="contentonestyo">
                <div className="canc" onClick={ cancPopdelete }>
                  <img src={ cancs } alt="" />
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
                        <button onClick={ cancPopdelete }>No</button>
                        <button onClick={ confirm }>Yes</button>
                      </div>
                    </div>

                    { notify && (
                      <div className="nputmy">
                        <p>{ notification }</p>
                      </div>
                    ) }

                  </div>
                </div>
              </div>
            </div>
          ) }

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
                      <div className="inpumy">
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
                  <div className="i">
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
