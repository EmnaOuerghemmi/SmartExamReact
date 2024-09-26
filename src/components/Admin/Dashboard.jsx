import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Grid, Typography, Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work with React

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [anomalyData, setAnomalyData] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8083/smartExam/classes/statistics');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        const fetchAnomalyStats = async () => {
            try {
                const response = await axios.get('http://localhost:8083/smartExam/anomalies/statistiques');
                setAnomalyData(response.data);
            } catch (error) {
                console.error('Error fetching anomaly statistics:', error);
            }
        };

        fetchStats();
        fetchAnomalyStats();
    }, []);

    // Prepare chart data for anomalies
    const chartData = anomalyData ? {
        labels: Object.keys(anomalyData), // ["Étudiant absent(e)", "Note augmentée"]
        datasets: [
            {
                label: 'Anomalies',
                data: Object.values(anomalyData), // [percentage of "Étudiant absent(e)", percentage of "Note augmentée"]
                backgroundColor: ['#ff6384', '#36a2eb'], // Colors for the chart
                hoverBackgroundColor: ['#ff6384', '#36a2eb'],
            },
        ],
    } : null;

    return (
        <Box sx={{ padding: '20px', margin:'80px' }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={4}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card
                                sx={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Typography variant="h6" color="primary">
                                    {stat.classe}
                                </Typography>
                                <Typography variant="h4">
                                    {stat.nombreEtudiants}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Étudiants
                                </Typography>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Circular Chart for Anomalies */}
            {chartData && (
                <Container
                    sx={{
                        backgroundColor: '#f5f5f5',
                        marginTop: '40px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        maxWidth: '400px', // Controls the width of the container
                    }}
                >
                    <Typography variant="h5" gutterBottom align="center">
                        Anomalie Statistics
                    </Typography>
                    <Box
                        sx={{
                            width: '300px', // Reduce the size of the chart
                            height: '300px',
                            margin: '0 auto', // Center the chart within the container
                        }}
                    >
                        <Doughnut data={chartData} />
                    </Box>
                </Container>
            )}
        </Box>
    );
};

export default Dashboard;
