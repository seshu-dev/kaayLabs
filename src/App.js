import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Table from '../src/components/table/Table'
import {BrowserRouter as Router , Route , Routes} from "react-router-dom"


function App() {

  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Table/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
