import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import { SaveState, States } from './components/States';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Container>
    <Row>
    <Col><States /></Col>
    <Col><SaveState /></Col>
    </Row>
  </Container>
);