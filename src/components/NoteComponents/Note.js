import { useState } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function Note({ id, text, index, deleteNote, notes }) {
  const [isEdited, setEditNode] = useState(false);
  const [inputEditText, setInputEditText] = useState(text);

  //edit note function
  const editNote = (id, text) => {
    setEditNode(true);
    document.getElementById("mytextarea").focus();
    // setInputEditText(text);
  };

  // get text and store in state
  const textEditHandler = (e) => {
    setInputEditText(e.target.value);
  };

  const saveEdits = () => {
    const noteEdit = notes[index];
    noteEdit.text = inputEditText;
    setEditNode(false);
  };

  return (
    <div className="note">
      {!isEdited ? (
        <div>{inputEditText}</div>
      ) : (
        <textarea
          id="mytextarea"
          cols="10"
          rows="5"
          value={inputEditText}
          onChange={textEditHandler}
          maxLength="100"
          autoFocus
          readOnly={!isEdited}
        ></textarea>
      )}

      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        {isEdited ? (
          <DoneIcon onClick={() => saveEdits()} />
        ) : (
          <EditIcon
            onClick={() => editNote(id, text)}
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
