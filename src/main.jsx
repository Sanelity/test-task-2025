import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap';

import App from './App.jsx'

import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Navbar bg="dark" data-bs-theme="dark" style={{width: '100%'}}>
          <Container>
              <Navbar.Brand href="#">Made by Maxim Kraval</Navbar.Brand>
              <Nav>
                  <Nav.Link disabled>Contact: +37120066586 | slaiderx55@gmail.com</Nav.Link>
              </Nav>
          </Container>
      </Navbar>
      <App/>
  </StrictMode>,
)
