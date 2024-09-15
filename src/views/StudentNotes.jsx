import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentNotes = () => {
  const { studentId } = useParams(); // Récupérer l'ID de l'étudiant depuis l'URL
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Récupérer les notes de l'étudiant spécifique depuis le backend
    axios.get(`http://localhost:8083/smartExam/notes/findByEtudiantId?etudiantId=${studentId}`)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des notes:", error);
      });
  }, [studentId]);

  return (
    <div className="student-notes-container">
      <h2>Notes de l'étudiant</h2>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Examen</th>
            <th>Note</th>
          
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>{note.module.nom}</td>
              <td>{note.examen.nom}</td>
              <td>{note.valeur}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentNotes;
