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
        lastpetrol,
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
        dieselAmount,
        petrolAmount,
    } = useContext( AuthContext );

    const [ loading, setLoading ] = useState( false );
    const [ tableData, setData ] = useState( [] );

    const [ weekly, setWeekly ] = useState( true );
    const [ monthly, setMonthly ] = useState( false );
    const [ yearly, setYearly ] = useState( false );

    const [ totalexpense, setTotalexpense ] = useState( "0" );
    const [ reason, setReason ] = useState( "" )

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
            const uid = days.toLowerCase() + "," + date;
            let debtors = {
                uid: uid,
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

                            <p className="mbili">Tsh { totalEarnings }</p>
                        </div>
                    </div>

                    <div className="conts">
                        <div className="prics">
                            <p>PMS 01</p>
                            <p>Opening - { pmsoneopening } L</p>
                            <p>Closing - { pmsoneclosing } L</p>
                            <p>Output - { pmsonelitres } L</p>
                        </div>

                        <div className="prics">
                            <p>PMS 02</p>
                            <p>Opening - { pmstwoopening } L</p>
                            <p>Closing - { pmstwoclosing } L</p>
                            <p>Output - { pmstwolitres } L</p>
                        </div>

                        <div className="prics">
                            <p>AGO 01</p>
                            <p>Opening - { agooneopening } L</p>
                            <p>Closing - { agooneclosing } L</p>
                            <p>Output - { agoonelitres } L</p>
                        </div>

                        <div className="prics">
                            <p>AG0 02</p>
                            <p>Opening - { agotwoopening } L</p>
                            <p>Closing - { agotwoclosing } L</p>
                            <p>Output - { agotwolitres } L</p>
                        </div>
                    </div>

                    <div className="contss">
                        <div className="priccs">
                            <p>PMS 01</p>
                            <p>{ pmsoneamount } /=</p>
                        </div>

                        <div className="priccs">
                            <p>PMS 02</p>
                            <p>{ pmstwoamount } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AGO 01</p>
                            <p>{ agooneamount } /=</p>
                        </div>

                        <div className="priccs">
                            <p>AG0 02</p>
                            <p>{ agotwoamount } /=</p>
                        </div>
                    </div>
                </div>

                <div className="differencereason">
                    <p>REASON FOR Z-REPORT & CASH SALES</p>
                    <p>{ reason }</p>
                </div>

                <div className="stocks">
                    <div className="diesels">
                        <p>DIESEL</p>
                        <div className="alldiesel">
                            <p>Pysical Stock</p>
                            <p>{ 0 } L</p>
                        </div>

                        <div className="alldiesel">
                            <p>Pysical Stock</p>
                            <p>{ 0 } L</p>
                        </div>
                    </div>
                    <div className="petrols">
                    <div className="diesels">
                        <p>PETROL</p>
                        <div className="alldiesel">
                            <p>Pysical Stock</p>
                            <p>{ 0 } L</p>
                        </div>

                        <div className="alldiesel">
                            <p>Pysical Stock</p>
                            <p>{ 0 } L</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="debtorslist">

                </div>


                <div className="debtorslist">

                </div>


            </div>
        </div>
    );
}
