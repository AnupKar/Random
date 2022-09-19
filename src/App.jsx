import "./App.css";
import { useEffect } from "react";
import { TravelDetail,Booking } from "./components/Home";
import { Home, Login } from "./components";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SomeCompo = () => {
  console.log("here in some compo .");
  return <h1>hello</h1>;
};

function App() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation("/login");
  }, []);

  return (
    <>
      <Routes>
        <Route exact={true} path="/" element={<Home />}>
          <Route path="/traveldetail" element={<TravelDetail/>} />
          <Route path="/booking" element={<Booking />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
