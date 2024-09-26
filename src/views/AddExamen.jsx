import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline } from '@mui/icons-material';

const AddExamen = () => {
  const [modules, setModules] = useState([]);
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [moduleId, setModuleId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch modules
    axios.get('http://localhost:8083/smartExam/modules')
      .then(response => setModules(response.data))
      .catch(error => console.error('Erreur lors de la récupération des modules:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExamen = {
      nom,
      date,
      heure,
      module: {
        id: moduleId
      }
    };

    axios.post('http://localhost:8083/smartExam/examens', newExamen)
      .then(response => {
        console.log('Examen ajouté avec succès:', response.data);
        navigate('/examens'); // Rediriger vers la liste des examens après l'ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'examen:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: '100px', backgroundColor: '#535151', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#f44336', textAlign: 'center' }}>
          Ajouter un Examen
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom de l'examen"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: '#333', color: '#fff', label: { color: '#f44336' }, input: { color: '#fff' } }}
          />

          <TextField
            fullWidth
            label="Date de l'examen"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: '#333', color: '#fff', label: { color: '#f44336' }, input: { color: '#fff' } }}
          />

          <TextField
            fullWidth
            label="Heure de l'examen"
            type="time"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: '#333', color: '#fff', label: { color: '#f44336' }, input: { color: '#fff' } }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="module-label" sx={{ color: '#f44336' }}>Module</InputLabel>
            <Select
              labelId="module-label"
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#f44336', color: '#fff', marginTop: '10px' }}>
            Ajouter l'Examen
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddExamen;
