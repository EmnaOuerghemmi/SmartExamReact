import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';

const EtudiantClasse = () => {
  const { classeId } = useParams();
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/smartExam/etudiants/classe/${classeId}`);
        setEtudiants(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des étudiants.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, [classeId]);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', marginTop: '50px' }}> {/* Ajout de marginTop pour déplacer vers le bas */}
    <Typography variant="h4" gutterBottom>Liste des Étudiants</Typography>
    <List>
      {etudiants.map((etudiant) => (
        <ListItem key={etudiant.id}>
          <ListItemText 
            primary={`${etudiant.nom} ${etudiant.prenom}`} 
            secondary={etudiant.email} 
          />
        </ListItem>
      ))}
    </List>
  </div>
  );
};

export default EtudiantClasse;
