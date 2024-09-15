import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AffectationEtudiants = ({ examenId }) => {
    const [affectations, setAffectations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Récupérer toutes les affectations pour un examen donné
        axios.get(`/`)
            .then(response => {
                setAffectations(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [examenId]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div  style={{ padding: '20px', marginTop: '50px' }}>
            <h1>Affectations des étudiants pour l'examen {examenId}</h1>
            {affectations.length === 0 ? (
                <p>Aucune affectation trouvée.</p>
            ) : (
                <ul>
                    {affectations.map((affectation, index) => (
                        <li key={index}>
                            Étudiant: {affectation.etudiant.nom} - 
                            Email: {affectation.etudiant.email} - 
                            Salle: {affectation.salle?.nom || "Non assignée"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AffectationEtudiants;
