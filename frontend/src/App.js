import 'antd/dist/reset.css'; 
import './App.css';
import Header from './Components/Header';
import {Outlet} from 'react-router-dom';
import {Button} from "antd";
import Context from './context';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { setUserDetails } from './Stores/userSlice';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  const dispatch=useDispatch()
  const fetchUserDetails = async() =>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : "include"
    })
    const dataApi = await  dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))

    }
  }
  return (
    <Context.Provider value={{
      fetchUserDetails,
    }}>
    <div className='App'>
       <Header/>
       <main>
        <Outlet/>
       </main>
       <Footer/>
   </div>
   </Context.Provider>
  );
}

export default App;
