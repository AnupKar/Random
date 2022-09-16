import React from "react";
import { TravelDetail } from "../TravelDetail/TravelDetail";
//import { Login } from "../Login/Login";
//import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home=()=>{
    const navigate=useNavigate()
    const getLoggedOut=()=>{
        navigate('/login');
    }
    //const [nav,setNav]=useState(false)
    return (
        <>
            <h1>Welcome to home</h1><button onClick={getLoggedOut}>Log Out</button>

            <TravelDetail/>
        </>
    )
}