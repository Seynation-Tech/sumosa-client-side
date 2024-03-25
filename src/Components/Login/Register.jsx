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

export default function Register() {
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
  const [password, setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [phaseshift,setPhaseshift] = useState("")
  const [byster,setB] = useState("Register Account")
  const [permit,setPermit] = useState("")	
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userdata") || null)
  );



  
const  signIn=()=>{
navigate("/signin")
}

  const registerUser = async () => {
  
    setB("Register Account")
    setNotfs(false)

   
    if (name && role && contacts && residence && idnumber && password) {
      try {
        
        const uid = days.toLowerCase() + ","+date;
        // name	username	password	role	contacts	phaseshift	image	idnumber	residence	permit	

        // console.log(uid,name,idnumber,lastName,role,contacts,residence)
        let data = {
          uid: uid,
          name: name,
          username: username,
          password: password,
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

        setStatus("Registration Failed!");
      }
    } else {
      setNotfs(true)
      setStatus("Fill all details!");
    }
  };


  const updateData=()=>{
    navigate("/signup")
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
                <input type="number" placeholder="Contacts" value={contacts}
                  onChange={(e) => setContacts(e.target.value)}/>
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="text" placeholder="Idnumber" value={idnumber}
                  onChange={(e) => setIdnumber(e.target.value)}/>
              </div>

             

              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="text" placeholder="Username" value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </div>



              <div className="input-two">
                {/* <i>icon</i> */}
                <input placeholder="Residence" value={residence}
                  onChange={(e) => setResidence(e.target.value)}/>
              </div>
            </div>

            <div className="remember-opt">
        

              <button className="sign-btn" onClick={registerUser}>
                Register
              </button>
            </div>

            {notify&& <div className="stat">
              <p>{status}</p>
            </div>}
          </div>
          <div className="atts">
            <button onClick={updateData}>UPDATE</button>
            {/* <button  onClick={addUser}>ADD USER</button> */}
          </div>

          <div className="ssd" style={{color: "yellow", cursor: "pointer"}}>
          <p onClick={signIn}>Login?</p>
        </div>
        </div>
      
      </div>
    </div>
  );
}
