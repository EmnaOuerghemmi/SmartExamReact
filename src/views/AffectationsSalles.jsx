import React, { useState, useEffect } from 'react';

const AffectationsSalles = () => {
    const [affectations, setAffectations] = useState([]);

    useEffect(() => {
        fetch('/affectations')
            .then(response => response.json())
            .then(data => setAffectations(data));
    }, []);

    return (
        <div  style={{ padding: '20px', marginTop: '50px' }}>
            {affectations.map((salle, index) => (
                <div key={index}>
                    <h3>Salle: {salle.salleNom}</h3>
                    <ul>
                        {salle.affectations.map((affectation, idx) => (
                            <li key={idx}>
                                Étudiant: {affectation.etudiantNom} - Examen: {affectation.examenNom}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AffectationsSalle;
