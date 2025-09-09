import 'antd/dist/reset.css'; 
import './App.css';
import Header from './Components/Header';
import {Outlet} from 'react-router-dom';
import {Button} from "antd";
import Context from './context';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Context.Provider>

    
    <div className='App'>
       <Header/>
       <main>
        <Outlet/>
       </main>
   </div>
   </Context.Provider>
  );
}

export default App;
