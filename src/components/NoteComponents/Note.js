import { useState, useRef, useEffect } from "react";
import HashtagInput from "./HashtagInput";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function Note({ id, noteText, index, deleteNote, notes, setFilteredNotes }) {
  const [isEdited, setEditNode] = useState(false);
  const hashtagInputRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    getAllTags();
  }, []);

  const searchForeTag = (e) => {
    const myTag = e.target.innerText;

    const filteredByTags = notes.filter((note) => {
      return note.text.includes(myTag);
    });

    setFilteredNotes(filteredByTags);
  };

  const getAllTags = () => {
    const spans = notesRef.current.querySelectorAll("span.hashtag");
    spans.forEach((el) => (el.onclick = (e) => searchForeTag(e)));
  };

  //edit note function
  const editNote = () => {
    setEditNode(true);
  };

  // save note edits
  const saveEdits = () => {
    const noteEdit = notes[index];
    noteEdit.text = hashtagInputRef.current.innerText;
    setEditNode(false);
    getAllTags();
  };

  return (
    <div className="note" ref={notesRef}>
      <HashtagInput
        isEdited={isEdited}
        noteText={noteText}
        hashtagInputRef={hashtagInputRef}
      />

      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        {isEdited ? (
          <DoneIcon onClick={() => saveEdits()} />
        ) : (
          <EditIcon
            onClick={() => editNote()}
            className="note__delete"
            aria-hidden="true"
          />
        )}
        <DeleteForeverOutlinedIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></DeleteForeverOutlinedIcon>
      </div>
    </div>
  );
}

export default Note;
