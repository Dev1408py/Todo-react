import React,{useContext, useState} from "react";
import notecontext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const noteContext = useContext(notecontext);
  const {delete_note} = noteContext;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 mx-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title} </h5>
          <p className="card-text">{note.description} </p>
          <p className="card-text">{note.tag} </p>
          <i className="fa-solid fa-trash" onClick={()=>{delete_note(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{ updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
