import './App.css';
import { useEffect } from 'react';
import {Home, Login, TravelDetail} from './components'
import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
function App() {
  const location = useLocation();
  const navigation = useNavigate();
  useEffect(() => {
    const pathName = location.pathname;
    if(pathName === '/') {
      navigation('/login');
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home/>}>
      <Route path="/traveldetail" element={<TravelDetail/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>      
    </Routes>
  );
}

export default App;
