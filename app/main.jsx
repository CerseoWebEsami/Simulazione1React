/**
 * main.jsx - Entry point dell'applicazione React
 *
 * Qui l'app viene "montata" nel <div id="root"> di index.html.
 * Usiamo React.StrictMode per evidenziare eventuali problemi di codice (warning).
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './App.css';
import App from './App.jsx';

const root = document.querySelector('#root');
if (!root) {
  throw Error('Elemento root non trovato. Assicurati che index.html contenga id="root"');
}

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
