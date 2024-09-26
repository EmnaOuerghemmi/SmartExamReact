import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, CircularProgress, IconButton, ThemeProvider, createTheme, Container } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { motion } from 'framer-motion';

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

const Examen = () => {
  const [examens, setExamens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/examens');
        setExamens(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des examens.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamens();
  }, []);

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <p>{error}</p>;

  const handleViewAffectations = (id) => {
    navigate(`/examens/${id}/affectations`);
  };

  const handleCreateAffectation = (id) => {
    navigate(`/examens/${id}/create-affectation`);
  };

  const handleAddExamen = () => {
    navigate('/addExamen'); // Redirection vers la page d'ajout d'examen
  };

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
        <Typography variant="h4" gutterBottom>Liste des Examens</Typography>

        {/* Icône d'ajout pour rediriger vers l'ajout d'examen */}
        <IconButton
          color="primary"
          onClick={handleAddExamen}
          style={{ marginBottom: '20px' }}
          component={motion.div}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <List component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {examens.map((examen) => (
            <ListItem
              key={examen.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: theme.palette.background.paper,
                marginBottom: '10px',
                borderRadius: '8px',
              }}
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItemText
                primary={examen.nom}
                secondary={`Date : ${examen.date} - Heure : ${examen.heure}`}
                style={{ color: theme.palette.text.primary }}
              />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewAffectations(examen.id)}
                  style={{ marginRight: '10px' }}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir Affectations
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCreateAffectation(examen.id)}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Créer Affectation
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default Examen;
