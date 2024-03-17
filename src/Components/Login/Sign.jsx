import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import sda from "../../Images/sumoo.png";

export default function Sign ()
{
  return (
    <div className="welcome-pages">
      

      {/* body contents */ }
      <div className="body-contentcc">
        {/* Highlight words */ }
     

        

        <div className="ouur">
          <div className="sdas">
            <img src={ sda } alt="" className="" />
          </div>
          <div className="sdaconts">
            <div className="anaccount">
              <p>Create Account</p>
            </div>
            <div className="forms">
              <div className="input-one">
                {/* <i>icon</i> */ }
                <input placeholder="Username" />
              </div>

              <div className="input-two">
                {/* <i>icon</i> */ }
                <input placeholder="Password" />
              </div>
              <div className="input-two">
                {/* <i>icon</i> */ }
                <input placeholder="Confirm Password" />
              </div>

              <div className="input-two">
                {/* <i>icon</i> */ }
                <input placeholder="Enter phone number" />
              </div>
            </div>

            <div className="remember-opt">
              <Link to="/signin" style={ { textDecoration: "none" } }>
                <button className="sign-btn">Sign in</button>
              </Link>
            </div>
          </div>
          <div className="accounts">
            <p className="acc">
              Already have an account?
              <Link to="/signin" style={ { textDecoration: "none" } }>
                <span>Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
