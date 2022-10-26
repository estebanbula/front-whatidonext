import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SaveState, States } from './components/States';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <States />
    <SaveState />
  </React.StrictMode>
);