import React, { useState, useContext } from "react";
import alertcontext from "../context/alert/alertcontext";
import notecontext from "../context/notes/notecontext";

const Logout = () => {
  const [checkbox1, setCheckbox1] = useState(true);
  const alertContext = useContext(alertcontext);
  const { showAlert } = alertContext;

  const noteContext = useContext(notecontext);
  const {setlog} = noteContext;

  const handleClick = () => {
    setCheckbox1(!checkbox1);
    console.log(checkbox1);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("fhsf");
    if (setCheckbox1) {
      localStorage.removeItem("token");
      showAlert("Successfully Logged out", "secondary");
      setlog(false)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form-check">
            
        <h5 className="card-title">
                    Are you sure you want to logout?
                  </h5>
          <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={handleClick} />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Yes
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Logout;

{
  /* <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Logout</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Are you sure you want to logout?
                  </h5>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox"
                    onClick={handleClick}
                    // onChange={handleChange}
                  />
                  <label
                    className="form-check-label mx-2"
                    htmlFor="flexCheckDefault"
                  >
                    Yes.
                  </label>
                  <br />

                  <button type="button" className="btn btn-primary my-2">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div> */
}
