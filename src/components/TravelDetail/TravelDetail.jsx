import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./TravelDetail.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Dropdown from 'react-dropdown';
import Select from "react-select";
//import "react-dropdown/style.css";
import { BookingContext } from "../../context";
import { SideBar } from "../Sidebar/Sidebar";

export const TravelDetail = () => {
  const [travellers, setTravellers] = useState(0);
  const [plan, setPlan] = useState(false);
  
  const {
    bookingData,
    setBookingData,
    travellerArr,
    startPlanning,
    handleUserProfileSubmit,
  } = useContext(BookingContext);

  useEffect(() => {
    const diffTime = Math.abs(bookingData.endDate - bookingData.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    bookingData.endDate !== null &&
      setBookingData({ ...bookingData, duration: diffDays });
  }, [bookingData.startDate, bookingData.endDate]);

  const handleStartPlaning = () => {
    setPlan(true);

    startPlanning(travellers);
  };

  return (
    <>
      <div className="container text-center">
        <div className={styles.booking_main}>         
            <div className="row">
                <div className="col-md-3">
                    <label>Number of Travellers</label><br/>
                    <input
                        value={travellers}
                        type="Number"
                        onChange={(e) => setTravellers(Number(e.target.value))}
                        className={styles.setTravellers}
                    />
                     <button onClick={handleStartPlaning} className={styles.addDetails} style={{margin:"5px"}}>Add Travellers</button>
                </div>    
            </div>
        </div>
      </div>
      <div className={styles.traveller_list}>
        {plan &&
            travellerArr.length > 0 &&
            travellerArr.map((_, index) => {
            return (
                <TravellerDetail
                travellerArr={travellerArr}
                key={index}
                onSubmit={handleUserProfileSubmit}
                idx={index}
                />
            );
        })}
      </div>
    </>
  );
};

const TravellerDetail = ({ onSubmit, idx }) => {
  const [enabled,setEnabled]=useState(false)
  const [travellerList, setTravellerList] = useState([]);
  const [travellerDetail, setTravellerDetail] = useState({
    id: null,
    email:"",
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: null,
    nationality: "",
    phone:0,
    passportNumber: "",
    isPrimary:false
  });
  const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const onSelectionChange = (selectedOption) => {
    setTravellerDetail({ ...travellerDetail, gender: selectedOption.label });
  };

  const addTravellerDetails = (idx) => {
    const details = { ...travellerDetail, id: idx };
    setTravellerDetail(details);
    onSubmit(details);
  };
  useEffect(()=>{
    if(travellerDetail.email.length>0 && travellerDetail.firstName.length>0 && travellerDetail.lastName.length>0 
       && travellerDetail.birthDate && travellerDetail.gender && travellerDetail.nationality.length>2 
       && travellerDetail.phone.length>9 && travellerDetail.passportNumber.length>0){
        setEnabled(true)
       }else{
        setEnabled(false)
       }
  },[travellerDetail])

  return (
    <>
      <div className={styles.TravellerDetail}>
        <div className={styles.list_container}>
          <div
            className="accordion"
            id="accordionExample"
            style={{ width: "70%" }}
          >
            <div className="accordion-item">
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded="false"
                  aria-controls={`collapse${idx}`}
                >
                  Traveller {idx+1}
                </button>
              </h2>
              <div
                id={`collapse${idx}`}
                className="accordion-collapse collapse show"
                aria-labelledby={`heading${idx}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {/*{`accordion-body ${styles.detailForm}`}*/}
                  <div className={styles.detailForm}>
                    <label>Please Enter Mandatory Information</label>
                    <div className="row" style={{ margin: "10px" }}>
                    <div className="col">
                        <label>Email</label><span style={{color:"red"}}>*</span> <br />
                        <input
                          type="text"
                          value={travellerDetail.email}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col">
                        <label>First Name</label><span style={{color:"red"}}>*</span> <br />
                        <input
                          type="text"
                          value={travellerDetail.firstName}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col">
                        <label>Last Name</label><span style={{color:"red"}}>*</span>
                        <br />
                        <input
                          type="text"
                          value={travellerDetail.lastName}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px" }}>
                      <div className="col">
                        <label>Date of Birth</label><span style={{color:"red"}}>*</span>
                        <br />
                        <DatePicker
                          selected={travellerDetail.birthDate}
                          onChange={(date) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              birthDate: date,
                            })
                          }
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />
                      </div>
                      <div className="col">
                        <label>Gender</label><span style={{color:"red"}}>*</span> <br />
                        <Select
                          defaultValue="Select"
                          onChange={onSelectionChange}
                          options={genderList}
                          className={styles.selection}
                        />
                      </div>
                      <div className="col">
                        <label>Nationality</label><span style={{color:"red"}}>*</span>
                        <br />
                        <input
                          type="text"
                          value={travellerDetail.nationality}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              nationality: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px" }}>
                      <div className="col">
                        <label>Phone Number</label><span style={{color:"red"}}>*</span> <br />
                        <input
                          type="text"
                          value={travellerDetail.phone}
                          maxLength="10"
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col">
                        <label>Passport Number</label><span style={{color:"red"}}>*</span>
                        <br />
                        <input
                          type="text"
                          value={travellerDetail.passportNumber}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              passportNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col">
                        <label>Is Primary</label><br/>
                        <input 
                            type="radio" 
                            name="isPrimary" 
                            value={true} 
                            onChange={(e)=>
                            setTravellerDetail({...travellerDetail,isPrimary: e.target.value})}/> Yes
                      </div>
                    </div>
                  </div>
                  {
                    enabled ? 
                    <button
                        className={styles.addDetails}
                        onClick={() => addTravellerDetails(idx)}
                    >
                        Add Details
                    </button> :
                    <button
                        className={styles.btn_disabled}
                    >
                        Add Details
                    </button>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
