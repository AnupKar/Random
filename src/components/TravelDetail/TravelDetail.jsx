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
            <div className="col">Destination</div>
            <div className="col">Start Date</div>
            <div className="col">End Date</div>
            <div className="col">Duration</div>
            <div className="col">Number of Travllers</div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
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
              <input disabled value={bookingData.duration} />
            </div>
            <div className="col">
              <input
                value={travellers}
                type="Number"
                onChange={(e) => setTravellers(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <button onClick={handleStartPlaning}>Plan</button>
            </div>
            {plan}
          </div>
        </div>
      </div>

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
    </>
  );
};

const TravellerDetail = ({ onSubmit, idx }) => {
  const [travellerList, setTravellerList] = useState([]);
  const [travellerDetail, setTravellerDetail] = useState({
    id: null,
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: null,
    nationality: "",
    passportNumber: "",
    expiryDate: null,
    issuingCountry: "",
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
                  Expand to enter traveller detail {idx}
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
                    <div className="row" style={{ margin: "10px" }}>
                      <div className="col">
                        <label>First Name</label> <br />
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
                        <label>Last Name</label>
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
                      <div className="col">
                        <label>Date of Birth</label>
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
                    </div>
                    <div className="row" style={{ margin: "10px" }}>
                      <div className="col">
                        <label>Gender</label> <br />
                        <Select
                          defaultValue="Select"
                          onChange={onSelectionChange}
                          options={genderList}
                          className={styles.selection}
                        />
                      </div>
                      <div className="col">
                        <label>Nationality</label>
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
                      <div className="col">
                        <label>Passport Number</label>
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
                    </div>
                    <div className="row" style={{ margin: "10px" }}>
                      <div className="col">
                        <label>Passport Expiry Date</label> <br />
                        <DatePicker
                          selected={travellerDetail.expiryDate}
                          onChange={(date) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              expiryDate: date,
                            })
                          }
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />
                      </div>
                      <div className="col">
                        <label>Passport Issuing Country</label>
                        <br />
                        <input
                          type="text"
                          value={travellerDetail.issuingCountry}
                          onChange={(e) =>
                            setTravellerDetail({
                              ...travellerDetail,
                              issuingCountry: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                  <button
                    className={styles.addDetails}
                    onClick={() => addTravellerDetails(idx)}
                  >
                    ADD TRAVELLER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
