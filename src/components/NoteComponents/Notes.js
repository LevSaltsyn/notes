import { useState, useEffect, Fragment } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import CloseIcon from "@mui/icons-material/Close";
import Note from "./Note";
import { v4 as uuid } from "uuid";

function Notes() {
  //states
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    //clear the textarea
    setInputText("");
  };

  //delete note function
  const deleteNote = (id) => {
    const sortedNotes = notes.filter((note) => note.id !== id);
    setNotes(sortedNotes);
    const sortedTagNotes = filteredNotes.filter((note) => note.id !== id);
    setFilteredNotes(sortedTagNotes);
  };

  //clear filtered tag
  const clearTagFilter = () => {
    setFilteredNotes([]);
  };

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <Fragment>
      {filteredNotes.length ? (
        <CloseIcon onClick={() => clearTagFilter()} />
      ) : null}

      <div className="notes">
        {filteredNotes.length
          ? filteredNotes.map((note, index) => (
              <Note
                notes={notes}
                index={index}
                key={note.id}
                id={note.id}
                noteText={note.text}
                textHandler={textHandler}
                deleteNote={deleteNote}
                setFilteredNotes={setFilteredNotes}
              />
            ))
          : notes.map((note, index) => (
              <Note
                notes={notes}
                index={index}
                key={note.id}
                id={note.id}
                noteText={note.text}
                textHandler={textHandler}
                deleteNote={deleteNote}
                setFilteredNotes={setFilteredNotes}
              />
            ))}
        {filteredNotes.length ? null : (
          <CreateNote
            textHandler={textHandler}
            saveHandler={saveHandler}
            inputText={inputText}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Notes;
