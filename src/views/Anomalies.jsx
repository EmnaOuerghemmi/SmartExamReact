import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Icone d'erreur
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Icone d'avertissement
import axios from 'axios';

const Anomalies0 = () => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    // Récupérer les anomalies depuis l'API
    axios.get('http://localhost:8083/smartExam/anomalies/notes-anomaliques') // Updated endpoint
      .then((response) => {
        setAnomalies(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des anomalies:', error);
      });
  }, []);

  const getIconByType = (type) => {
    // Retourner une icône en fonction du type d'anomalie
    switch (type) {
      case "Anomalie d'Évolution":
        return <WarningAmberIcon sx={{ color: '#FF1744' }} />; // Amber color
      case "Anomalie d'Absence":
        return <ErrorOutlineIcon sx={{ color: '#FF1744' }} />; // Red color
      default:
        return <ErrorOutlineIcon sx={{ color: '#FF1744' }} />; // Gray color
    }
  };

  return (
    <Box sx={{ p: 2, mt: 8, backgroundColor: '#535151' }}> {/* Dark background */}
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FF3D00' }}>
        Liste des Anomalies
      </Typography>
      <Grid container spacing={3}>
        {anomalies.map((anomalie) => (
          <Grid item xs={12} md={6} lg={4} key={anomalie.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, backgroundColor: '#424242', color: '#FFFFFF' }}>
              <IconButton sx={{ marginRight: 2 }}>
                {getIconByType("Anomalie de Note")} {/* Default icon for notes */}
              </IconButton>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#FF3D00' }}>
                  Anomalie de Note
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {anomalie.valeur === -2 ? "Étudiant absent(e)" : "Note augmentée"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Étudiant: {anomalie.etudiant.nom} {anomalie.etudiant.prenom}
                </Typography>
                <Typography variant="body1">
                  Note: {anomalie.valeur}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Examen: {anomalie.examen.nom}, Module: {anomalie.examen.module.nom}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Anomalies0;
