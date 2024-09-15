import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, MenuItem, Typography, CircularProgress } from '@mui/material';

const AddAffectation = () => {
  const { id } = useParams(); // ID de l'examen
  const [salles, setSalles] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState('');
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sallesResponse = await axios.get('http://localhost:8083/smartExam/salles');
        const etudiantsResponse = await axios.get('http://localhost:8083/smartExam/etudiants');
        setSalles(sallesResponse.data);
        setEtudiants(etudiantsResponse.data);
      } catch (error) {
        setError('Erreur lors du chargement des données.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8083/smartExam/affectations/test/${selectedEtudiant}/${id}/${selectedSalle}`, {});
      navigate(`/examens/${id}/affectations`); // Redirige vers la liste des affectations après la création
    } catch (error) {
      setError('Erreur lors de la création de l\'affectation.');
      console.error(error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Créer une Affectation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Salle"
          value={selectedSalle}
          onChange={(e) => setSelectedSalle(e.target.value)}
          fullWidth
          margin="normal"
        >
          {salles.map((salle) => (
            <MenuItem key={salle.id} value={salle.id}>
              {salle.nom}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Étudiant"
          value={selectedEtudiant}
          onChange={(e) => setSelectedEtudiant(e.target.value)}
          fullWidth
          margin="normal"
        >
          {etudiants.map((etudiant) => (
            <MenuItem key={etudiant.id} value={etudiant.id}>
              {`${etudiant.nom} ${etudiant.prenom}`}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Créer Affectation
        </Button>
      </form>
    </div>
  );
};

export default AddAffectation;
