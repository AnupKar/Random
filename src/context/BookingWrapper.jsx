import React, { useState, useEffect } from "react";

export const BookingContext = React.createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    destination: "",
    startDate: null,
    endDate: null,
    duration: 0,
  });
  const [travellerArr, setTravellerArr] = useState([]);

  const startPlanning = (travellers) => {

    if (travellerArr.length === travellers) return;

    if (travellerArr.length > 0) {
      const extraLength = travellers - travellerArr.length;
      if (extraLength < 0) {
        const finalEls = [...travellerArr];
        finalEls.splice(
          travellerArr.length - Math.abs(extraLength),
          Math.abs(extraLength)
        );
        setTravellerArr(finalEls);
      } else {
        const newVals = new Array(extraLength).fill(0);
        setTravellerArr((prev) => [...prev, ...newVals]);
      }
    } else {
      const vals = new Array(travellers).fill(0);
      setTravellerArr(vals);
    }
  };

  const handleUserProfileSubmit = (data) => {
    const newArr = [...travellerArr];
    newArr[data.id] = data;
    setTravellerArr(newArr);
  };

  useEffect(() => {
    console.log(travellerArr)
  }, [travellerArr]);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        travellerArr,
        startPlanning,
        handleUserProfileSubmit
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
