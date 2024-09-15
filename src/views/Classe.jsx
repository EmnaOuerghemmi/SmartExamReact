import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, IconButton, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; // Importer l'icône d'ajout

// Style pour les cartes avec animation
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  margin: theme.spacing(2),
  position: 'relative',
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.common.black,
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: theme.palette.error.main,
  },
}));

const FabButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'red',
  },
}));

const Classe = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8083/smartExam/classes');
        setClasses(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des classes.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleViewStudents = (id) => {
    navigate(`/etudiants/${id}`);
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      try {
        await axios.delete(`http://localhost:8083/smartExam/classes/${id}`);
        setClasses(classes.filter((classe) => classe.id !== id));
      } catch (error) {
        setError('Erreur lors de la suppression de la classe.');
        console.error(error);
      }
    }
  };

  const handleViewModules = (id) => {
    navigate(`/modules/${id}`);
  };

  const handleAddClass = () => {
    navigate('/ajouter-classe'); // Redirige vers le formulaire d'ajout de classe
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Liste des Classes</Typography>
      <Grid container spacing={2}>
        {classes.map((classe) => (
          <Grid item xs={12} sm={6} md={4} key={classe.id}>
            <StyledCard>
              <DeleteButton onClick={() => handleDeleteClass(classe.id)}>
                <DeleteIcon />
              </DeleteButton>
              <CardContent>
                <Typography variant="h5">{classe.nom}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '16px',
                    backgroundColor: 'black',
                    color: 'white',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                  onClick={() => handleViewStudents(classe.id)}
                >
                  Voir Étudiants
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '16px',
                    backgroundColor: 'black',
                    color: 'white',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                  onClick={() => handleViewModules(classe.id)}
                >
                  Voir les modules
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Bouton flottant pour ajouter une classe */}
      <FabButton onClick={handleAddClass}>
        <AddIcon />
      </FabButton>
    </div>
  );
};

export default Classe;
