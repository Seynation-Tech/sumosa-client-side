import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Review.css";
import "./Mobile.css"
import send from "../../Images/sen.png";
import Real from "../Charts/Real";
import Monthly from "../Charts/Expmonthly";
import Weekly from "../Charts/Expweekly";

import axios from "axios";
import { AuthContext } from "../AuthContext";

let today = new Date();
let date =
    today.getDate() + "/" + ( today.getMonth() + 1 ) + "/" + today.getFullYear();
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
        lastpetrol, currentUser,
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
        agooneanalogopening,agooneanalogclosing,
        agotwoanalogopening,
        agotwoanalogclosing, pmsoneanalogopening, pmsoneanalogclosing,
        pmstwoanalogopening, pmstwoanalogclosing,
        dieselAmount,
        petrolAmount, petroldisp,
        petrolstock,
        dieseldips,
        dieselstock
    } = useContext( AuthContext );

    const [ loading, setLoading ] = useState( false );
    const [ tableData, setData ] = useState( [] );
    const [ tableDatas, setDatas ] = useState( [] );
    const [ tableDataa, setDataa ] = useState( [] );

    const [ weekly, setWeekly ] = useState( true );
    const [ monthly, setMonthly ] = useState( false );
    const [ yearly, setYearly ] = useState( false );

    const [ mesg, setMessage ] = useState( "" );

    const [ totalexpense, setTotalexpense ] = useState( "0" );
    const [ reason, setReason ] = useState( "" )
    const [ messagesent, setMessagesent ] = useState( "" )

    const [deni,setTotalDeni] = useState("")

    useEffect( () =>
    {
        setLoading( true );

        const interval = setInterval( () =>
        {
            const fetchData = async () =>
            {
                try
                {
                    // console.log(pmsOne)

                    const resptwo = await axios.get( `${ url }/api/billing/inwords`, {
                        withCredentials: true,
                    } );

                    const respfour = await axios.get( `${ url }/api/billing/creditors`, {
                        withCredentials: true,
                    } );
                    setDatas( respfour.data );

                    // console.log(resptwo.data);
                    let words = Object.values( resptwo.data )[
                        Object.values( resptwo.data ).length - 1
                    ];

                    //   console.log(words)
                    setReason( words.differencereason )

                    //
                } catch ( err )
                {
                    setLoading( false );
                    console.log( err );
                    // setError( "Please refresh..." );
                }
            };
            fetchData();
        }, 3500 );
        return () => clearInterval( interval );
    }, [] );

    useEffect( () =>
    {
        setLoading( true );
        // const interval = setInterval(() => {
        const fetchData = async () =>
        {
            try
            {
                window.scrollTo( 0, 0 )
                const dets = await axios.get( `${ url }/api/billing/debtors`, {
                    withCredentials: true,
                } );

                const resptwo = await axios.get( `${ url }/api/billing/allexpenses`, {
                    withCredentials: true,
                } );

                let expens = 0;
                for (let i = 0; i < dets.data.length; i++) {
                  expens = Number(dets.data[i].amount) + expens;
                  setTotalDeni(expens);
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



    const sendingsms = async () =>
    {
        try
        {
            const uid = days.toLowerCase() + "," + date;
            let data = {
                uid: currentUser[ 0 ]?.role,
                message: mesg,
                date: mydate
            };

            // console.log(pmsOne)

            console.log( "message" )

            const resone = await axios.post( `${ url }/api/billing/incoming`, data );

            setMessagesent( resone.data )
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
    }

    const approve = async () =>
    {
        try
        {
            const uid = days.toLowerCase() + "," + date;
            let data = {
                uid: currentUser[ 0 ]?.role,
                reportstatus: "Accepted",
                message: mesg,
                date: mydate
            };

            // console.log(pmsOne)


            const resone = await axios.post( `${ url }/api/billing/message`, data );

            setMessagesent( `Approval ${ resone.data }` )
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
                date: mydate
            };

            // console.log(pmsOne)

            const resone = await axios.post( `${ url }/api/billing/message`, data );

            setMessagesent( `Reject ${ resone.data }` )
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

                            <p className="mbili">Tsh { totalEarnings }</p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Z-Report</p>
                            </div>

                            <p className="mbili">Tsh { zrepos }</p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Sales difference</p>
                            </div>

                            <p className="mbili">Tsh { diff }</p>
                        </div>

                        <div className="allrep">
                            <div className="dda">
                                <div className="dots"></div>
                                <p className="moja">Debts amount</p>
                            </div>

                            <p className="mbili">Tsh { deni.toLocaleString() }</p>
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
                                <p>{ Number(pmsoneopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(pmsoneclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{  Number(Number(pmsoneopening)-Number(pmsoneclosing)).toLocaleString() } L</p>
                            </div>

                        </div>


                        <div className="prics">
                            <p id="prc">PMS 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(pmstwoopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(pmstwoclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number(Number(pmstwoopening)-Number(pmstwoclosing)).toLocaleString()} L</p>
                            </div>

                        </div>

                        <div className="prics">
                            <p id="prc">AGO 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(agooneopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(agooneclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number(Number(agooneopening)-Number(agooneclosing)).toLocaleString() } L</p>
                            </div>

                        </div>

                        <div className="prics">
                            <p id="prc">AGO 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(agooneopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(agooneclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{Number(Number(agooneopening)-Number(agooneclosing)).toLocaleString() } L</p>
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
                                <p>{ Number(pmsoneanalogopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(pmsoneanalogclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number(Number(pmsoneanalogopening)-Number(pmsoneanalogclosing)).toLocaleString() } L</p>
                            </div>

                        </div>


                        <div className="prics">
                            <p id="prc">PMS 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(pmstwoanalogopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(pmstwoanalogclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{ Number(Number(pmstwoanalogopening)-Number(pmstwoanalogclosing)).toLocaleString() } L</p>
                            </div>

                        </div>

                        <div className="prics">
                            <p id="prc">AGO 01</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(agooneanalogopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(agooneanalogclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{  Number(Number(agooneanalogopening)-Number(agooneanalogclosing)).toLocaleString()  } L</p>
                            </div>

                        </div>

                        <div className="prics">
                            <p id="prc">AGO 02</p>
                            <div className="digi">
                                <p>Opening</p>
                                <p>{ Number(agotwoanalogopening).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Closing</p>
                                <p>{ Number(agotwoanalogclosing).toLocaleString() } L</p>
                            </div>

                            <div className="digi">
                                <p>Output</p>
                                <p>{  Number(Number(agotwoanalogopening)-Number(agotwoanalogclosing)).toLocaleString()  } L</p>
                            </div>

                        </div>


                    </div>

                    <div className="contss">
                    
                        <div className="priccs">
                            <p>PMS 01</p>
                            <p>{ Number(pmsoneamount).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>PMS 02</p>
                            <p>{ Number(pmstwoamount).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AGO 01</p>
                            <p>{ Number(agooneamount).toLocaleString() } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AG0 02</p>
                            <p>{ Number(agotwoamount).toLocaleString() } /=</p>
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
                            <p>{ Number(dieselstock).toLocaleString() } L</p>
                        </div>

                        <div className="alldiesel">
                            <p>Dipstock Stock</p>
                            <p>{ Number(dieseldips).toLocaleString() } L</p>
                        </div>
                    </div>
                    <div className="petrols">
                        <div className="diesels">
                            <p className="pps">PETROL</p>
                            <div className="alldiesel">
                                <p>Pysical Stock</p>
                                <p>{ Number(petrolstock).toLocaleString() } L</p>
                            </div>

                            <div className="alldiesel">
                                <p>Dipstock Stock</p>
                                <p>{ Number(petroldisp).toLocaleString() } L</p>
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
                                { tableData.map( ( val, key ) =>
                                {
                                    return (
                                        <tr>
                                            <td>{ key + 1 }</td>
                                            <td>{ val.name }</td>
                                            <td>{ Number( val.amount ).toLocaleString() }</td>
                                            <td>{ val?.modeofpay || "-" }</td>
                                            <td>{ ( val.uid ).split( "," )[ 1 ] }</td>


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
                                { tableDatas.map( ( val, key ) =>
                                {
                                    return (
                                        <tr>
                                            <td>{ key + 1 }</td>
                                            <td>{ val.name }</td>
                                            <td>{ Number( val.amount ).toLocaleString() }</td>
                                            <td>{ val?.modeofpay || "-" }</td>
                                            <td>{ ( val.uid ).split( "," )[ 1 ] }</td>


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
                            { tableDataa.map( ( val, key ) =>
                            {
                                return (
                                    <tr>
                                        <td>{ key + 1 }</td>
                                        <td>{ val.usages }</td>
                                        <td>{ Number( val.amount ).toLocaleString() }</td>
                                        <td>{ ( val.uid ).split( "," )[ 1 ] }</td>
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
                        <input type="text" placeholder="Write message ..." value={ mesg }
                            onChange={ ( e ) => setMessage( e.target.value ) } />
                        <img src={ send } alt="" onClick={ sendingsms } />

                        <div className="msgsent">
                            <p>{ messagesent }</p>
                        </div>
                    </div>

                </div>

                <div className="debtoslis">

                </div>


            </div>
        </div>
    );
}
