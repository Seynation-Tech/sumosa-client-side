import React, { useState, useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import sda from "../../Images/sumoo.png";
import axios from "axios";
import { AuthContext } from "../AuthContext.js";

const dateToFormat = "1976-04-19T12:59-0500";

let today = new Date();
let date =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() 
let mydate =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  " " +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();

export default function Sign() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contacts, setContacts] = useState("");
  const [idnumber, setIdnumber] = useState("");
  const [residence, setResidence] = useState("");
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const { url ,days} = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [notify,setNotfs] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userdata") || null)
  );


  const registerUser = async () => {
    setNotfs(false)
    if (name && role && contacts && residence && idnumber) {
      try {
        
        const lastName = name.split(" ")[0];
        const uid = days.toLowerCase() + ","+date;
        // name	username	password	role	contacts	phaseshift	image	idnumber	residence	permit	

        // console.log(uid,name,idnumber,lastName,role,contacts,residence)
        let data = {
          uid: uid,
          name: name,
          username: idnumber,
          password: lastName,
          role: role.toLowerCase(),
          contacts: contacts,
          phaseshift: "default",
          image: "default",
          idnumber: idnumber,
          residence: residence,
          permit: "none",
        };

        setLoading(true);
        const res = await axios.post(`${url}/api/auths/register`, data, {
          withCredentials: true,
        });
        setNotfs(true)
        setLoading(false);
        setStatus(res.data);
      } catch (err) {
        setNotfs(true)
        console.log(err)
        setStatus("Registration Failed!");
      }
    } else {
      setNotfs(true)
      setStatus("Fill all details!");
    }
  };

  const updateData=()=>{
      console.log(currentUser)
  }

  const addUser=()=>{

  }
  return (
    <div className="welcome-pages">
      {/* body contents */}
      <div className="body-contentcc">
        {/* Highlight words */}

        <div className="ouur">
          <div className="sdas">
            <img src={sda} alt="" className="" />
          </div>
          <div className="sdaconts">
            <div className="anaccount">
              <p>Create Account</p>
            </div>

            <div className="forms">
              <div className="input-one">
                {/* <i>icon</i> */}
                <input placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}/>
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input placeholder="Role" alue={role}
                  onChange={(e) => setRole(e.target.value)}/>
              </div>
              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="number" placeholder="Contacts" Value={contacts}
                  onChange={(e) => setContacts(e.target.value)}/>
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="number" placeholder="Idnumber" alue={idnumber}
                  onChange={(e) => setIdnumber(e.target.value)}/>
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input placeholder="Residence" value={residence}
                  onChange={(e) => setResidence(e.target.value)}/>
              </div>
            </div>

            <div className="remember-opt">
              <button className="sign-btn" onClick={registerUser}>
                Submit
              </button>
            </div>

            {notify&& <div className="stat">
              <p>{status}</p>
            </div>}
          </div>
          <div className="atts">
            <button onClick={updateData}>UPDATE</button>
            <button onClick={addUser}>ADD USER</button>
          </div>
        </div>
      </div>
    </div>
  );
}
