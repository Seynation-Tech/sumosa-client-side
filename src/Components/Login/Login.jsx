import React, { useState, useContext } from "react";
import "./Login.css";
import "./Mobile.css"
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";
import DotLoader from "react-spinners/DotLoader";
import sda from "../../Images/sumoo.png";
import axios from "axios";


export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { userlogin,currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const submitButton = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // console.log("login")

    if (name && password)

    try {
      let data = {
        username: name,
        password: password,
      };
      const resp = await userlogin(data);
      const counter = Object.keys(resp).length

    } catch (err) {
      setLoading(false);
      setStatus("Failed to login!");
      setError("Failed to login!");
      // console.log(err.response.data)
    }

    setName("");
    setPassword("");

    // console.log(inputs)
  };

  return (
    <div className="welcome-pages">
      {/* body contents */}
      <div className="body-contentcc">
        <div className="ouu">
          <div className="sdas">
            <img src={sda} alt="" className="" />
          </div>
          <p id="sumos">SUMOSA FILLING STATION</p>
          <div className="sdaconts">
            <div className="anaccount">
              <p>Login Your Account</p>
            </div>
            <div className="forms">
              <div className="input-one">
                {/* <i>icon</i> */}
                <input
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-two">
                {/* <i>icon</i> */}
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="remeber">
              <input type="checkbox" />
              <p>Remember me</p>
            </div> */}
            <div className="remember-opt">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="sign-btn" onClick={submitButton}>
                  Login
                </button>
              </Link>
            </div>

            <div className="sta">
              <p>{status}</p>
            </div>

            {loading ? (
              <div className="spin">
                {" "}
                <DotLoader
                  color={color}
                  loading={loading}
                  // cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="accounts">
            <p>
              {/* Don't have an account?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <span>Sign up</span>
              </Link> */}
            </p>
            <p id="forgot">Forgot Password?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
