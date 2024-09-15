import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Pour les animations
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [filterClass, setFilterClass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour récupérer toutes les notes depuis le backend
  useEffect(() => {
    axios.get("http://localhost:8083/smartExam/notes")
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data); // Initialiser les notes filtrées avec toutes les notes
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
        return (
          note.moduleNom?.toLowerCase().includes(className)
        );
      });
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes); // Si aucun filtre, afficher toutes les notes
    }
  };

  const handleAddNoteClick = () => {
    navigate('/addNote'); // Navigation vers la page d'ajout de note
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      className="all-notes-container"
      initial={{ opacity: 0, y: -50 }} // Animation d'apparition
      animate={{ opacity: 1, y: 0 }} // Quand la page est chargée
      transition={{ duration: 0.5 }} // Durée de la transition
      style={{ paddingTop: "80px" }} // Décale la page vers le bas
    >
      <h2>Toutes les Notes</h2>

      {/* Bouton pour ajouter une note */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleAddNoteClick}>
          Ajouter une Note
        </button>
      </div>

      {/* Champ de filtrage par nom de classe */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filter">Filtrer par nom de classe: </label>
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
        initial={{ opacity: 0 }} // L'animation commence avec une opacité de 0
        animate={{ opacity: 1 }} // Augmentation progressive de l'opacité
        transition={{ duration: 0.5 }} // Transition douce
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Classe</th>
            <th>Module</th>
            <th>Examen</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <motion.tr
                key={note.id}
                whileHover={{ scale: 1.05 }} // Animation au survol
                transition={{ duration: 0.3 }}
              >
                <td>{note.etudiantNomComplet || "N/A"}</td>
                <td>{note.moduleNom || "N/A"}</td>
                <td>{note.moduleNom || "N/A"}</td>
                <td>{note.examenNom || "N/A"}</td>
                <td>{note.valeur}</td>
                <td>{new Date(note.date).toLocaleDateString()}</td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune note trouvée.</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default AllNotes;
