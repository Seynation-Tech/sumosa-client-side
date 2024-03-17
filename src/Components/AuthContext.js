import axios from "axios";
import { createContext,useEffect,useState } from "react";
import jwt from 'jwt-decode'
import Cookies from 'cookie-universal'
axios.defaults.withCredentials = true

export const AuthContext = createContext()

export const AuthContextProvider =({children})=>{
    const [tokns,setToken] = useState('')
    const cookies = new Cookies();
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    const url='https://sumosa-api.onrender.com'
    // const url='http://localhost:5001'
    // const url='https://dormdatabase-production.up.railway.app'
    const userlogin = async (inputs)=>{
        // console.log(inputs)
        const res = await axios.post(`${url}/api/auths/login`,inputs, {
            withCredentials: true
        })
        setCurrentUser(res.data)
        const usr = res.data[0]
        const token = res.data[1]
        // console.log(res.data[0])
        // console.log(res.data[1])

        setToken(token)
        localStorage.setItem("userdata",JSON.stringify(usr))

        cookies.set('sumosatoken',token,{
            path: '/',
            secure: true,
        })

        return usr;
    }

    const userlogout = async (inputs)=>{
        const res = axios.post(`${url}/auths/api/logout`,{withCredentials: true})
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value={{url,tokns, currentUser,userlogin,userlogout}}>
            {children}
        </AuthContext.Provider>
    )
};
