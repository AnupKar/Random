import React from "react";
import { useState,useEffect } from "react";
import styles from './TravelDetail.module.css'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export const TravelDetail=()=>{
    const [bookingData,setBookingData]=useState({
        destination:'',
        startDate:null,
        endDate:null,
        duration:0
    })
    const[travellers,setTravellers]=useState(0)
    const [plan,setPlan]=useState(false)
    useEffect(()=>{
        //console.log("startDate",bookingData.startDate,"end date", bookingData.endDate );
        const diffTime = Math.abs(bookingData.endDate - bookingData.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        bookingData.endDate!==null &&
            setBookingData({...bookingData, duration: diffDays})
    },[bookingData.startDate,bookingData.endDate])
    const startPlanning=()=>{
        setPlan((prev) => !prev);
    }

    return (
        <>
            <div class="container text-center">
                <div className={styles.booking_main}>
                    <div class="row" >
                        <div class="col">
                            Destination
                        </div>
                        <div class="col">
                            Start Date
                        </div>
                        <div class="col">
                            End Date
                        </div>
                        <div class="col">
                            Duration
                        </div>
                        <div class="col">
                            Number of Travllers
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col">
                            <input value={bookingData.destination} onChange={(e)=>setBookingData({ ...bookingData, destination:e.target.value })}/>
                        </div>
                        <div class="col">
                            <DatePicker 
                                selected={bookingData.startDate}
                                onChange={(date)=>setBookingData({ ...bookingData, startDate:date })}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                        <div class="col">
                            <DatePicker 
                                selected={bookingData.endDate}
                                onChange={(date)=>setBookingData({ ...bookingData, endDate:date })}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                        <div class="col">
                            <input disabled value={bookingData.duration}/>
                        </div>
                        <div class="col">
                            <input value={travellers} type='Number' onChange={(e)=>setTravellers(e.target.value)}/>
                        </div>
                        <div class="col">
                            <button onClick={startPlanning}>Plan</button>
                        </div>
                        {plan}
                    </div>
                </div>
            </div>
            {
                plan && 
                    <TravellerDetail />
            }
        </>
    )
}

const TravellerDetail=()=>{
    const[travellerList,setTravellerList]=useState([])
    const[travellerDetail,setTravellerDetail]=useState({
        firstName:"",
        lastName:"",
        birthDate:null,
        gender:"",
        nationality:"",
        passportNumber:"",
        expiryDate:null,
        issuingCountry:""
    })
    const genderList=["Male","Female","Others"]
    return(
        <>
            <div className={styles.TravellerDetail}>
                <div className={styles.detailForm}>
                    <div class="row" >
                        <div class="col">
                            <label>First Name</label> <br/>
                            <input type="text" value={travellerDetail.firstName} onChange={(e)=>setTravellerDetail({...travellerDetail, firstName: e.target.value})}/>
                        </div>
                        <div class="col">
                           <label>Last Name</label><br/>
                           <input type="text" value={travellerDetail.lastName} onChange={(e)=>setTravellerDetail({...travellerDetail, lastName: e.target.value})}/>
                        </div>
                        <div class="col">
                            <label>Date of Birth</label><br/>
                            <DatePicker 
                                selected={travellerDetail.birthDate}
                                onChange={(date)=>setTravellerDetail({ ...travellerDetail, birthDate:date })}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col">
                            <label>Gender</label> <br/>
                            
                            <input type="text" value={travellerDetail.gender} onChange={(e)=>setTravellerDetail({...travellerDetail, gender: e.target.value})}/>
                        </div>
                        <div class="col">
                           <label>Nationality</label><br/>
                           <input type="text" value={travellerDetail.nationality} onChange={(e)=>setTravellerDetail({...travellerDetail, nationality: e.target.value})}/>
                        </div>
                        <div class="col">
                            <label>Passport Number</label><br/>
                            <input type="text" value={travellerDetail.passportNumber} onChange={(e)=>setTravellerDetail({...travellerDetail, passportNumber: e.target.value})}/>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col">
                            <label>Passport Expiry Date</label> <br/>
                            <DatePicker 
                                selected={travellerDetail.expiryDate}
                                onChange={(date)=>setTravellerDetail({ ...travellerDetail, expiryDate:date })}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                        <div class="col">
                           <label>Passport Issuing Country</label><br/>
                           <input type="text" value={travellerDetail.issuingCountry} onChange={(e)=>setTravellerDetail({...travellerDetail, issuingCountry: e.target.value})}/>
                        </div>
                        <div class="col">
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}