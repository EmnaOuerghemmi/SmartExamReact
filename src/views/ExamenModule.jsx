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

const ExamenModule = () => {
    const { id } = useParams();
    console.log('ID du module:', id); // Vérifiez que l'ID est correct
      const [examens, setExamens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/smartExam/examens/module/${id}`);
        setExamens(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des examens.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamens();
  }, [id]);
  
     
  

  const handleDeleteExamen = async (examenId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet examen ?')) {
      try {
        await axios.delete(`http://localhost:8083/smartExam/examens/${examenId}`);
        setExamens(examens.filter((examen) => examen.id !== examenId));
      } catch (error) {
        setError('Erreur lors de la suppression de l\'examen.');
        console.error(error);
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Liste des Examens</Typography>
      <Grid container spacing={2}>
        {examens.map((examen) => (
          <Grid item xs={12} sm={6} md={4} key={examen.id}>
            <StyledCard>
              <DeleteButton onClick={() => handleDeleteExamen(examen.id)}>
                <DeleteIcon />
              </DeleteButton>
              <CardContent>
                <Typography variant="h5">{examen.nom}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(examen.date).toLocaleDateString()}
                </Typography>
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
                  onClick={() => navigate(`/examens/${examen.id}`)}
                >
                  Voir Détails
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExamenModule;
