import React,{useContext, useState} from "react";
import notecontext from "../context/notes/notecontext";
import alertcontext from "../context/alert/alertcontext";


const Addnote = () => {
    const noteContext = useContext(notecontext);
    const {notes,setnotes,add_note,log} = noteContext;
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const alertContext = useContext(alertcontext);
    const {showAlert} = alertContext;
    
    const handleClick = (e)=>{
      e.preventDefault();
      // console.log(note.title,note.description,note.tag)
      if(log){
        add_note(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
      }
      else{
        showAlert("You must be logged in to access this page.","secondary",10000)
      }

    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <h1> To Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onChange}
            value={note.title}//experiment
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            Here goes your title.
          </small> */}
        </div>
        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onChange}
            value={note.description}//experiment
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            onChange={onChange}
            value={note.tag}//experiment
          />
        </div>
        <div className="form-check">
          {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label> */}
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<3||note.description.length<5 } >
          Add Note
        </button>
      </form>
      
    </div>
  );
};


export default Addnote;