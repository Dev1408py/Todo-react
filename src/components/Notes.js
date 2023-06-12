import React, { useContext, useEffect, useRef, useState } from "react";
import notecontext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";

const Notes = () => {
  const noteContext = useContext(notecontext);
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    eid:""
  });
  const { notes, fetch_notes,edit_note } = noteContext;

  useEffect(() => {
    fetch_notes();
  }, []);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value});
  };
  const HandleClick = (e)=>{
    e.preventDefault()
    edit_note(note.etitle,note.edescription,note.etag,note.eid)
    refclose.current.click()
  }

  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (enote) => {
    ref.current.click();
    setNote({etitle:enote.title,edescription:enote.description,etag:enote.tag,eid:enote._id})
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
            Here goes your title.
          </small> */}
                </div>
                <div className="form-group my-2">
                  <label htmlFor="edescription">Description</label>
                  <input                                                                                
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                <div className="form-check">
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={HandleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
          {notes.length===0 && <h1>No Notes to display.</h1>}
        </div>

        <div className="container my-3">
        {notes.length>0 && <h1>Your Notes</h1>}
      </div>

      <div className="row my-3">
        {notes.map((note) => {
          return (
            <Noteitem note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;