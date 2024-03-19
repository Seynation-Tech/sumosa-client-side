import axios from "axios";
import { createContext, useEffect, useState } from "react";
import jwt from "jwt-decode";
import Cookies from "cookie-universal";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [tokns, setToken] = useState("");
  const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const url = "https://sumosa-api.onrender.com";
  // const url='http://localhost:5001'
  // const url='https://dormdatabase-production.up.railway.app'

  const [zrepos, setZreport] = useState("");

  const [totalEarnings, setEarnings] = useState("0");
  const [dieselAmount, setdieselAmount] = useState("0");
  const [petrolAmount, setpetrolAmount] = useState("0");
  const [diff, setDifferences] = useState("0");
  const [dieselprice, setDieselprice] = useState("0");
  const [petrolprice, setPetrolprice] = useState("0");
  const [tableData, setData] = useState([]);
  const [alldebts, setDebts] = useState("");
  const [allexpenses, setExpenses] = useState("");
  const [dipstocks, setDipstocks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/billing/allpricings`, {
          withCredentials: true,
        });

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

        let pric = Object.values(res.data)[Object.values(res.data).length - 1];

        let pricings = Object.values(res.data)[
          Object.values(res.data).length - 1
        ];

        let todaydates = Object.values(dets.data)[
            Object.values(dets.data).length - 1
          ];
        const dlength = res.data.length;

        console.log(expens.data)

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

        // console.log(pone,ptwo,aone,atwo)

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

        setdieselAmount(Number(totalDiesel).toLocaleString());
        setpetrolAmount(Number(totalPetrol).toLocaleString());
        setEarnings(Number(totalAmount).toLocaleString());
        setZreport(Number(last_value.zreport).toLocaleString());
        setDifferences(Number(differences).toLocaleString());
        setData(dets.data);
        // console.log(Number(pricings.diesel).toLocaleString())
        setDieselprice(Number(pricings.diesel).toLocaleString());
        setPetrolprice(Number(pricings.petrol).toLocaleString());
        setDebts(Number(todaydates.amount).toLocaleString())
        // console.log(last_value.zreport)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
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
        zrepos,
        totalEarnings,
        dieselAmount,
        petrolAmount,
        url,
        tokns,
        dieselprice,
        petrolprice,
        currentUser,
        tableData,alldebts,
        userlogin,
        userlogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
