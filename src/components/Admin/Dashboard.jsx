import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState([]);                                                                             

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8083/smartExam/classes/statistics');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
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
        </Box>
    );
};

export default Dashboard;
