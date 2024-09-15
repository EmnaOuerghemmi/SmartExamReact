import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, CircularProgress, Button, IconButton, Select, MenuItem, ThemeProvider, createTheme, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff1744', // Rouge
    },
    secondary: {
      main: '#ff3d00', // Rouge plus clair
    },
    background: {
      default: '#C0C0C0', // Gris foncé
      paper: '#424242', // Gris plus clair
    },
    text: {
      primary: '#ffffff', // Blanc
      secondary: '#b0bec5', // Gris clair
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      color: '#ff1744', // Rouge pour les titres
    },
  },
});

const Affectations = () => {
  const { id } = useParams();
  const [affectations, setAffectations] = useState([]);
  const [doublons, setDoublons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState('');

  useEffect(() => {
    const fetchAffectations = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/smartExam/examens/${id}/affectations`);
        console.log(response.data);  // Vérifiez ici la structure des données
        setAffectations(response.data);
        const uniqueSalles = [...new Set(response.data.map(affectation => affectation.salleNom))];
        setSalles(uniqueSalles);
      } catch (error) {
        setError('Erreur lors de la récupération des affectations.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAffectations();
  }, [id]);
  

  const detectDoublons = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/smartExam/affectations/doublons/${id}`);
      setDoublons(response.data);
    } catch (error) {
      setError('Erreur lors de la détection des doublons.');
      console.error(error);
    }
  };

  const supprimerDoublon = async (affectationId) => {
    try {
      await axios.delete(`http://localhost:8083/smartExam/affectations/${affectationId}`);
      setAffectations(affectations.filter(affectation => affectation.id !== affectationId));
      setDoublons(doublons.filter(doublon => doublon.id !== affectationId));
    } catch (error) {
      setError('Erreur lors de la suppression de l\'affectation.');
      console.error(error);
    }
  };

  const isDoublon = (affectation) => {
    return doublons.some((doublon) => doublon.id === affectation.id);
  };

  const filteredAffectations = selectedSalle
    ? affectations.filter(affectation => affectation.salleNom === selectedSalle)
    : affectations;

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <p>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Container 
      
        style={{ 
          padding: '20px', 
          marginTop: '40px', 
          backgroundColor: theme.palette.background.default, 
          borderRadius: '8px', 
          minHeight: '100vh',  // Assurer que le conteneur prend au moins toute la hauteur visible
           marginLeft: '-270px',
          
          display: 'flex', 
         
          flexDirection: 'column' 
        }}
      >
        <Typography variant="h4" gutterBottom>Affectations pour l'examen</Typography>
        
        <Select
          value={selectedSalle}
          onChange={(e) => setSelectedSalle(e.target.value)}
          displayEmpty
          style={{ marginBottom: '10px', width: '180px', color: theme.palette.text.primary }}
        >
          <MenuItem value=''><em>Toutes les Salles</em></MenuItem>
          {salles.map((salle, index) => (
            <MenuItem key={index} value={salle}>{salle}</MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={detectDoublons}
          style={{ marginBottom: '10px' ,width: '250px'}}
          component={motion.div}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          Détecter les Doublons
        </Button>

        <List style={{ flex: 1 }}>
          {filteredAffectations.map((affectation, index) => (
            <ListItem
              key={index}
              component={motion.div}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: isDoublon(affectation) ? 'rgba(100, 0, 0, 0.2)' : theme.palette.background.paper,
                marginBottom: '10px',
                borderRadius: '8px'
              }}
            >
             <ListItemText
  primary={`Étudiant : ${affectation.etudiant?.prenom || 'N/A'} ${affectation.etudiant?.nom || 'N/A'}`}
  secondary={`Salle : ${affectation.salleNom || 'N/A'}`}
  style={{ color: theme.palette.text.primary }}
/>


              {isDoublon(affectation) && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => supprimerDoublon(affectation.id)}
                  component={motion.div}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <DeleteIcon style={{ color: theme.palette.primary.main }} />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default Affectations;
