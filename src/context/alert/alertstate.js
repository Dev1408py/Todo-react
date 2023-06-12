import React, { useState } from "react";
import Alertcontext from "./alertcontext";

const Alertstate = (props) => {
    
  const [alert, setalert] = useState(false);
  const [message, setmessage] = useState("");
  const [type, settype] = useState("");

  const showAlert = (messag,typ,time=1600)=>{
    console.log("works")
    setalert(true);
    setmessage(messag);
    settype(typ);
    
    setTimeout(()=>{
        setalert(false);
        setmessage("");
        settype("");
    },time)

  }

  return (
    <Alertcontext.Provider value={{alert,message,type,showAlert}}>
        {props.children}
    </Alertcontext.Provider>
  );
};


export default Alertstate;