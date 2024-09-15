import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/Admin/Appbar';
import Sidebar from './components/Admin/Sidebar';
import AffectationEtudiants from './views/AffectationEtudiants';
import Etudiant from './views/Etudiants';
import EtudiantAdd from './views/EtudiantAdd';
import EtudiantClasse from './views/EtudiantClasse';
import Classe from './views/Classe';
import Examen from './views/Examen';
import Module from './views/Module';
import Affectations from './views/Affectations.jsx';
import Dashboard from './components/Admin/Dashboard';
import ExamenModule from './views/ExamenModule.jsx';
import AddAffectation from './views/AddAffectation.jsx';
import AllNotes from './views/AllNotes.jsx';
import StudentNotes from './views/StudentNotes.jsx';
import Anomalies from './views/Anomalies.jsx';
import AddNote from './views/AddNote'; // Assurez-vous que le chemin est correct
import ModifierEtudiant from './views/ModifierEtudiant.jsx';
import ClasseAdd from './views/ClasseAdd.jsx';
import Salles from './views/Salles.jsx';
import AjouterSalle from './views/AjouterSalle.jsx';
function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
          <AppBar/>
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<h1>Bienvenue dans le Dashboard Admin</h1>} />
            <Route path="/etudiant/alletudiant" element={<Etudiant />} /> 
            <Route path="/etudiant/add/:id?" element={<EtudiantAdd />} />
            <Route path='/classes' element={<Classe/>}/>
            <Route path="/etudiants/modifier/:id" element={<ModifierEtudiant />} />
            <Route path='/ajouter-classe' element={<ClasseAdd/>}/> 
           <Route path='/examens' element={<Examen/>}/>
            <Route path="/examens/:id/affectations" element={<Affectations />} />
            <Route path='/note/allnote' element={<AllNotes/>}/>
            <Route path='/notes/anomalies' element={<Anomalies/>}/>
            <Route path='/examens/:id/create-affectation' element={<AddAffectation/>}/>
            <Route path="/etudiants/:classeId" element={<EtudiantClasse />} />
            <Route path="/student-notes/:studentId" element={<StudentNotes />} />
            <Route path="/modules/:id" element={<Module />} />
            <Route path="/examens/module/:moduleId" element={<ExamenModule />} /> {/* Route pour les examens par ID de module */}
            <Route path="/addNote" element={<AddNote />} />
            <Route path="/salles" element={<Salles />} />
            <Route path="/ajouterSalle" element={<AjouterSalle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
