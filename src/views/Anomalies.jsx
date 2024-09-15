import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Icone d'erreur
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Icone d'avertissement
import axios from 'axios';

const Anomalies0 = () => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    // Récupérer les anomalies depuis l'API
    axios.get('http://localhost:8083/smartExam/anomalies')
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
        return <WarningAmberIcon color="warning" />;
      case "Anomalie d'Absence":
        return <ErrorOutlineIcon color="error" />;
      default:
        return <ErrorOutlineIcon color="action" />;
    }
  };

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      {/* 'mt: 8' ajoute une marge en haut du conteneur */}
      <Typography variant="h4" align="center" gutterBottom>
        Liste des Anomalies
      </Typography>
      <Grid container spacing={3}>
        {anomalies.map((anomalie) => (
          <Grid item xs={12} md={6} lg={4} key={anomalie.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              <IconButton sx={{ marginRight: 2 }}>
                {getIconByType(anomalie.type)}
              </IconButton>
              <CardContent>
                <Typography variant="h6" component="div">
                  {anomalie.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {anomalie.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Étudiant: {anomalie.etudiant.nom} {anomalie.etudiant.prenom}
                </Typography>
                <Typography variant="body1">
                  Note: {anomalie.note.valeur}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Examen: {anomalie.note.examen.nom}, Module: {anomalie.note.examen.module.nom}
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
