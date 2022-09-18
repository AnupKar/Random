import "./App.css";
import { useEffect } from "react";
import { Home, Login, TravelDetail } from "./components";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SomeCompo = () => {
  console.log("here in some compo .");
  return <h1>hello Raj</h1>;
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
          <Route path="/traveldetail" element={<TravelDetail />} />
          <Route path="/booking" element={<SomeCompo />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
