import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [examens, setExamens] = useState([]);
  const [modules, setModules] = useState([]);
  const [classes, setClasses] = useState([]);
  
  const [etudiantId, setEtudiantId] = useState('');
  const [examenId, setExamenId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [classeId, setClasseId] = useState('');
  const [valeur, setValeur] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Etudiants
    axios.get('http://localhost:8083/smartExam/etudiants')
      .then(response => setEtudiants(response.data))
      .catch(error => console.error('Erreur lors de la récupération des étudiants:', error));
    
    // Fetch Examens
    axios.get('http://localhost:8083/smartExam/examens')
      .then(response => setExamens(response.data))
      .catch(error => console.error('Erreur lors de la récupération des examens:', error));
      
    // Fetch Modules
    axios.get('http://localhost:8083/smartExam/modules')
      .then(response => setModules(response.data))
      .catch(error => console.error('Erreur lors de la récupération des modules:', error));
      
    // Fetch Classes
    axios.get('http://localhost:8083/smartExam/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Erreur lors de la récupération des classes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newNote = {
      valeur: parseFloat(valeur),
    };

    axios.post(`http://localhost:8083/smartExam/notes/test/${etudiantId}/${examenId}/${moduleId}/${classeId}`, newNote)
      .then(response => {
        console.log('Note ajoutée avec succès:', response.data);
        navigate('/notes'); // Rediriger vers la liste des notes après l'ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la note:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      {/* Box with marginTop to avoid being hidden by AppBar */}
      <Box sx={{ marginTop: '100px', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#f44336', textAlign: 'center' }}>
          Ajouter une Note
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="etudiant-label" sx={{ color: '#f44336' }}>Étudiant</InputLabel>
            <Select
              labelId="etudiant-label"
              value={etudiantId}
              onChange={(e) => setEtudiantId(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
            >
              {etudiants.map((etudiant) => (
                <MenuItem key={etudiant.id} value={etudiant.id}>
                  {`${etudiant.prenom} ${etudiant.nom}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="examen-label" sx={{ color: '#f44336' }}>Examen</InputLabel>
            <Select
              labelId="examen-label"
              value={examenId}
              onChange={(e) => setExamenId(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
            >
              {examens.map((examen) => (
                <MenuItem key={examen.id} value={examen.id}>
                  {examen.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          <FormControl fullWidth margin="normal">
            <InputLabel id="classe-label" sx={{ color: '#f44336' }}>Classe</InputLabel>
            <Select
              labelId="classe-label"
              value={classeId}
              onChange={(e) => setClasseId(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
            >
              {classes.map((classe) => (
                <MenuItem key={classe.id} value={classe.id}>
                  {classe.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Note"
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: '#333', color: '#fff', label: { color: '#535151' }, input: { color: '#fff' } }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#f44336', color: '#fff' }}>
            Ajouter la Note
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddNote;
