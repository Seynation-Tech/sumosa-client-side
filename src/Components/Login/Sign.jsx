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
  const [password, setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [phaseshift,setPhaseshift] = useState("")
  const [byster,setB] = useState("Register Account")
  const [permit,setPermit] = useState("")	
  const [ids,setId] = useState("")
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userdata") || null)
  );

  const [typs,setTypes] = useState("userinfo")

  

  const updateData=()=>{

    setTypes("update")
    setB("Update infos")
    setId(currentUser[0]?.id)
   
      setName(currentUser[0]?.name)
      setContacts(Number(currentUser[0]?.contacts))
      setPassword(currentUser[0]?.password) 
      setRole(currentUser[0]?.role)
      setResidence(currentUser[0]?.residence)
      setPermit(currentUser[0]?.permit)
      setIdnumber(Number(currentUser[0]?.idnumber))
      setUsername(currentUser[0]?.username)
    setPhaseshift(currentUser[0]?.phaseshift)
    


  }

  const updateDatabase = async()=>{
    const uid = days.toLowerCase() + "," + date;
   
    let data = {
                    
      'uid': uid,
      'name': name,
      'username': username,
      'password': password,
      'role':  role.toLowerCase(),
      'contacts': contacts,
      'phaseshift': phaseshift,
      'image': '',
      'idnumber': idnumber,
      'residence': residence,
      'permit': "default"
    
  }

  
  try{
      const res = await axios.put(`${url}/api/auths/userinfo/${ids}`,data,   {withCredentials: true})
      setStatus(res.data)

      setNotfs(true)
      setLoading(false);
      setStatus(res.data);
      navigate("/signin")
      
  }catch(err){
    setNotfs(true)
    
    setStatus("Registration Failed!");
  }
  }

  const addUser=()=>{
   navigate("/register")
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
              <p>Update Account</p>
            </div>

            <div className="forms">
              <div className="input-one">
                {/* <i>icon</i> */}
                <input placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}/>
              </div>

              {currentUser[ 0 ]?.role==="director" && <div className="input-two">
                {/* <i>icon</i> */}
                <input placeholder="Role" alue={role}
                  onChange={(e) => setRole(e.target.value)}/>
              </div>}
              <div className="input-two">
                {/* <i>icon</i> */}
                <input type="number" placeholder="Contacts" value={contacts}
                  onChange={(e) => setContacts(e.target.value)}/>
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
              <button className="sign-btn" onClick={updateDatabase}>
               Update
              </button>

            </div>

            {notify&& <div className="stat">
              <p>{status}</p>
            </div>}
          </div>
          <div className="atts">
            <button onClick={updateData}>UPDATE</button>
           { currentUser[ 0 ]?.role === "director" && <button  onClick={addUser}>ADD USER</button>}
          </div>
        </div>
       
      </div>
    </div>
  );
}
