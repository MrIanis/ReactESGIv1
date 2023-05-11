import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import Note from "./components/Note/Note";

function App() {
  const [notes, setNotes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
  };

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = async () => {
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newNoteTitle }),
    });
    const result = await response.json();
    setNewNoteTitle("");
    setNotes((prevNotes) => [...prevNotes, result]);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
<>
  <aside className="Side">
    <div className="Search">
      <input
        type="text"
        placeholder="Recherche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="Note-list">
      {filteredNotes &&
        filteredNotes.map((note) => (
          <Link to={`/notes/${note.id}`} className="Note-link">
            {note.title}
          </Link>
        ))}
    </div>
    <div className="New-note">
      <input
        type="text"
        placeholder="Titre de la note"
        value={newNoteTitle}
        onChange={(e) => setNewNoteTitle(e.target.value)}
      />
      <button onClick={handleCreateNote} className="Button">Créer une note</button>
    </div>
  </aside>
  <main className="Main">
    <Routes>
      <Route path="/notes/:id" element={<Note onSave={fetchNotes} />} />
    </Routes>
  </main>
</>

  );
}


export default App;