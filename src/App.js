import "./App.css";
import React, { useContext} from "react";

import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from "./components/About";
import Notestate from "./context/notes/notestate";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import alertcontext from "./context/alert/alertcontext";
import User from "./components/User";


// import { BrowserRouter as Router, Switch, Route,Routes, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Logout from "./components/Logout";

function App() {
  
  const alertContext = useContext(alertcontext);
  const {alert,message,type} = alertContext;
 
  return (
    <>
    <Notestate>
    <Router>

      <Navbar/>
      <Alert alert={alert} msg={message} type={type} />
      
        <div className="container">
      <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route exact path="/about" element={<About/>} /> 
          <Route exact path="/login" element={<Login/>} /> 
          <Route exact path="/signup" element={<Signup/>} /> 
          <Route path="/user" element={<User/>} />
          <Route path="/logout" element={<Logout/>} />
      </Routes>
        </div>
    </Router>
    </Notestate>
    
    </>
  );
}

export default App;

