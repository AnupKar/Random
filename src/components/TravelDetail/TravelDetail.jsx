import React from "react";
import { useState,useEffect } from "react";
import styles from './TravelDetail.module.css'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
//import Dropdown from 'react-dropdown';
import Select from 'react-select';
import 'react-dropdown/style.css';
export const TravelDetail=()=>{
    const [bookingData,setBookingData]=useState({
        destination:'',
        startDate:null,
        endDate:null,
        duration:0
    })
    const[travellers,setTravellers]=useState(0)
    const[travellerArr,setTravellerArr]=useState([])
    const [plan,setPlan]=useState(false)
    useEffect(()=>{
        //console.log("startDate",bookingData.startDate,"end date", bookingData.endDate );
        const diffTime = Math.abs(bookingData.endDate - bookingData.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        bookingData.endDate!==null &&
            setBookingData({...bookingData, duration: diffDays})
    },[bookingData.startDate,bookingData.endDate])
    useEffect(()=>{
        for(let i=0;i<travellers;i++){
           // console.log(i);
            setTravellerArr([...travellerArr,i+1])
        }
    },[travellers])
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
                    <TravellerDetail travellerArr={travellerArr}/>
            }
        </>
    )
}

const TravellerDetail=({travellerArr})=>{
    const[travellerList,setTravellerList]=useState([])
    const[travellerDetail,setTravellerDetail]=useState({
        id:null,
        firstName:"",
        lastName:"",
        birthDate:null,
        gender:null,
        nationality:"",
        passportNumber:"",
        expiryDate:null,
        issuingCountry:""
    })
    const genderList=[
        {value:"male", label:"Male"},
        {value:"female", label:"Female"},
        {value:"others", label:"Others"}
    ]
    
    
    const onSelectionChange=(selectedOption)=>{
        setTravellerDetail({...travellerDetail,gender:selectedOption.label})
    }
    const addTravellerDetails=(idx)=>{
        setTravellerDetail({...travellerDetail,id:idx})
        addTravellerListData()
        //setTravellerList([...travellerList,travellerDetail])
    }
    const addTravellerListData=()=>{
        console.log("travellerDetail",travellerDetail);
    }
    return(
        <>
            <div className={styles.TravellerDetail}>
                {
                    travellerArr.map((val,idx)=>{
                        return(
                            <div key={idx} className={styles.list_container}>
                                <div class="accordion" id="accordionExample" style={{width:'70%'}}>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id={`heading${idx}`}>
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded="false" aria-controls={`collapse${idx}`}>
                                            Expand to enter traveller detail {idx}
                                        </button>
                                        </h2>
                                        <div id={`collapse${idx}`} class="accordion-collapse collapse show" aria-labelledby={`heading${idx}`} data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div className={styles.detailForm}>
                                                <div class="row" style={{margin:"10px"}}>
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
                                                <div class="row" style={{margin:"10px"}}>
                                                    <div class="col">
                                                        <label>Gender</label> <br/>
                                                        <Select
                                                            defaultValue="Select"
                                                            onChange={onSelectionChange}
                                                            options={genderList}
                                                            className={styles.selection}
                                                        />                           
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
                                                <div class="row" style={{margin:"10px"}}>
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
                                            <button className={styles.addDetails} onClick={()=>addTravellerDetails(val)}>ADD TRAVELLER</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })
                }
                 
            </div>
        </>
    )
}