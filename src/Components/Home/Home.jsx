import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import "./Mobile.css";
import Mids from "../Charts/Mids";
import Real from "../Charts/Real";
import Values from "../Charts/Values";
import sales from "../../Images/sale.png";
import petrol from "../../Images/sum.png";
import can from "../../Images/canc.png";
import report from "../../Images/repo.png";
import drop from "../../Images/dropdo.png";
import settings from "../../Images/setting.png";
import message from "../../Images/chat.png";
import logout from "../../Images/login.png";
import overview from "../../Images/routine.png";
import Sidebar from "../Sidebar/Sidebar";
import Clock from "react-live-clock";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import moment from "moment";
import DotLoader from "react-spinners/DotLoader";
import Cookies from "cookie-universal";
import Moment from "react-moment";
import logos from "../../Images/sumoo.png";

axios.defaults.withCredentials = true;

const dateToFormat = "1976-04-19T12:59-0500";

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

const amount = 3000;

export default function Home ()
{
  const cookies = new Cookies();
  const {
    totalliters,
    allexpenses,
    url,
    dieselprice,
    petrolprice,
    diff,
    days, currentUser,
    zrepos,
    alldebts,
    totalEarnings,
    dieselAmount,
    petroldisp,
    petrolstock,
    dieseldips,
    dieselstock,
    petrolAmount,
    todaydate,
  } = useContext( AuthContext );

  const [ sidebar, setSidebar ] = useState( false );

  const [ currentUsers, setCurrentUser ] = useState( null );
  const navigate = useNavigate();
  const [ sideup, setSide ] = useState( false );
  const [ upper, setUpper ] = useState( true );
  const [ nun, setNun ] = useState( false )
  const [ messageOne, setMessageone ] = useState( [] )
  const [ messagetwo, setMessagetwo ] = useState( [] )
  const [ reads, setRead ] = useState( false )
  useEffect( () =>
  {


    const interval = setInterval( () =>
    {
      const fetchData = async () =>
      {
        try
        {
          const resptwo = await axios.get( `${ url }/api/billing/message`, {
            withCredentials: true,
          } );

          const resp = await axios.get( `${ url }/api/billing/incoming`, {
            withCredentials: true,
          } );

          if ( resp.data.length > 0 || resptwo.data.length > 0 )
          {
            setNun( true )
          }



          setMessageone( resptwo.data )
          setMessagetwo( resp.data )

          //
        } catch ( err )
        {

          console.log( err );
          // setError( "Please refresh..." );
        }
      };
      fetchData();
    }, 2000 );
    return () => clearInterval( interval );
  }, [] );

  const cancelreading = async() =>
  {
    setRead( false )
   
  }

  const deleteMsg = async() =>
  {

    try
    {
      //  alert(alldat.name)
      const resone = await axios.delete( `${ url }/api/billing/message`, { withCredentials: true } );
      

    } catch ( err )
    {

    }
  }

  const startreading = () =>
  {
    setRead( true )
  }

  const popUpside = () =>
  {
    window.scrollTo( 0, 0 );
    setUpper( false );
    let flag = sidebar;
    flag = !flag;
    setSidebar( flag );
  };

  const cancelSide = () =>
  {
    setSidebar( false );
    setUpper( true );
  };

  return (
    <div className="mainpage">
      { sidebar && <Sidebar /> }
      {/* SECTION TWO THE CONTENT PAGE */ }|
      <div className="upbove">
        <div className="aboveall">
          <img src={ logos } alt="" />
        </div>
        <div className="aboves">
          <p>SUMOSA</p>
        </div>

        <img className="dropdo" onClick={ popUpside } src={ drop } alt="" />
      </div>
      <div className="sectiontwo">
        <div className="lineage"></div>
        <div className="upsection">
          <div className="leftsect">
            <div className="leftimg">
              <img src={ overview } alt="" />
            </div>

            <div className="over">
              <p id="act">Overview</p>
              <p id="acts">Sumosa overall data</p>
            </div>
          </div>

          <div className="msection">
            <div className="plan">
              <p></p>
            </div>
          </div>

          <div className="leftsect">
            {/* <img src="" alt="" /> */ }

            {/* <p id='thisw'>This week</p> */ }
            {/* <div className="leftimgs">
              <img src={message} alt="" />
            </div> */}

            { reads && <div className="readmssg">

              {
                messageOne.map( ( val, key ) =>
                {
                  return (
                    <div className="mymsg">
                      <p>{ val.message }</p>
                      <p>Time: { val.date }</p>

                      <img src={can} alt="" onClick={deleteMsg}/>

                    </div>
                  )
                } )
              }


              <button className="cancelo" onClick={ cancelreading }>cancel</button>

            </div>
            }

            { currentUser[ 0 ]?.role === "Director" ? <div className="leftimgs">
              <img src={ settings } alt="" />
            </div> : <></> }
            <div className="leftimgs" onClick={ startreading }>
              <img src={ message } alt="" />
              { nun && <div className="otify"></div> }
            </div>

          </div>
        </div>

        <div className="lowsection">
          <div className="misect">
            <div className="left">
              <div className="head">
                <div className="leftims">
                  <img src={ settings } alt="" />
                </div>

                <div className="headword">
                  <p>WEEKLY SALES AMOUNT</p>
                </div>
              </div>

              <div className="graph">
                <Mids />
              </div>

              <div className="head">
                <div className="leftims">
                  <img src={ settings } alt="" />
                </div>

                <div className="headword">
                  <p>WEEKLY LITRES VALUES</p>
                </div>
              </div>

              <div className="graphs">
                <Values />
              </div>

              <div className="grap">{/* <p>Graphical data analysis</p> */ }</div>
            </div>

            <div className="right">
              <div className="lowersects">
                {/* <div className="logimg"> */ }
                {/* <img src={ logout } alt="" /> */ }
                {/* </div> */ }

                <div className="cc">
                  <p>General Data</p>
                  <p id="cons">Fuel Usage Metrics</p>
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={ petrol } alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Petrol</p>

                      <div className="pri">
                        <p>Tsh { petrolprice }</p>
                        {/* <img src={pend} alt="" /> */ }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  {/* <div className="ds"></div> */ }
                </div>
              </div>

              <div className="pricings">
                <div className="l">
                  <div className="petrol">
                    <div className="pimg">
                      <img src={ petrol } alt="" />
                    </div>

                    <div className="ss">
                      <p id="gs">Diesel</p>

                      <div className="pri">
                        <p>Tsh { dieselprice }</p>
                        {/* <img src={pend} alt="" /> */ }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="r">
                  <div className="ds"></div>

                  {/* <div className="ds"></div> */ }
                </div>
              </div>

              <div className="midsects">
                <div className="sectconts">
                  {/* <img src={ home } alt="" /> */ }
                  <p>Metrics</p>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Total Litres</p>
                  </div>

                  <div className="amount">
                    <p> { totalliters }</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Sales</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { totalEarnings }</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Expenses</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { allexpenses }</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Debts</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { alldebts }</p>
                  </div>
                </div>
              </div>

              <div className="firsts"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="sectionthree">
        <div className="lowersecta">
          {/* <Moment date={dateToFormat} /> */ }
          {/* <img src={clocs} alt="" /> */ }
          <p>{ days }</p>
          <Clock
            format={ "HH:mm:ss" }
            ticking={ true }
            timezone={ "Africa/Nairobi" }
          />
        </div>
        <div className="first">
          <div className="fs">
            <div className="ex">
              <img src="" alt="" />
              <p>Collection</p>
            </div>

            <div className="curr">
              <p>currences</p>
            </div>
          </div>
          <div className="sc">
            <div className="pd">
              <div className="pet">
                <img src="" alt="" />
                <p>Petrol</p>
              </div>
              <div className="exch">
                <img src="" alt="" />
              </div>
            </div>
            <div className="totalamount">
              <div className="tot">
                {/* <img src="" alt="" /> */ }
                {/* <p id="ids">Total Amount</p> */ }
              </div>

              <p>Instock: { petrolstock }</p>
              <p>
                <span id="aval"> Dipstock: </span> { petroldisp }
              </p>
            </div>

            <div className="remamount">
              <p>
                Remain:{ " " }
                { Number(
                  Number( petrolstock ) - Number( petroldisp )
                ).toLocaleString() }
              </p>
            </div>
          </div>
          <div className="thr"></div>
        </div>

        <div className="first">
          <div className="sc">
            <div className="pd">
              <div className="pet">
                <img src="" alt="" />
                <p>Diesel</p>
              </div>
              <div className="exch">
                <img src="" alt="" />
              </div>
            </div>
            <div className="totalamount">
              <div className="tot">
                {/* <img src="" alt="" /> */ }
                {/* <p id="ids">Total Amount</p> */ }
              </div>

              <p>Instock: { dieselstock }</p>
              <p>
                <span id="aval"> Dipstock: </span> { dieseldips }
              </p>
            </div>

            <div className="remamount">
              <p>
                Remain:{ " " }
                { Number(
                  Number( dieselstock ) - Number( dieseldips )
                ).toLocaleString() }
              </p>
            </div>
          </div>
          <div className="thr"></div>
        </div>

        <div className="firsts"></div>
      </div>
    </div>
  );
}
