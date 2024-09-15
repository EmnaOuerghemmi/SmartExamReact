import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EtudiantAdd.css';

const EtudiantsAdd = () => {
  const [etudiant, setEtudiant] = useState({
    nom: '',
    prenom: '',
    email: '',
    classe: '' // Utiliser l'ID de la classe ici
  });
  const [classes, setClasses] = useState([]); // État pour stocker les classes
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer toutes les classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des classes:', error);
      }
    };

    fetchClasses();

    // Si un ID est présent dans les paramètres, récupérer les détails de l'étudiant
    if (id) {
      const fetchEtudiant = async () => {
        try {
          const response = await axios.get(`http://localhost:8083/smartExam/etudiants/${id}`);
          setEtudiant({
            ...response.data,
            classe: response.data.classe ? response.data.classe.id : '' // Utiliser l'ID de la classe si disponible
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
        }
      };

      fetchEtudiant();
    }
  }, [id]);

  // Mettre à jour l'état des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtudiant({
      ...etudiant,
      [name]: value
    });
  };

  // Envoyer le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Mise à jour de l'étudiant
        await axios.put(`http://localhost:8083/smartExam/etudiants/${id}?classeId=${etudiant.classe}`, {
          nom: etudiant.nom,
          prenom: etudiant.prenom,
          email: etudiant.email
        });
      } else {
        // Création de l'étudiant
        await axios.post(`http://localhost:8083/smartExam/etudiants/${etudiant.classe}`, {
          nom: etudiant.nom,
          prenom: etudiant.prenom,
          email: etudiant.email
        });
      }
      navigate('/etudiant/alletudiant');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'étudiant:', error);
    }
  };

  return (
    <div className="etudiants-add-container" style={{ padding: '20px', marginTop: '50px' }}>
      <h2>{id ? 'Modifier l\'Étudiant' : 'Ajouter un Étudiant'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={etudiant.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={etudiant.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={etudiant.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Classe:</label>
          <select
            name="classe"
            value={etudiant.classe}
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
        <button className="btn-add" type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EtudiantsAdd;
