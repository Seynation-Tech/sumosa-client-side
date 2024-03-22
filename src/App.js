import './App.css';
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Sales from './Components/Sales/Sales';
import Stock from './Components/Stock/Stocks';
import Expenses from './Components/Expenses/Expenses';
import Report from './Components/Report/Report';
import Login from './Components/Login/Login';
import Sign from './Components/Login/Sign'
import Review from './Components/Review/Review';
import ProtectedRouteUser from "./Components/ProtectedRouteUser";


function App ()
{
  const [ isLoggedIn, setisLoggedIn ] = useState( null );
  const logIn = () =>
  {
    setisLoggedIn( true );
  };
  const logOut = () =>
  {
    setisLoggedIn( false );
  };





  return (


    <Router>
      <Routes>
        <Route>
          {/* <Route element={ <ProtectedRouteUser /> }> */}
            <Route path='/home' element={ <Home /> } />
            <Route path='/sales' element={ <Sales /> } />
            <Route path='/sales/litres' element={ <Stock /> } />
            <Route path='/expenses' element={ <Expenses /> } />
            <Route path='/report' element={ <Report /> } />
            <Route path='/signin' element={ <Login /> } />
            <Route path='/signup' element={ <Sign /> } />
            <Route path='/review' element={ <Review /> } />
          </Route>
          <Route path='/' element={ <Login /> } />

        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
