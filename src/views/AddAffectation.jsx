import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Typography, CircularProgress, ThemeProvider, createTheme, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Rouge vif
    },
    secondary: {
      main: '#535151', // Gris foncé
    },
    background: {
      default: '#424242', // Gris plus sombre
      paper: '#535151', // Gris foncé
    },
    text: {
      primary: '#ffffff', // Blanc
      secondary: '#b0bec5', // Gris clair
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      color: '#ff0000', // Rouge pour les titres
    },
  },
});

const AddAffectation = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [salles, setSalles] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
  const [selectedSalle, setSelectedSalle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Récupère l'ID de l'examen à partir des paramètres d'URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const etudiantsResponse = await axios.get('http://localhost:8083/smartExam/etudiants');
        const sallesResponse = await axios.get('http://localhost:8083/smartExam/salles');
        setEtudiants(etudiantsResponse.data);
        setSalles(sallesResponse.data);
      } catch (err) {
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:8083/smartExam/affectations/test/${selectedEtudiant}/${id}/${selectedSalle}`);
      navigate(`/examens/${id}/affectations`); // Redirige vers la liste des affectations après ajout
    } catch (err) {
      setError('Erreur lors de la création de l\'affectation.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <p>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          padding: '20px',
          marginTop: '50px',
          backgroundColor: theme.palette.background.default,
          borderRadius: '8px',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>Ajouter une Affectation</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Sélectionner un étudiant"
            value={selectedEtudiant}
            onChange={(e) => setSelectedEtudiant(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="secondary"
          >
            {etudiants.map((etudiant) => (
              <MenuItem key={etudiant.id} value={etudiant.id}>
                {etudiant.prenom} {etudiant.nom}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Sélectionner une salle"
            value={selectedSalle}
            onChange={(e) => setSelectedSalle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="secondary"
          >
            {salles.map((salle) => (
              <MenuItem key={salle.id} value={salle.id}>
                {salle.nom}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ajouter l'Affectation
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddAffectation;
