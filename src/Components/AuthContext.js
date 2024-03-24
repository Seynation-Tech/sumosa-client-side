import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "cookie-universal";
import "moment-timezone";
axios.defaults.withCredentials = true;


function getStartandEndofWeek ( date )
{
    const currentDate = new Date( date )
    const currentDayofWeek = currentDate.getDay();

    const startDate = new Date( currentDate );
    startDate.setDate( currentDate.getDate() - currentDayofWeek + 1 );

    const endDate = new Date( currentDate );
    endDate.setDate( currentDate.getDate() - currentDayofWeek + 7 );

    const formattedStartDate = startDate.toISOString().split( 'T' )[ 0 ]
    const formattedEndDate = endDate.toISOString().split( 'T' )[ 0 ]

    return { startDate: formattedStartDate, endDate: formattedEndDate };
}


export const AuthContext = createContext();

let currentDate = new Date();

let nextWeek = new Date();

let date = new Date();
date.setDate(currentDate.getDate());
let weekDay = date.toLocaleString("en-US", { weekday: "long" });
let todaydate = weekDay + ": " + date.toLocaleDateString();
let days = weekDay.toUpperCase();
// console.log( days );

let today = new Date();
let dates =
today.getFullYear()+ "-" + today.getMonth() + "-" + today.getDate();

