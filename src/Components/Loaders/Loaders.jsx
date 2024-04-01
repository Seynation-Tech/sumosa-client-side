import React, { useState, useContext } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "../../App.css"
export default function Login() {
let [color, setColor] = useState("#fff");


  return (
    <div className="loader-pages">
      <div className="loadings">
        <MoonLoader
          color={color}
          loading={true}
          // cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
