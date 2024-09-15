import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const AjouterSalle = () => {
  const [nom, setNom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8083/smartExam/salles', { nom });
      navigate('/salles');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la salle', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Ajouter une Salle</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom de la salle"
          variant="outlined"
          fullWidth
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Container>
  );
};

export default AjouterSalle;
