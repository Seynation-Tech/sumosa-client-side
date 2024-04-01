import React, { useState, useContext } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "../../App.css"
import downlo from "../../Images/hoo.png";

export default function Return ()
{
    let [ color, setColor ] = useState( "#fff" );


    return (
        <div className="load-pages">
            <div className="loadings">
            <img src={ downlo } style={ { width: "23px" } } alt="" />
            </div>
        </div>
    );
}
