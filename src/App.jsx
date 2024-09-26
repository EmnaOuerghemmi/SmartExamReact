import React, { useState } from 'react'; // Ajout du useState
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
import AddNote from './views/AddNote';
import ModifierEtudiant from './views/ModifierEtudiant.jsx';
import ClasseAdd from './views/ClasseAdd.jsx';
import Salles from './views/Salles.jsx';
import AjouterSalle from './views/AjouterSalle.jsx';
import AddExamen from './views/AddExamen.jsx';
function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true); // Ajout du hook useState pour contrôler la sidebar

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Inverse la visibilité de la sidebar
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        {/* Passer toggleSidebar à AppBar pour gérer l'affichage de la sidebar */}
        <AppBar onMenuClick={toggleSidebar} sidebarVisible={sidebarVisible} /> {/* Passe sidebarVisible en prop */}
        
        {/* Sidebar visible ou cachée */}
        {sidebarVisible && <Sidebar />}
        
        {/* Contenu principal */}
        <div style={{ marginLeft: sidebarVisible ? '250px' : '0', padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<h1>Bienvenue dans le Dashboard Admin</h1>} />
            <Route path="/etudiant/alletudiant" element={<Etudiant />} />
            <Route path="/etudiant/add/:id?" element={<EtudiantAdd />} />
            <Route path='/classes' element={<Classe />} />
            <Route path="/etudiants/modifier/:id" element={<ModifierEtudiant />} />
            <Route path='/ajouter-classe' element={<ClasseAdd />} />
            <Route path='/examens' element={<Examen />} />
            <Route path="/examens/:id/affectations" element={<Affectations />} />
            <Route path='/note/allnote' element={<AllNotes />} />
            <Route path='/notes/anomalies' element={<Anomalies />} />
            <Route path='/examens/:id/create-affectation' element={<AddAffectation />} />
            <Route path="/etudiants/:classeId" element={<EtudiantClasse />} />
            <Route path="/student-notes/:studentId" element={<StudentNotes />} />
            <Route path="/modules/:id" element={<Module />} />
            <Route path="/examens/module/:moduleId" element={<ExamenModule />} />
            <Route path="/addNote" element={<AddNote />} />
            <Route path="/salles" element={<Salles />} />
            <Route path="/ajouterSalle" element={<AjouterSalle />} />
            <Route path="/addExamen" element={<AddExamen/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
