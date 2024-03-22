import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRouteUser = ( props ) =>
{
    const token = localStorage.getItem( "userdata" );
    const navigate = useNavigate();
    function presentPage ()
    {
        navigate( -1 );
    }

    useEffect( () =>
    {
        

    }, [  ] )

  
};

export default ProtectedRouteUser;