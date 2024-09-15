import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, CircularProgress, Card, CardContent, Alert } from '@mui/material';

const StudentsByClass = () => {
  const { classId } = useParams(); // Récupère l'ID de la classe depuis les paramètres de l'URL
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/smartExam/classes/${classId}/etudiants`);
        setStudents(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des étudiants.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div  style={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>Étudiants de la Classe</Typography>
      <Card variant="outlined">
        <CardContent>
          <List>
            {students.length > 0 ? (
              students.map(student => (
                <ListItem key={student.id}>
                  {student.nom} {student.prenom} ({student.email})
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">Aucun étudiant trouvé pour cette classe.</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsByClass;
