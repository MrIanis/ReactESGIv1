import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

import "./Note.css";

const Note = ({ onSave, onDelete }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const fetchNote = useCallback(async () => {
    const response = await fetch("/notes/${id}");
    const result = await response.json();
    setNote(result);
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/notes/${id}", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    onSave();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setShowConfirmationDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirmationDialog(false);
    await fetch("/notes/${id}", {
      method: "DELETE",
    });
    onDelete();
  };

  const handleDeleteCancelled = () => {
    setShowConfirmationDialog(false);
  };

  return (
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
        <button className="Button" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
      <Dialog open={showConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette note ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmed} color="primary">
            Oui
          </Button>
          <Button onClick={handleDeleteCancelled} color="primary" autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Note;
