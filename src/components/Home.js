import React,{useContext} from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = () => {
  
  return (
    <div>
      <Addnote/>
      <Notes/>

    </div>
  );
};



export default Home;