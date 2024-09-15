import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Etudiant.css';

const Etudiant = () => {
  const [etudiants, setEtudiants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/etudiants');
        setEtudiants(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants:', error);
      }
    };

    fetchEtudiants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/smartExam/etudiants/${id}`);
      setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/etudiants/modifier/${id}`); // Rediriger vers la page de modification
  };

  const handleAdd = () => {
    navigate('/etudiant/add');
  };

  return (
    <div className="etudiant-container" style={{ padding: '20px', marginTop: '50px' }}>
      <h2>Liste des Étudiants</h2>
      {etudiants.length > 0 ? (
        <table className="etudiant-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Classe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant) => (
              <tr key={etudiant.id} className="etudiant-row">
                <td>{etudiant.id}</td>
                <td>{etudiant.nom}</td>
                <td>{etudiant.prenom}</td>
                <td>{etudiant.email}</td>
                <td>{etudiant.classeNom}</td>
                <td>
                  <button className="btn-add" onClick={() => handleEdit(etudiant.id)}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(etudiant.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun étudiant trouvé.</p>
      )}
      <button 
        className="btn-add" 
        onClick={handleAdd} 
        style={{ position: 'fixed', bottom: '20px', right: '20px' }} // Positionnement en bas à gauche
      >
        Ajouter un Étudiant
      </button>
    </div>
  );
};

export default Etudiant;
