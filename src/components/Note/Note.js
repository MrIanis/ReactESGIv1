import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Note.css";

const Note = ({ onSave, onDelete }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const fetchNote = useCallback(async () => {
    const response = await fetch(`/notes/${id}`);
    const result = await response.json();
    setNote(result);

  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    onSave();
  };

  const handleDelete = async () => {
    
    await fetch(`/notes/${id}`, {
      method: "DELETE",
    });
    onSave();
    navigate("/");
    
    
  };

  const handleShowDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          className="Note-editable Note-title"
          type="text"
          value={note ? note.title : ""}
          onChange={(event) => {
            setNote({ ...note, title: event.target.value });
          }}
        />
        <textarea
          className="Note-editable Note-content"
          value={note ? note.content : ""}
          onChange={(event) => {
            setNote({ ...note, content: event.target.value });
          }}
        />
        <div className="Note-actions ">
          <button className="Button" type="submit">
            Enregistrer
          </button>
          <button className="Button" onClick={handleShowDeleteConfirmation}>
            Supprimer
          </button>
        </div>
      </form>
      {showDeleteConfirmation && (
        <div className="Overlay">
          <div className="Confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
            <div>
              <button className="Button" onClick={handleDelete}>
                Oui
                
              </button>
              <button className="Button" onClick={handleHideDeleteConfirmation}>
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
