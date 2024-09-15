import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClasseAdd = () => {
  const [nom, setNom] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddClasse = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Envoyer la nouvelle classe au backend
      await axios.post('http://localhost:8083/smartExam/classes', { nom });
      // Rediriger vers la liste des classes après l'ajout
      navigate('/classes');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la classe.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Ajouter une nouvelle classe
        </Typography>

        <form onSubmit={handleAddClasse}>
          <TextField
            label="Nom de la classe"
            variant="outlined"
            fullWidth
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            margin="normal"
          />

          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
          >
            Ajouter
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ClasseAdd;
