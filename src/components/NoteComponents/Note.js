import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function Note({
  id,
  text,
  textHandler,
  deleteNote,
  editNote,
  isEdited,
  inputEditText,
}) {
  return (
    <div className="note">
      {isEdited ? (
        <textarea
          cols="10"
          rows="5"
          value={inputEditText}
          placeholder="Type...."
          onChange={textHandler}
          maxLength="100"
        ></textarea>
      ) : (
        <div className="note__body">{text}</div>
      )}

      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        {isEdited ? (
          <DoneIcon
          // onClick={}
          />
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
