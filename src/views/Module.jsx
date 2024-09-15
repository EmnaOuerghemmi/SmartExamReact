import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

// Style pour les cartes avec animation
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  margin: theme.spacing(2),
  position: 'relative', // Permet de positionner le bouton de suppression
}));

// Style pour le bouton de suppression
const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.common.black, // Définir la couleur en noir
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: theme.palette.error.main, // Couleur rouge lors du survol
  },
}));

const Module = () => {
  const { id } = useParams();  // Récupérer l'ID de la classe à partir des paramètres de l'URL
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchModules = async () => {
      try {
        console.log(`Fetching modules for class ID: ${id}`); // Debug
        const response = await axios.get(`http://localhost:8083/smartExam/modules/classe/${id}`);
        console.log('Modules data:', response.data); // Debug
        setModules(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des modules.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchModules();
  }, [id]);
  

  const handleViewExamens = (moduleId) => {
    navigate(`/examens/module/${moduleId}`);
  };

  const handleDeleteModule = async (moduleId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce module ?')) {
      try {
        await axios.delete(`http://localhost:8083/smartExam/modules/${moduleId}`);
        setModules(modules.filter((module) => module.id !== moduleId));
      } catch (error) {
        setError('Erreur lors de la suppression du module.');
        console.error(error);
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Liste des Modules</Typography>
      <Grid container spacing={2}>
        {modules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <StyledCard>
              <DeleteButton onClick={() => handleDeleteModule(module.id)}>
                <DeleteIcon />
              </DeleteButton>
              <CardContent>
                <Typography variant="h5">{module.nom}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '16px',
                    backgroundColor: 'black',
                    color: 'white',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'red', // Couleur rouge lors du survol
                    },
                  }}
                  onClick={() => handleViewExamens(module.id)}
                >
                  Voir Examens
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Module;
