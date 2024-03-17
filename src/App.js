import './App.css';
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Sales from './Components/Sales/Sales';
import Stock from './Components/Stock/Stocks';	
import Expenses from './Components/Expenses/Expenses';
import Report from './Components/Report/Report';
import Login from './Components/Login/Login';
import Sign from './Components/Login/Sign'


function App() {
  return (

    
    <Router>
      <Routes>
        <Route>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/sales/litres' element={<Stock/>}/>
          <Route path='/expenses' element={<Expenses/>}/>
          <Route path='/report' element={<Report/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Sign/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
