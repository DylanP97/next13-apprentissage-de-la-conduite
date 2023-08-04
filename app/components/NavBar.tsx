'use client'

import { signOut } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ isSubscribed, isAdmin, userId }: { isSubscribed: any, isAdmin: any, userId: any }) {

    return (
        <Navbar className='navbar navbar-dark' expand="lg">
            <Container className='navbar-container'>
                <Navbar.Brand href="/">Apprentissage de la Conduite et de la Sécurité Routière</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navbar">
                        {
                            (isSubscribed || isAdmin) && <Nav.Link href="/">Accueil</Nav.Link>
                        }
                        {
                            (isSubscribed || isAdmin) && <Nav.Link href={`/profil/${userId}`}>Mon profil</Nav.Link>
                        }
                        {
                            (isSubscribed || isAdmin) && <Nav.Link href="/quiz">Quiz conduite</Nav.Link>
                        }
                        {
                            (isSubscribed || isAdmin) && <Nav.Link href="/contact">Contact</Nav.Link>
                        }
                        {
                            isAdmin && (
                                <>
                                    <Nav.Link href="/article-admin">Gestion des articles</Nav.Link>
                                    <Nav.Link href="/eleves-admin">Gestion des élèves</Nav.Link>
                                    <Nav.Link href="/quiz-admin">Gestion des questions</Nav.Link>
                                </>
                            )
                        }
                        <Nav.Link onClick={() => signOut()}>Se déconnecter</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar