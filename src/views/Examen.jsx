import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, CircularProgress } from '@mui/material';

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

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  const handleViewAffectations = (id) => {
    navigate(`/examens/${id}/affectations`);
  };

  const handleCreateAffectation = (id) => {
    navigate(`/examens/${id}/create-affectation`); // Redirige vers la page de création d'affectation
  };

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Liste des Examens</Typography>
      <List>
        {examens.map((examen) => (
          <ListItem key={examen.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText 
              primary={examen.nom} 
              secondary={`Date : ${examen.date} - Heure : ${examen.heure}`} 
            />
            <div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleViewAffectations(examen.id)}
                style={{ marginRight: '10px' }}
              >
                Voir Affectations
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleCreateAffectation(examen.id)}
              >
                Créer Affectation
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Examen;
