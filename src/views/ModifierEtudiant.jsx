import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ModifierEtudiant = () => {
  const { id } = useParams();  // ID de l'étudiant à modifier
  const [etudiant, setEtudiant] = useState({
    nom: '',
    prenom: '',
    email: '',
    classe: { id: '' }  // Objet classe avec un id
  });
  const [classes, setClasses] = useState([]);  // Liste des classes
  const [message, setMessage] = useState('');  // Message d'erreur ou de succès
  const navigate = useNavigate();

  // Récupérer les données de l'étudiant existant
  useEffect(() => {
    const fetchEtudiant = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/etudiants/${id}`);
        setEtudiant(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'étudiant:', error);
        setMessage('Erreur lors de la récupération des données de l\'étudiant.');
      }
    };

    fetchEtudiant();
  }, [id]);

  // Récupérer la liste des classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des classes:', error);
        setMessage('Erreur lors de la récupération des classes.');
      }
    };

    fetchClasses();
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'classeId') {
      setEtudiant({ ...etudiant, classe: { id: value } });  
    } else {
      setEtudiant({ ...etudiant, [name]: value });
    }
  };

  // Envoyer les modifications au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8083/etudiants/${id}`, etudiant, {
        params: { classeId: etudiant.classe.id }
      });
      setMessage('Étudiant mis à jour avec succès.');
      setTimeout(() => navigate('/etudiants'), 1000);  // Rediriger après mise à jour
    } catch (error) {
      console.error('Erreur lors de la modification de l\'étudiant:', error);
      setMessage('Erreur lors de la modification de l\'étudiant.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Modifier Étudiant</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={etudiant.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={etudiant.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={etudiant.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Classe:</label>
          <select
            name="classeId"
            value={etudiant.classe?.id || ''}  // Vérification de la classe
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une classe</option>
            {classes.map((classe) => (
              <option key={classe.id} value={classe.id}>
                {classe.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierEtudiant;
