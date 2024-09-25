import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./AllNotes.css";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [filterClass, setFilterClass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer toutes les notes depuis le backend
  useEffect(() => {
    axios
      .get("http://localhost:8083/smartExam/notes")
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des notes:", error);
        setError("Erreur lors de la récupération des notes.");
      });
  }, []);

  // Fonction pour filtrer les notes en fonction du nom de la classe
  const handleFilterChange = (event) => {
    const className = event.target.value.toLowerCase();
    setFilterClass(className);

    if (className) {
      const filtered = notes.filter((note) => {
        return note.classeNom?.toLowerCase().includes(className);
      });
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  };

  // Fonction pour supprimer une note
  const handleDeleteNote = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      axios
        .delete(`http://localhost:8083/smartExam/notes/${id}`)
        .then(() => {
          setNotes(notes.filter((note) => note.id !== id));
          setFilteredNotes(filteredNotes.filter((note) => note.id !== id));
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la note:", error);
          setError("Erreur lors de la suppression de la note.");
        });
    }
  };

  const handleAddNoteClick = () => {
    navigate("/addNote");
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      className="all-notes-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Toutes les Notes</h2>

      {/* Bouton pour ajouter une note */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button onClick={handleAddNoteClick}>Ajouter une Note</button>
      </div>

      {/* Champ de filtrage par nom de classe */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filter" style={{ color: "#ecf0f1" }}>
          Filtrer par nom de classe:{" "}
        </label>
        <input
          type="text"
          id="filter"
          value={filterClass}
          onChange={handleFilterChange}
          placeholder="Nom de la classe"
        />
      </div>

      {/* Tableau pour afficher les notes */}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Classe</th>
            <th>Module</th>
            <th>Examen</th>
            <th>Note</th>
           
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <motion.tr
                key={note.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <td>{note.etudiantNomComplet || "N/A"}</td>
                <td>{note.classeNom || "N/A"}</td>
                <td>{note.moduleNom || "N/A"}</td>
                <td>{note.examenNom || "N/A"}</td>
                <td>{note.valeur}</td>
                <td>
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune note trouvée.</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default AllNotes;
