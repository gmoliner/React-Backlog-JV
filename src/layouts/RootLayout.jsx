import React from 'react'
import { Outlet } from 'react-router-dom'
import { BacklogProvider } from '../providers/BacklogProvider'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AuthProvider } from '../providers/AuthProvider'

import { ToastContainer } from "react-toastify";

import logo from '../assets/video-game.png'
import SearchForm from '../components/SearchForm'
import UserMenu from '../components/UserMenu'

export default function RootLayout() {
  return (
      <AuthProvider>
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
         <Navbar bg="dark" variant="dark" id="navbar" expand="lg" className="d-flex justify-content-center">
           <Container >
            <Navbar.Brand href="#home" >
              <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '} Ludothèque
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto my-2 my-lg-0">
                  <LinkContainer to="/">
                    <Nav.Link href="#home">Accueil</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/backlog">
                    <Nav.Link href="#backlog">Mon backlog</Nav.Link>
                  </LinkContainer>
              </Nav>
              <Nav style={{ maxHeight: '50px' }}>
                <SearchForm />  
                <UserMenu />
              </Nav>
            </Navbar.Collapse>
          </Container>
         </Navbar>
         <Container className="p-3">
           <Container className="p-5 mb-4 bg-light rounded-3">
               <BacklogProvider>
              <Outlet />
               </BacklogProvider>
           </Container>
         </Container>
      </AuthProvider>
  )
}
