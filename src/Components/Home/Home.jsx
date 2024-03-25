import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import "./Mobile.css";
import Mids from "../Charts/Mids";
import Values from "../Charts/Values";
import stoc from "../../Images/invest.png";
import report from "../../Images/repo.png";
import drop from "../../Images/dropdo.png";
import settings from "../../Images/setting.png";
import message from "../../Images/chat.png";
import overview from "../../Images/routine.png";
import ela from "../../Images/ela.png";
import col from "../../Images/c.png";
import locate from "../../Images/lo.png";

import pet from "../../Images/p.png";
import Sidebar from "../Sidebar/Sidebar";
import Clock from "react-live-clock";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Cookies from "cookie-universal";
import logos from "../../Images/sumoo.png";

axios.defaults.withCredentials = true;

const dateToFormat = "1976-04-19T12:59-0500";

let today = new Date();
let date =
  today.getDate() +
  "/" +
  ( today.getMonth() + 1 ) +
  "/" +
  today.getFullYear() 
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
    petroldisp,salesdata,values,
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

          const resp = await axios.get( `http://localhost:5001/api/billing/incoming`, {
            withCredentials: true,
          } );




          let mesage = Object.values( resp.data )[
            Object.values( resp.data ).length - 1
          ];

          let todaydates = Object.values( resptwo.data )[
            Object.values( resptwo.data ).length - 1
          ];
          // console.log(todaydates)
          if ( resp.data.length > 0 || resptwo.data.length > 0 )
          {
            if ( todaydates.reportstatus === "Accepted" )
            {
              setNun( true )
            } else
            {
              setNun( false )
            }

          }
          // console.log(mesage)
          setMessageone( [ mesage ] )
     

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

  const cancelreading = async () =>
  {
    setRead( false )

  }

  const deleteMsg = async ( e ) =>
  {

    try
    {
      //  alert(alldat.name)
      const resone = await axios.delete( `${ url }/api/billing/incoming/${ e }`, { withCredentials: true } );


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
      {sidebar && <Sidebar />}
      <Sidebar />
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
                      <p>- { val?.message }</p>
                      <p>Time: { val?.date }</p>

                      {/* <img src={can} alt="" onClick={(e)=>deleteMsg(val.uid)}/> */ }

                    </div>
                  )
                } )
              }


              <button className="cancelo" onClick={ cancelreading }>cancel</button>

            </div>
            }

            { currentUser[ 0 ]?.role ? <NavLink to="/signup">

          
             <div className="leftimgs">
              <img src={ settings } alt="" />
            </div>  </NavLink> : <></> }
            <div className="leftimgs" onClick={ startreading }>
              <img src={ message } alt="" />
              { nun ? <div className="otify"></div> : <div className="otif"></div> }
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

              <div className="grap"> <p>Fuel Weekly Analysis</p> </div>
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
                      <img src={ ela } alt="" />
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
                      <img src={ ela } alt="" />
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
                    <p> { (Number(values.pmsonedigitaloutput) + Number(values.pmstwodigitaloutput)+Number(values.agoonedigitaloutput)+Number(values.agotwodigitaloutput)).toLocaleString() } L</p>
                  </div>
                </div>

               

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Petrol Sales</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { Number(salesdata.pmssales).toLocaleString() }</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Diesel Sales</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { Number(salesdata.dieselsales).toLocaleString() }</p>
                  </div>
                </div>

                <div className="sectconty">
                  <div className="sst">
                    <img src={ report } alt="" />
                    <p>Sales</p>
                  </div>

                  <div className="amount">
                    <p>Tsh { Number(salesdata.totalsales).toLocaleString() }</p>
                  </div>
                </div>
              </div>

              <div className="firsts">
                <img src={locate} alt="" />
                <p>TUTUO TABORA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sectionthree">
        <div className="lowersecta">
    
          <Clock
            format={ "HH:mm:ss" }
            ticking={ true }
            timezone={ "Africa/Nairobi" }
          />

<p id="dat">{days}, { date }</p>
        </div>
        <div className="first">
          <div className="fs">
            <div className="ex">
              <img src={col} alt="" />
              <p>Collection</p>
            </div>

            <div className="curr">
              <p>currences</p>
            </div>
          </div>
          <div className="sc">
            <div className="pd">
              <div className="pet">
                <img src={pet} style={{width: "23px"}} alt="" />
                <p>Petrol</p>
              </div>
              <div className="exch">
                <img src="" alt="" />
              </div>
            </div>
            <div className="totalamount">
              <div className="tot">
              <img src={stoc} style={{width: "28px"}} alt="" />
              </div>

              <p>Instock: { Number(salesdata.pmsphysical).toLocaleString() }</p>
              <p>
                <span id="aval"> Dipstock: </span> { Number(salesdata.pmsdipstick).toLocaleString() }
              </p>
            </div>

            <div className="remamount">
              <p>
                Remain:{ " " }
                { Number(
                  Number( salesdata.pmsphysical ) - Number( salesdata.pmsdipstick )
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
              <img src={pet} style={{width: "28px"}} alt="" />
                <p>Diesel</p>
              </div>
              <div className="exch" sytle={{background: "green"}}>
                {/* <img src={pet} style={{width: "28px"}} alt="" /> */}
              </div>
            </div>
            <div className="totalamount">
              <div className="tot"  >
              <img src={stoc} style={{width: "28px"}} alt="" />
              </div>

              <p>Instock: { Number(salesdata.agophysical).toLocaleString() }</p>
              <p>
                <span id="aval"> Dipstock: </span> { Number(salesdata.agodipstick).toLocaleString() }
              </p>
            </div>

            <div className="remamount">
              <p>
                Remain:{ " " }
                { Number(
                  Number( salesdata.agophysical ) - Number( salesdata.agodipstick )
                ).toLocaleString() }
              </p>
            </div>
          </div>
          <div className="thr"></div>
        </div>

        <div className="firstss">
          <p>website: sumosa.ac.tz</p>
        </div>
      </div>
    </div>
  );
}
