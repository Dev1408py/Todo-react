import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import alertcontext from "../context/alert/alertcontext";
import notecontext from "../context/notes/notecontext";

const Login = () => {
  const alertContext = useContext(alertcontext);
  const {showAlert} = alertContext;

  const noteContext = useContext(notecontext);
  const {log,setlog} = noteContext;

  const [cred, upcred] = useState({ email: "", password: "" });

  const onChange = (e) => {
    upcred({ ...cred, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault()
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const data = await response.json();
    if (data.status) {
      localStorage.setItem("token", data.authtoken);
      navigate("/");
      showAlert("Login Successful","success")
      upcred({ email: "", password: "" })
      setlog(true);
    } else {
      console.log(data.message);
      showAlert("Login unsuccessful,Try again","danger")

    }
  };
  
  return (
    <>
    <div className="container mx-3 my-3">
      <h1 className="container">Login Page</h1>
      <form onSubmit={loginUser}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            minLength={5}
            required
            />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            minLength={5}
            required
            />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
            </>
  );
};

export default Login;
