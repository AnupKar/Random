import React from "react";
import styles from "./Booking.module.css"
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from "../../context";
import { useNavigate } from "react-router-dom";
export const Booking =()=>{
    const {
        bookingData,
        setBookingData,
        travellerArr,
        startPlanning,
        handleUserProfileSubmit,
    } = useContext(BookingContext);
    const navigate=useNavigate()
    const goToItenary=()=>{
        navigate("/traveldetail");
    }
    useEffect(() => {
        const diffTime = Math.abs(bookingData.endDate - bookingData.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        bookingData.endDate !== null &&
          setBookingData({ ...bookingData, duration: diffDays });
      }, [bookingData.startDate, bookingData.endDate]);

    return(
        <>
            <div className="container text-center">
                <div className={styles.booking_main}>
                    <div className="row">
                        <div className="col">
                            <label>Destination</label><br/>
                            <input
                                value={bookingData.destination}
                                onChange={(e) =>
                                  setBookingData({
                                    ...bookingData,
                                    destination: e.target.value,
                                  })
                                }
                            />
                        </div>
                        <div className="col">
                            <label>Start Date</label><br/>
                            <DatePicker
                                selected={bookingData.startDate}
                                onChange={(date) =>
                                  setBookingData({ ...bookingData, startDate: date })
                                }
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                        <div className="col">
                            <label>End Date</label><br/>
                            <DatePicker
                                selected={bookingData.endDate}
                                onChange={(date) =>
                                  setBookingData({ ...bookingData, endDate: date })
                                }
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </div>
                        <div className="col">
                            <label>Duration</label><br/>
                            <input disabled value={bookingData.duration}/>
                        </div>
                        <div className="col">
                            <button className={styles.plan_btn} onClick={goToItenary}>Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}