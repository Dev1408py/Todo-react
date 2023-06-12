import React, { useState,useContext } from "react";
import {  useNavigate } from "react-router-dom";
import alertcontext from "../context/alert/alertcontext";


const Signup = () => {
  const alertContext = useContext(alertcontext);
  const {showAlert} = alertContext;

  const [flag, deflag] = useState(false);
  const [cred, upcred] = useState({name:"", email: "", password: "",confpassword:"" });

  const onChange = (e) => {
    upcred({ ...cred, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const signup = async (e) => {
    e.preventDefault()
    if(cred.password === cred.confpassword){
      deflag(false)
      const url = "http://localhost:5000/api/auth/createUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:cred.name, email: cred.email, password: cred.password }),
      });
      const data = await response.json();
      if (data.status) {
        localStorage.setItem("token", data.authtoken);
        navigate("/");
        showAlert("User profile created","success")
        upcred({name:"", email: "", password: "",confpassword:"" })
      } else {
        console.log(data.message);
        showAlert("Sorry user couldn't be created","danger")
      }
    }
    else{
      console.log({name:cred.name, email: cred.email, password: cred.password,confpassword:cred.confpassword })
      deflag(true)
    }
  };
  
  return (
    <div className="container mx-3 my-3">
      <h1>Signup Page</h1>
      <form onSubmit={signup}>
      <div className="form-group my-1">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" id="name" name="name" placeholder="Name" onChange={onChange} required
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-1">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="confirm_password">Confirm password</label>
          <input type="password" className="form-control" id="confirm_password" name="confpassword" placeholder="confirm password" onChange={onChange} minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
        {flag && <h2>The password and conform password should match.</h2>}
      </form>
    </div>
  )
}

export default Signup
