import React from "react";


const Alert = (props) => {
  
  return (
      <div>
        
          <div className={`alert alert-${props.type} my-1`} role="alert">
        {props.msg}
      </div>
      
        
    </div>
  );
};

export default Alert;