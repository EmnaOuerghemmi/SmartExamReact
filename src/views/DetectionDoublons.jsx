import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetectionDoublons = ({ examenId }) => {
    const [doublons, setDoublons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Faire la requête pour récupérer les doublons
        axios.get(`/api/affectations/doublons/${examenId}`)
            .then(response => {
                setDoublons(response.data);
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
        <div>
            <h1>Doublons pour l'examen {examenId}</h1>
            {doublons.length === 0 ? (
                <p>Aucun doublon trouvé.</p>
            ) : (
                <ul>
                    {doublons.map((affectation, index) => (
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

export default DetectionDoublons;
