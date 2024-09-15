import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Button, Typography, CircularProgress, Container, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Salles = () => {
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/salles');
        setSalles(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des salles.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalles();
  }, []);

  const deleteSalle = async (salleId) => {
    try {
      await axios.delete(`http://localhost:8083/smartExam/salles/${salleId}`);
      setSalles(salles.filter((salle) => salle.id !== salleId));
    } catch (error) {
      setError('Erreur lors de la suppression de la salle.');
      console.error(error);
    }
  };

  const goToAjouterSalle = () => {
    navigate('/ajouterSalle');
  };

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <p>{error}</p>;

  return (
    <Container 
      style={{ 
        padding: '20px', 
        marginTop: '40px', 
        backgroundColor: '#C0C0C0', 
        borderRadius: '8px',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Liste des Salles
      </Typography>

      <List>
        {salles.map((salle, index) => (
          <ListItem
            key={index}
            component={motion.div}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: '#424242',
              marginBottom: '10px',
              borderRadius: '8px',
              color: '#fff',
            }}
          >
            <ListItemText
              primary={salle.nom}
              style={{ color: '#ffffff' }}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteSalle(salle.id)}
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <DeleteIcon style={{ color: '#ff1744' }} />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Button to Add a New Salle */}
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={goToAjouterSalle}
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px',
          backgroundColor: '#ff1744'
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default Salles;
