import React,{useEffect,useState} from 'react'
// to be done ...                                                                                                
const User = () => {

  const [name,setname] = useState("");
  const [email,setemail] = useState("");


  useEffect(()=>{
    const fetchuser = async()=>{
      const url = `http://localhost:5000/api/auth/getuser`
      // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjljMzkwN2MwMDRiOTQzNmViMzg4In0sImlhdCI6MTY4NDg2NDk1OH0.mRzjkCBsXc8YAK1mmddUPFJfKUnF4oYkbA5JLV0eQGk"
      const response = await fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
      });
      const data = await response.json();
      setname(data.name);
      setemail(data.email);
    }
    fetchuser()                                                                                
    },[])                                                                      
    
    return (
    <div>
      <div className="container">
    <h1>User Profile</h1>
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <ul className="list-group">
              <li className="list-group-item"><strong>Name:</strong><i> {name}</i></li>
              <li className="list-group-item"><strong>Email:</strong><i> {email} </i> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}


export default User