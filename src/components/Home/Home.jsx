import React from "react";
import styles from './Home.module.css'
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
            {/*main div*/}
            <div className={styles.mainContainer}>
                {/*navbar*/}
                <div>
                    Navbar
                </div>
                {/*content*/}
                <div>
                    Content
                </div>
            </div>
            <h1>Welcome to home</h1><button onClick={getLoggedOut}>Log Out</button>

            <TravelDetail/>
        </>
    )
}