export const AuthContextProvider = ({ children }) => {
  const [tokns, setToken] = useState("");
  const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userdata") || null)
  );

  // const url = "https://sumosa-api.onrender.com";
  const url = "http://localhost:5001";

  const [zrepos, setZreport] = useState("0");

  const [totalEarnings, setEarnings] = useState("0");
  const [dieselAmount, setdieselAmount] = useState("0");

  const [dAmount,setDamount]  = useState("0")
  const [pAmount,setpamount]  = useState("0")


  const [petrolAmount, setpetrolAmount] = useState("0");
  const [diff, setDifferences] = useState("0");
  const [dieselprice, setDieselprice] = useState("0");
  const [petrolprice, setPetrolprice] = useState("0");
  const [tableData, setData] = useState([]);
  const [alldebts, setDebts] = useState("");
  const [allexpenses, setExpenses] = useState("0");
  const [dipstocks, setDipstocks] = useState("");
  const [totalliters, setLiters] = useState("0");
  const [petrolstock, setPetrolStock] = useState("0");
  const [petroldisp, setPetroldisps] = useState("0");
  const [dieselstock, setDieselstock] = useState("0");
  const [dieseldips, setDieseldips] = useState("0");

  const [petrollitres, setPetrollitres] = useState("0");
  const [diesellitres, setDiesellitres] = useState("0");

  const [pmsonelitres, setPmsonelitres] = useState("0");
  const [pmstwolitres, setPmstwolitres] = useState("0");
  const [agoonelitres, setAgoonelitres] = useState("0");
  const [agotwolitres, setAgotwolitres] = useState("0");

  const [lastpetrol, setPetrollitreslast] = useState("0");
  const [lastdiesel, setDiesellitreslast] = useState("0");

  const [totalanalogamount, setTotalanalogamout] = useState("0");

  const [datas, setDatas] = useState([]);
  const [dats, setDts] = useState([]);
  const [alldats, setAllDats] = useState([]);

  const [dlita,setDlitres] = useState("")
  const [plita,setPlitres] = useState("")

  const [pmsoneamount,setPmsoneamount] = useState("0");
  const [pmstwoamount,setPmstwoamount] = useState("0");
  const [agooneamount,setagooneamount] = useState("0");
  const [agotwoamount,setagotwoamount] = useState("0");

  const [agooneopening,setAgooneopening] = useState("0");
  const [agooneclosing,setAgooneclosing] = useState("0"); 
  const [agotwoopening,setAgotwoopening] = useState("0"); 
  const [agotwoclosing,setAgotwoclosing] = useState("0"); 

  const [pmsoneopening,setPmsoneopening] = useState("0");
  const [pmsoneclosing,setPmsoneclosing] =  useState("0"); 
  const [pmstwoopening,setPmstwoopening] = useState("0");
  const [pmstwoclosing,setPmstwoclosing] = useState("0");

  const [agooneanalogopening,setAgooneanalogopening] = useState("0");
  const [agooneanalogclosing,setAgooneanalogclosing] = useState("0");
  const [agotwoanalogopening,setAgotwoanalogopening] = useState("0"); 
  const [agotwoanalogclosing,setAgotwoanalogclosing] = useState("0");

  const [pmsoneanalogopening,setPmsoneanalogopening] = useState("0");
  const [pmsoneanalogclosing,setPmsoneanalogclosing] = useState("0");
  const [pmstwoanalogopening,setPmstwoanalogopening] = useState("0"); 
  const[pmstwoanalogclosing, setPmstwoanalogclosing] = useState("0");

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${url}/api/billing/allpricings`, {
            withCredentials: true,
          });

          // console.log(res.data)

          const resps = await axios.get(`${url}/api/billing/allcollectmoney`, {
            withCredentials: true,
          });

          const respone = await axios.get(`${url}/api/pumps/dieselone/`, {
            withCredentials: true,
          });

          const resptwo = await axios.get(`${url}/api/pumps/petrolone/`, {
            withCredentials: true,
          });

          const respthree = await axios.get(`${url}/api/pumps/dieseltwo/`, {
            withCredentials: true,
          });

          const respfour = await axios.get(`${url}/api/pumps/petroltwo/`, {
            withCredentials: true,
          });

          const dets = await axios.get(`${url}/api/billing/debtors`, {
            withCredentials: true,
          });

          const expens = await axios.get(`${url}/api/billing/allexpenses`, {
            withCredentials: true,
          });

          const dieslstock = await axios.get(
            `${url}/api/billing/agofuelstock`,
            {
              withCredentials: true,
            }
          );

          const petrolstock = await axios.get(
            `${url}/api/billing/pmsfuelstock`,
            {
              withCredentials: true,
            }
          );

          // http://localhost:5001/api/pumps/datas

          // http://localhost:5001/api/pumps/alldatavalues
          
         const startdate = getStartandEndofWeek(dates).startDate
         const enddate = getStartandEndofWeek(dates).endDate

          const rs = await axios.get(`${url}/api/weeklydatas/data/${startdate}/${enddate}`, {
            withCredentials: true,
          });

          const rst = await axios.get(`${url}/api/weeklydatas/datas/${startdate}/${enddate}`, {
            withCredentials: true,
          });

          const rsts = await axios.get(`${url}/api/weeklydatas/alldatas/${startdate}/${enddate}`, {
            withCredentials: true,
          });


          

          setDatas(rs.data);
          setDts(rst.data);
          setAllDats(rsts.data);

          let dieslstk = Object.values(dieslstock.data)[
            Object.values(dieslstock.data).length - 1
          ];

          
          let petrolstk = Object.values(petrolstock.data)[
            Object.values(petrolstock.data).length - 1
          ];

          // console.log(dieslstk)
          setDieselstock(dieslstk.physical);
          setDieseldips(dieslstk.dipstick);

          setPetrolStock(petrolstk.physical);
          setPetroldisps(petrolstk.dipstick);

          let pric = Object.values(res.data)[
            Object.values(res.data).length - 1
          ];

          let pricings = Object.values(res.data)[
            Object.values(res.data).length - 1
          ];

          let todaydates = Object.values(dets.data)[
            Object.values(dets.data).length - 1
          ];

          let allexp = Object.values(expens.data)[
            Object.values(expens.data).length - 1
          ];
          const dlength = res.data.length;

          // console.log(expens.data)

          let pone = Object.values(resptwo.data)[
            Object.values(resptwo.data).length - 1
          ];
          let ptwo = Object.values(respfour.data)[
            Object.values(respfour.data).length - 1
          ];
          let aone = Object.values(respone.data)[
            Object.values(respone.data).length - 1
          ];
          let atwo = Object.values(respthree.data)[
            Object.values(respthree.data).length - 1
          ];

          // console.log(pone)

          setAgooneopening(aone.openingdigital)
          setAgooneclosing(aone.closingdigital)
          setAgotwoopening(atwo.openingdigital)
          setAgotwoclosing(atwo.closingdigital)

          setPmsoneopening(pone.openingdigital)
          setPmsoneclosing(pone.closingdigital) 
          setPmstwoopening(ptwo.openingdigital)
          setPmstwoclosing(ptwo.closingdigital)

          setAgooneanalogopening(aone.openinganalog)
          setAgooneanalogclosing(aone.closingsanalog)
          setAgotwoanalogopening(atwo.openinganalog)
          setAgotwoanalogclosing(atwo.closingsanalog)

          // console.log(pone)

          setPmsoneanalogopening(pone.openinganalog)
          setPmsoneanalogclosing(pone.closingsanalog)
          setPmstwoanalogopening(ptwo.openinganalog)
          setPmstwoanalogclosing(ptwo.closingsanalog)

          let pmone = Object.values(resptwo.data)[
            Object.values(resptwo.data).length - 2
          ];
          let pmto = Object.values(respfour.data)[
            Object.values(respfour.data).length - 2
          ];
          let agoe = Object.values(respone.data)[
            Object.values(respone.data).length - 2
          ];
          let agto = Object.values(respthree.data)[
            Object.values(respthree.data).length - 2
          ];

         

          // console.log(pmone,pmto,agoe,agto)

          // console.log(pone.outputvalue,ptwo.outputvalue)
          const totalpetrol =
            Number(pone.outputvalue) + Number(ptwo.outputvalue);

          // console.log(totalpetrol)

          const toataldiesel =
            Number(aone.outputvalue) + Number(atwo.outputvalue);

          // console.log(respthree.data.length)

          if (respthree.data.length > 1) {
            const lasttotalpetrol =
              Number(pmone.outputvalue) + Number(pmto.outputvalue);

            const lasttoataldiesel =
              Number(agoe.outputvalue) + Number(agto.outputvalue);
            // console.log(lasttoataldiesel,lasttotalpetrol)
            setDiesellitreslast(lasttotalpetrol.toLocaleString());
            setPetrollitreslast(lasttoataldiesel.toLocaleString());
          }

          const totalvalues =
            Number(pone.outputvalue) +
            Number(ptwo.outputvalue) +
            Number(aone.outputvalue) +
            Number(atwo.outputvalue);

          setPmsonelitres(Number(pone.outputvalue).toLocaleString());
          setPmstwolitres(Number(ptwo.outputvalue).toLocaleString());
          setAgoonelitres(Number(aone.outputvalue).toLocaleString());
          setAgotwolitres(Number(atwo.outputvalue).toLocaleString());

          setDlitres(Number(toataldiesel))
          setPlitres(Number(totalpetrol))

          setPetrollitres(totalpetrol.toLocaleString());
          setDiesellitres(toataldiesel.toLocaleString());

          setLiters(totalvalues.toLocaleString());

          const dieselamout = Number(pric.diesel);
          const petrolamount = Number(pric.petrol);

          const pmsoneAmount =
            Number(Number(pone.openingdigital) - Number(pone.closingdigital)) *
            petrolamount;
          const pmstwoAmount =
            Number(Number(ptwo.openingdigital) - Number(ptwo.closingdigital)) *
            petrolamount;

          const agooneAmount =
            Number(Number(aone.openingdigital) - Number(aone.closingdigital)) *
            dieselamout;

            // console.log(agooneAmount)


          const agotwoAmount =
            Number(Number(atwo.openingdigital) - Number(atwo.closingdigital)) *
            dieselamout;

          const totalAmount = Number(
            pmsoneAmount + pmstwoAmount + agooneAmount + agotwoAmount
          );
          const totalPetrol = Number(pmsoneAmount) + Number(pmstwoAmount);
          const totalDiesel = Number(agooneAmount) + Number(agotwoAmount);

          let last_value = Object.values(resps.data)[
            Object.values(resps.data).length - 1
          ];


          const differences = Number(last_value.zreport) - Number(totalAmount);

          // console.log

          const pmsoneAmountanalog =
            Number(Number(pone.openinganalog) - Number(pone.closingsanalog)) *
            petrolamount;
          const pmstwoAmountanalog =
            Number(Number(ptwo.openinganalog) - Number(ptwo.closingsanalog)) *
            petrolamount;

          const agooneAmountanalog =
            Number(Number(ptwo.openinganalog) - Number(ptwo.closingsanalog)) *
            dieselamout;
          const agotwoAmountanalog =
            Number(Number(atwo.openinganalog) - Number(atwo.closingsanalog)) *
            dieselamout;

          const totalanalogAmount = Number(
            pmsoneAmountanalog +
              pmstwoAmountanalog +
              agooneAmountanalog +
              agotwoAmountanalog
          );

          setPmsoneamount(pmsoneAmount)
          setPmstwoamount(pmstwoAmount)
          setagooneamount(agooneAmount)
          setagotwoamount(agotwoAmount)

          setTotalanalogamout(totalanalogAmount.toLocaleString());

          setDamount(Number(totalDiesel))
          setpamount(Number(totalPetrol))

          setdieselAmount(Number(totalDiesel).toLocaleString());
          setpetrolAmount(Number(totalPetrol).toLocaleString());
          setEarnings(Number(totalAmount).toLocaleString());
          setZreport(Number(last_value.zreport).toLocaleString());
          // console.log(diff)
          setDifferences(Number(differences));
          setData(dets.data);
          // console.log(Number(pricings.diesel).toLocaleString())
          setDieselprice(Number(pricings.diesel).toLocaleString());
          setPetrolprice(Number(pricings.petrol).toLocaleString());
          setDebts(Number(todaydates.amount).toLocaleString());
          setExpenses(Number(allexp.amount).toLocaleString());

         

         
        } catch (err) {
          // console.log(err)
        }
      };
      fetchData();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const userlogin = async (inputs) => {
    console.log(inputs)
    const res = await axios.post(`${url}/api/auths/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    const usr = res.data[0];


    const token = res.data[1];

    setToken(token);
    localStorage.setItem("sumodata", JSON.stringify(token));

    cookies.set("sumosatoken", token, {
      path: "/",
      secure: true,
    });

    return usr;
  };

  const userlogout = async (inputs) => {
    const res = axios.post(`${url}/auths/api/logout`, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        diff,
        petroldisp,
        petrolstock,
        dieseldips,
        dieselstock,
        zrepos,
        totalEarnings,
        dieselAmount,
        petrolAmount,
        pmsonelitres,
        pmstwolitres,
        agoonelitres,
        agotwolitres,
        petrollitres,
        diesellitres,
        lastdiesel,
        lastpetrol,
        agooneopening,agooneclosing,
        agotwoopening,agotwoclosing,
        pmsoneopening,pmsoneclosing,
        pmstwoopening,pmstwoclosing,
        agooneanalogopening,agooneanalogclosing,
        agotwoanalogopening,
        datas,
        dats,dAmount,pAmount,
        alldats,
        url,
        tokns,
        days,
        todaydate,
        dieselprice,plita,dlita,
        petrolprice,
        currentUser,
        allexpenses,
        tableData,
        totalliters,
        alldebts,
        totalanalogamount,
        pmsoneamount,pmstwoamount,agooneamount,agotwoamount,
        agotwoanalogclosing,pmsoneanalogopening,pmsoneanalogclosing,
        pmstwoanalogopening,pmstwoanalogclosing,
        userlogin,

        userlogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
