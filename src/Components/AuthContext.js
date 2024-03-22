import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "cookie-universal";
import "moment-timezone";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

let currentDate = new Date();

let nextWeek = new Date();

let date = new Date();
date.setDate(currentDate.getDate());
let weekDay = date.toLocaleString("en-US", { weekday: "long" });
let todaydate = weekDay + ": " + date.toLocaleDateString();
let days = weekDay.toUpperCase();
// console.log( days );

export const AuthContextProvider = ({ children }) => {
  const [tokns, setToken] = useState("");
  const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  // const url = "https://sumosa-api.onrender.com";
  const url = "http://localhost:5001";
  // const url='https://dormdatabase-production.up.railway.app'

  const [zrepos, setZreport] = useState("0");

  const [totalEarnings, setEarnings] = useState("0");
  const [dieselAmount, setdieselAmount] = useState("0");
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

          const rs = await axios.get(`${url}/api/weeklydatas`, {
            withCredentials: true,
          });

          const rst = await axios.get(`${url}/api/weeklyvalues`, {
            withCredentials: true,
          });

          const rsts = await axios.get(`${url}/api/mountsvalues`, {
            withCredentials: true,
          });

          setDatas(rs.data);
          setDts(rst.data);
          setAllDats(rst.data);

          let dieslstk = Object.values(dieslstock.data)[
            Object.values(dieslstock.data).length - 1
          ];

          console.log(dieslstk)
          let petrolstk = Object.values(petrolstock.data)[
            Object.values(petrolstock.data).length - 1
          ];

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

          setPetrollitres(totalpetrol.toLocaleString());
          setDiesellitres(toataldiesel.toLocaleString());

          setLiters(totalvalues.toLocaleString());

          const dieselamout = Number(pric.diesel);
          const petrolamount = Number(pric.petrol);

          const pmsoneAmount =
            Number(Number(pone.closingdigital) - Number(pone.openingdigital)) *
            petrolamount;
          const pmstwoAmount =
            Number(Number(ptwo.closingdigital) - Number(ptwo.openingdigital)) *
            petrolamount;

          const agooneAmount =
            Number(Number(aone.closingdigital) - Number(aone.openingdigital)) *
            dieselamout;
          const agotwoAmount =
            Number(Number(atwo.closingdigital) - Number(atwo.openingdigital)) *
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

          const pmsoneAmountanalog =
            Number(Number(pone.closingsanalog) - Number(pone.openinganalog)) *
            petrolamount;
          const pmstwoAmountanalog =
            Number(Number(ptwo.closingsanalog) - Number(ptwo.openinganalog)) *
            petrolamount;

          const agooneAmountanalog =
            Number(Number(ptwo.closingsanalog) - Number(ptwo.openinganalog)) *
            dieselamout;
          const agotwoAmountanalog =
            Number(Number(atwo.closingsanalog) - Number(atwo.openinganalog)) *
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

          setdieselAmount(Number(totalDiesel).toLocaleString());
          setpetrolAmount(Number(totalPetrol).toLocaleString());
          setEarnings(Number(totalAmount).toLocaleString());
          setZreport(Number(last_value.zreport).toLocaleString());
          setDifferences(Number(differences).toLocaleString());
          setData(dets.data);
          // console.log(Number(pricings.diesel).toLocaleString())
          setDieselprice(Number(pricings.diesel).toLocaleString());
          setPetrolprice(Number(pricings.petrol).toLocaleString());
          setDebts(Number(todaydates.amount).toLocaleString());
          setExpenses(Number(allexp.amount).toLocaleString());

          setDieselstock(dieslstk.physical);
          setDieseldips(dieslstk.dipstick);

          setPetrolStock(petrolstk.physical);
          setPetroldisps(petrolstk.dipstick);
        } catch (err) {
          // console.log(err)
        }
      };
      fetchData();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const userlogin = async (inputs) => {
    // console.log(inputs)
    const res = await axios.post(`${url}/api/auths/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    const usr = res.data[0];
    const token = res.data[1];

    setToken(token);
    localStorage.setItem("userdata", JSON.stringify(usr));

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
    localStorage.setItem("user", JSON.stringify(currentUser));
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
        datas,
        dats,
        alldats,
        url,
        tokns,
        days,
        todaydate,
        dieselprice,
        petrolprice,
        currentUser,
        allexpenses,
        tableData,
        totalliters,
        alldebts,
        totalanalogamount,
        pmsoneamount,pmstwoamount,agooneamount,agotwoamount,
        userlogin,
        userlogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
