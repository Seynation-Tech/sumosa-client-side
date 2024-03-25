import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Review.css";
import "./Mobile.css";
import send from "../../Images/sen.png";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs"; 

import axios from "axios";
import { AuthContext } from "../AuthContext";

let today = new Date();

let date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
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
function getStartandEndofWeek ( date )
{
    const currentDate = new Date( date );
    const currentDayofWeek = currentDate.getDay();

    const startDate = new Date( currentDate );
    startDate.setDate( currentDate.getDate() - currentDayofWeek + 1 );

    const endDate = new Date( currentDate );
    endDate.setDate( currentDate.getDate() - currentDayofWeek + 7 );

    const formattedStartDate = startDate.toISOString().split( "T" )[ 0 ];
    const formattedEndDate = endDate.toISOString().split( "T" )[ 0 ];

    return { startDate: formattedStartDate, endDate: formattedEndDate };
}

export default function Review ()
{
    const [ usage, setUsage ] = useState( "" );
    const [ amount, setAmount ] = useState( "" );
    const [ expenses, setExpenses ] = useState( false );
    const {
        url,
        diff,
        days,
        zrepos,
        totalEarnings,
        pmsonelitres,
        pmstwolitres,
        agoonelitres,
        agotwolitres,
        petrollitres,
        diesellitres,
        lastpetrol,
        currentUser,
        lastdiesel,
        agooneopening,
        agooneclosing,
        agotwoopening,
        agotwoclosing,
        pmsoneopening,
        pmsoneclosing,
        pmstwoopening,
        pmstwoclosing,
        pmsoneamount,
        pmstwoamount,
        agooneamount,
        agotwoamount,
        agooneanalogopening,
        agooneanalogclosing,
        agotwoanalogopening,
        agotwoanalogclosing,
        pmsoneanalogopening,
        pmsoneanalogclosing,
        pmstwoanalogopening,
        pmstwoanalogclosing,
        dieselAmount,
        petrolAmount,
        petroldisp,
        petrolstock,
        dieseldips,
        dieselstock,
    } = useContext( AuthContext );
    // const [ date, setDate ] = useState( new Date() );
    const [ loading, setLoading ] = useState( false );
    const [ tableData, setData ] = useState( [] );
    const [ tableDatas, setDatas ] = useState( [] );
    const [ tableDataa, setDataa ] = useState( [] );

    const [ weekly, setWeekly ] = useState( true );
    const [ monthly, setMonthly ] = useState( false );
    const [ yearly, setYearly ] = useState( false );

    const [ mesg, setMessage ] = useState( "" );

    const [ selectedDate, setSelectedDate ] = useState( null );

    const [ totalexpense, setTotalexpense ] = useState( "0" );
    const [ reason, setReason ] = useState( "" );
    const [ messagesent, setMessagesent ] = useState( "" );

    const [ deni, setTotalDeni ] = useState( "" );

    const [ startDate, setStartDate ] = useState();
    const [ endDate, setEndDate ] = useState();

    const [ mydate, setDate ] = useState( "none" );

    function getFormattedDate ()
    {
        const today = new Date();
        const year = today.getFullYear();
        const month = String( today.getMonth() + 1 ).padStart( 2, "0" ); // Add leading zero if needed
        const day = String( today.getDate() ).padStart( 2, "0" ); // Add leading zero if needed
        return `${ year }-${ month }-${ day }`;
    }



    

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

    useEffect( () =>
    {
        setLoading( true );
        window.scrollTo( 0, 0 );
        // const interval = setInterval( () =>
        // {
        const fetchData = async () =>
        {
            try
            {
                const todate = getFormattedDate();

                const resptwo = await axios.get( `${ url }/api/billing/inwords`, {
                    withCredentials: true,
                } );

                const allreportBYid = await axios.get(
                    `http://localhost:5001/api/pumps/alldatavalues/${ todate }`,
                    {
                        withCredentials: true,
                    }
                );

                const allreportsbyid = await axios.get(
                    `http://localhost:5001/api/pumps/alldata/${ todate }`,
                    {
                        withCredentials: true,
                    }
                );

                const report = await axios.get(
                    `http://localhost:5001/api/pumps/alldatavalues`,
                    {
                        withCredentials: true,
                    }
                );

                const allreports = await axios.get(
                    `http://localhost:5001/api/pumps/alldata`,
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

                const pmstwodigitalclosing = mydatas.pmstwo[ 0 ]?.closingdigital ?? 0;
                const pmstwodigitalopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
                const pmstwodigitaloutputvalue = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

                const pmstwoanalogClosing = mydatas.pmstwo[ 0 ]?.closingsanalog ?? 0;
                const pmstwoanalogopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
                const pmstwoanalogoutput = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

                const agoonedigitalclosing = mydatas.agoone[ 0 ]?.closingdigital ?? 0;
                const agoonedigitalopening = mydatas.agoone[ 0 ]?.openingdigital ?? 0;
                const agoonedigitaloutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

                const agotwodigitalclosing = mydatas.agotwo[ 0 ]?.closingdigital ?? 0;
                const agotowodigitalopening = mydatas.agotwo[ 0 ]?.openingdigital ?? 0;
                const agotwodigitaloutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

                const agooneanalogclosing = mydatas.agoone[ 0 ]?.closingsanalog ?? 0;
                const agooneanalogopening = mydatas.agoone[ 0 ]?.openinganalog ?? 0;
                const agooneanalogoutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

                const agotwoanalogclosing = mydatas.agotwo[ 0 ]?.closingsanalog ?? 0;
                const agotwoanalogopening = mydatas.agotwo[ 0 ]?.openinganalog ?? 0;
                const agotwoanalogoutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

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

                //   const  allreport = await axios.get(`${url}/api/weeklydatas/alldatavalues`, {
                //     withCredentials: true,
                //   });

                //   console.log(startdate,enddate)
                //   console.log(allreportBYid)
                //   console.log(allreportsbyid)

                // setDatas( respfour.data );

                // console.log(resptwo.data);
                // let words = Object.values( resptwo.data )[
                //     Object.values( resptwo.data ).length - 1
                // ];

                // setReason( words.differencereason )

                //
            } catch ( err )
            {
                setLoading( false );
                console.log( err );
                // setError( "Please refresh..." );
            }
        };
        fetchData();
        // }, 1500 );
        // return () => clearInterval( interval );
    }, [] );

    useEffect( () =>
    {
        setLoading( true );
        // const interval = setInterval(() => {
        const fetchData = async () =>
        {
            try
            {
                window.scrollTo( 0, 0 );
                const dets = await axios.get( `${ url }/api/billing/debtors`, {
                    withCredentials: true,
                } );

                const resptwo = await axios.get( `${ url }/api/billing/allexpenses`, {
                    withCredentials: true,
                } );

                let expens = 0;
                for ( let i = 0; i < dets.data.length; i++ )
                {
                    expens = Number( dets.data[ i ].amount ) + expens;
                    setTotalDeni( expens );
                    // console.log(expens)
                }

                setData( dets.data );
                setDataa( resptwo.data );
                // console.log(dets.data)
            } catch ( err )
            {
                // console.log(err)
            }
        };
        fetchData();
        // }, 1500);
        // return () => clearInterval(interval);
    }, [] );

    const handleChange = async (event) =>
    {

        setDate( event.target.value );

        const mydates =  event.target.value;

        const allreportBYid = await axios.get(
            `http://localhost:5001/api/pumps/alldatavalues/${ mydates }`,
            {
                withCredentials: true,
            }
        );

        const allreportsbyid = await axios.get(
            `http://localhost:5001/api/pumps/alldata/${ mydates }`,
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

        const pmstwodigitalclosing = mydatas.pmstwo[ 0 ]?.closingdigital ?? 0;
        const pmstwodigitalopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
        const pmstwodigitaloutputvalue = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

        const pmstwoanalogClosing = mydatas.pmstwo[ 0 ]?.closingsanalog ?? 0;
        const pmstwoanalogopening = mydatas.pmstwo[ 0 ]?.openinganalog ?? 0;
        const pmstwoanalogoutput = mydatas.pmstwo[ 0 ]?.outputvalue ?? 0;

        const agoonedigitalclosing = mydatas.agoone[ 0 ]?.closingdigital ?? 0;
        const agoonedigitalopening = mydatas.agoone[ 0 ]?.openingdigital ?? 0;
        const agoonedigitaloutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

        const agotwodigitalclosing = mydatas.agotwo[ 0 ]?.closingdigital ?? 0;
        const agotowodigitalopening = mydatas.agotwo[ 0 ]?.openingdigital ?? 0;
        const agotwodigitaloutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

        const agooneanalogclosing = mydatas.agoone[ 0 ]?.closingsanalog ?? 0;
        const agooneanalogopening = mydatas.agoone[ 0 ]?.openinganalog ?? 0;
        const agooneanalogoutput = mydatas.agoone[ 0 ]?.outputvalue ?? 0;

        const agotwoanalogclosing = mydatas.agotwo[ 0 ]?.closingsanalog ?? 0;
        const agotwoanalogopening = mydatas.agotwo[ 0 ]?.openinganalog ?? 0;
        const agotwoanalogoutput = mydatas.agotwo[ 0 ]?.outputvalue ?? 0;

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
    };
    const handleDateChange = ( date ) =>
    {
        setSelectedDate( date );

        handleChange();
    };

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

    const formatDateFn = ( date ) =>
    {
        const selectedDate = new Date( date );
        return (
            selectedDate.getDate() +
            "/" +
            parseInt( selectedDate.getMonth() + 1 ) +
            "/" +
            selectedDate.getFullYear()
        );
    };

    const sendingsms = async () =>
    {
        try
        {
            const uid = days.toLowerCase() + "," + date;
            let data = {
                uid: currentUser[ 0 ]?.role,
                message: mesg,
                date: mydate,
            };

            // console.log(pmsOne)

            console.log( "message" );

            const resone = await axios.post( `${ url }/api/billing/incoming`, data );

            setMessagesent( resone.data );
            // console.log(res)

            // alert( resone.data );
            // console.log(resone.data);

            //
        } catch ( err )
        {
            setLoading( false );
            console.log( err );
            //   setError("Please refresh...");
        }
    };

    const approve = async () =>
    {
        try
        {
            const uid = days.toLowerCase() + "," + date;
            let data = {
                uid: currentUser[ 0 ]?.role,
                reportstatus: "Accepted",
                message: mesg,
                date: mydate,
            };

            // console.log(pmsOne)

            const resone = await axios.post( `${ url }/api/billing/message`, data );

            setMessagesent( `Approval ${ resone.data }` );
            // console.log(res)

            // alert( resone.data );
            // console.log(resone.data);

            //
        } catch ( err )
        {
            setLoading( false );
            console.log( err );
            //   setError("Please refresh...");
        }
    };

    const rejected = async () =>
    {
        try
        {
            const uid = days.toLowerCase() + "," + date;
            let data = {
                uid: currentUser[ 0 ]?.role,
                reportstatus: "Rejected",
                message: mesg,
                date: mydate,
            };

            // console.log(pmsOne)

            const resone = await axios.post( `${ url }/api/billing/message`, data );

            setMessagesent( `Reject ${ resone.data }` );
            // console.log(res)

            // alert( resone.data );
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
                <div className="general">
                    <p>GENERAL REPORT  {getFormattedDate()}</p>
                </div>
                <div className="datepicking">
                    <input
                        type="date"
                        className="custom-date-input"
                        value={ mydate }
                        onChange={ handleChange }
                    />

                    {/* <div className="dateing" onClick={ handleChange }>
                        <p>FETCH</p>
                    </div> */}
                </div>



                <div className="report">
                    <div className="line"></div>
                    <div className="allo">
                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Total amount</p>
                            </div>

                            <p className="mbili">
                                Tsh { Number( salesdata?.totalsales ).toLocaleString() }
                            </p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Z-Report</p>
                            </div>

                            <p className="mbili">
                                Tsh { Number( salesdata.zreport ).toLocaleString() }
                            </p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Sales difference</p>
                            </div>

                            <p className="mbili">
                                Tsh { Number( salesdata.difference ).toLocaleString() }
                            </p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Debts amount</p>
                            </div>

                            <p className="mbili">
                                Tsh { Number( salesdata?.totaldebts ).toLocaleString() }
                            </p>
                        </div>
                    </div>

                    <div className="analogs">
                        <p>DIGITAL DATA</p>
                    </div>
                    <div className="conts">
                        <div className="prics">
                            <p id="prc">PMS 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.pmsonedigitalopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.pmsonedigitalclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.pmsonedigitaloutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">PMS 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.pmstwodigitalopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.pmstwodigitalclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.pmstwodigitaloutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">AGO 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.agoonedigitalopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.agoonedigitalclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.agoonedigitaloutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">AGO 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.agotwodigitalopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.agotwodigitalclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.agotwodigitaloutput ).toLocaleString() } L</p>
                            </div>
                        </div>
                    </div>

                    <div className="analogs">
                        <p>ANALOG DATA</p>
                    </div>

                    <div className="conts">
                        <div className="prics">
                            <p id="prc">PMS 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.pmsoneanalogopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.pmsoneanalogclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.pmsoneanalogoutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">PMS 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.pmstwoanalogopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( pmstwoanalogclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.pmstwoanalogoutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">AGO 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.agooneanalogopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.agooneanalogclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.agooneanalogoutput ).toLocaleString() } L</p>
                            </div>
                        </div>

                        <div className="prics">
                            <p id="prc">AGO 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number( values.agotwoanalogopening ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number( values.agotwoanalogclosing ).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number( values.agotwoanalogoutput ).toLocaleString() } L</p>
                            </div>
                        </div>
                    </div>

                    <div className="contss">
                        <div className="priccs">
                            <p>PMS 01</p>
                            <p>{ Number( salesdata?.pmsoneoutput ).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>PMS 02</p>
                            <p>{ Number( salesdata?.pmstwooutput ).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AGO 01</p>
                            <p>{ Number( salesdata?.agooneoutput ).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AG0 02</p>
                            <p>{ Number( salesdata?.agotwooutput ).toLocaleString() } /=</p>
                        </div>
                    </div>
                </div>

                <div className="differencereason">
                    <p>REASON FOR Z-REPORT & CASH SALES</p>
                    <p>{ reason }</p>
                </div>

                <div className="stocks">
                    <div className="diesels">
                        <p className="pps">DIESEL</p>
                        <div className="alldiesel">
                            <p>Pysical Stock</p>
                            <p>{ Number( salesdata.agophysical ).toLocaleString() } L</p>
                        </div>

                        <div className="alldiesel">
                            <p>Dipstock Stock</p>
                            <p>{ Number( salesdata.agodipstick ).toLocaleString() } L</p>
                        </div>
                    </div>
                    <div className="petrols">
                        <div className="diesels">
                            <p className="pps">PETROL</p>
                            <div className="alldiesel">
                                <p>Pysical Stock</p>
                                <p>{ Number( salesdata.pmsphysical ).toLocaleString() } L</p>
                            </div>

                            <div className="alldiesel">
                                <p>Dipstock Stock</p>
                                <p>{ Number( salesdata.pmsdipstick ).toLocaleString() } L</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="debtorslist">
                    <div className="deters">
                        <p>DEBTORS' LIST</p>
                    </div>

                    <div className="dlist">
                        <table className="home-table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>NAME</th>
                                    <th>AMOUNT</th>
                                    <th>MODE</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                { salesdata.debtors.map( ( val, key ) =>
                                {
                                    return (
                                        <tr>
                                            <td>{ key + 1 }</td>
                                            <td>{ val.name }</td>
                                            <td>{ Number( val.amount ).toLocaleString() }</td>
                                            <td>{ val?.modeofpay || "-" }</td>
                                            <td>{ val.uid.split( "," )[ 0 ] }</td>
                                        </tr>
                                    );
                                } ) }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="debtorslist">
                    <div className="deters">
                        <p>CREDITORS' LIST</p>
                    </div>

                    <div className="dlist">
                        <table className="home-table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>NAME</th>
                                    <th>AMOUNT</th>
                                    <th>MODE</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                { salesdata.creditors.map( ( val, key ) =>
                                {
                                    return (
                                        <tr>
                                            <td>{ key + 1 }</td>
                                            <td>{ val.name }</td>
                                            <td>{ Number( val.amount ).toLocaleString() }</td>
                                            <td>{ val?.modeofpay || "-" }</td>
                                            <td>{ val.uid.split( "," )[ 0 ] }</td>
                                        </tr>
                                    );
                                } ) }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="debtorslists">
                    <div className="deters">
                        <p>EXPENSES' LIST</p>
                    </div>

                    <div className="dlist">
                        <table className="home-table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>USAGES</th>
                                    <th>AMOUNT</th>

                                    <th>DATE</th>
                                </tr>
                            </thead>
                            { salesdata.expensesdata.map( ( val, key ) =>
                            {
                                return (
                                    <tr>
                                        <td>{ key + 1 }</td>
                                        <td>{ val.usages }</td>
                                        <td>{ Number( val.amount ).toLocaleString() }</td>
                                        <td>{ val.uid.split( "," )[ 0 ] }</td>
                                    </tr>
                                );
                            } ) }
                        </table>
                    </div>
                </div>

                <div className="debtorslista"></div>
                <div className="mesags">
                    <div className="debtorslis">
                        <button onClick={ approve }>Approve</button>
                        <button onClick={ rejected }>Reject</button>
                    </div>

                    <div className="msgs">
                        <input
                            type="text"
                            placeholder="Write message ..."
                            value={ mesg }
                            onChange={ ( e ) => setMessage( e.target.value ) }
                        />
                        <img src={ send } alt="" onClick={ sendingsms } />

                        <div className="msgsent">
                            <p>{ messagesent }</p>
                        </div>
                    </div>
                </div>

                <div className="debtoslis"></div>
            </div>
        </div>
    );
}
