import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNote = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [modules, setModules] = useState([]);
  const [examens, setExamens] = useState([]);
  const [note, setNote] = useState({
    valeur: "",
    date: "",
    examenId: "",
    moduleId: "",
    etudiantId: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const etudiantsResponse = await axios.get("http://localhost:8083/smartExam/etudiants");
        const modulesResponse = await axios.get("http://localhost:8083/smartExam/modules");
        const examensResponse = await axios.get("http://localhost:8083/smartExam/examens");
        setEtudiants(etudiantsResponse.data);
        setModules(modulesResponse.data);
        setExamens(examensResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors de la récupération des données.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8083/smartExam/notes", note)
      .then((response) => {
        alert("Note ajoutée avec succès!");
        setNote({
          valeur: "",
          date: "",
          examenId: "",
          moduleId: "",
          etudiantId: "",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la note:", error);
        setError("Erreur lors de l'ajout de la note.");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Ajouter une Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Valeur:</label>
          <input
            type="number"
            name="valeur"
            value={note.valeur}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={note.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Examen:</label>
          <select
            name="examenId"
            value={note.examenId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un examen</option>
            {examens.map((examen) => (
              <option key={examen.id} value={examen.id}>
                {examen.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Module:</label>
          <select
            name="moduleId"
            value={note.moduleId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un module</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Étudiant:</label>
          <select
            name="etudiantId"
            value={note.etudiantId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un étudiant</option>
            {etudiants.map((etudiant) => (
              <option key={etudiant.id} value={etudiant.id}>
                {etudiant.nomComplet}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Ajouter Note</button>
      </form>
    </div>
  );
};

export default AddNote;
