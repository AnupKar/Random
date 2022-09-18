import React from "react";
import { useNavigate } from "react-router-dom";
export const Login=()=>{
    const navigate=useNavigate()
    const getLoggedIn=()=>{
        navigate('/traveldetail');
    }
    return (
        <>
            <h1>Please Login / Sign Up</h1>
            <button onClick={getLoggedIn}>Login</button>
            <button>Sign Up</button>
        </>
    )
}