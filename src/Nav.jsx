import React from 'react';
import { CNavGroup, CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    component: CNavItem,
    name: 'Etudiants',
    to: '/etudiant/alletudiant',
  },

  {
    component: CNavItem,
    name: 'Classes',
    to: '/classes',
  },
  {
    component: CNavItem,
    name: 'Salle',
    to: '/salles',
  },
  {
    component: CNavItem,
    name: 'Affectation examens',
    to: '/examens',
  },

  {
    component: CNavGroup,
    name: 'Notes',
    to: '/note',
    items: [
      {
        component: CNavItem,
        name: 'Tous les notes',
        to: '/note/allnote',
      },
      {
        component: CNavItem,
        name: 'Les anomalies',
        to: '/notes/anomalies',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Déconnexion',
    to: '/logout',
  },
];

export default _nav;
