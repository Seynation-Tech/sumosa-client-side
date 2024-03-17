import './App.css';
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Sales from './Components/Sales/Sales';
import Stock from './Components/Stock/Stocks';	



function App() {
  return (

    
    <Router>
      <Routes>
        <Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/sales/litres' element={<Stock/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
