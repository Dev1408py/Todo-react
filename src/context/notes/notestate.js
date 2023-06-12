import React, { useState } from "react";
import Notecontext from "./notecontext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const init_notes = [];
  const [notes, setnotes] = useState(init_notes);
  const [log, setlog] = useState(false);

  //Fetch all the notes.
  const fetch_notes = async()=>{
    const url = `${host}/api/notes/getnotes`
    // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjljMzkwN2MwMDRiOTQzNmViMzg4In0sImlhdCI6MTY4NDg2NDk1OH0.mRzjkCBsXc8YAK1mmddUPFJfKUnF4oYkbA5JLV0eQGk"
    const response = await fetch(url, {
      method: "GET", 
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
    let data = await response.json()
    setnotes(data); 
    
  }
  
  //Add a note
  const add_note = async(title,description,tag) => {
    const url = `${host}/api/notes/addnotes`
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
      body: JSON.stringify({title,description,tag})
    });
    // let data = await response.json()
    // console.log(data);   
    fetch_notes()
  };
  
  
  //Delete a note
  const delete_note = async(id) => {
    const url = `${host}/api/notes/delete/${id}`
    // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjljMzkwN2MwMDRiOTQzNmViMzg4In0sImlhdCI6MTY4NDg2NDk1OH0.mRzjkCBsXc8YAK1mmddUPFJfKUnF4oYkbA5JLV0eQGk"
    const response = await fetch(url, {
      method: "DELETE", 
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
    // let data = await response.json()
    // console.log(data); 
    let new_notes = notes.filter((note)=>{return note._id !== id})
    setnotes(new_notes)
    
  };
  //Edit a note api/notes/updatenote/646c6253522d20c7b10503aa
  const edit_note = async(title,description,tag,id) => {
    const url = `${host}/api/notes/updatenote/${id}`
    // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjljMzkwN2MwMDRiOTQzNmViMzg4In0sImlhdCI6MTY4NDg2NDk1OH0.mRzjkCBsXc8YAK1mmddUPFJfKUnF4oYkbA5JLV0eQGk"
    const response = await fetch(url, {
      method: "PUT", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
        
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify({title:title,description:description,tag:tag}), 
    });
    // let data = await response.json()
    // console.log(data); 
    // for(let i=0;i<notes.length;i++){
    //   if(notes[i]._id === id){
    //     notes[i].title = title;
    //     notes[i].description = description;
    //     notes[i].tag = tag;
    //     break;
    //   }
    // }
    
    fetch_notes()
  };

  return (
    <Notecontext.Provider value={{notes,setnotes,add_note,delete_note,fetch_notes,edit_note,setlog,log}}>
      {props.children}
    </Notecontext.Provider>
  );
};


export default NoteState;