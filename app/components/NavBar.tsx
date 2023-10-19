"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { memo } from "react";
import { useTheme } from "@/app/providers/ThemeProvider"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarOffcanvas from "react-bootstrap/esm/NavbarOffcanvas";
import ThemeToggler from "./ThemeToggler";

const NavBar = memo(function NavBar({
  isSubscribed,
  isAdmin,
  userId,
}: {
  isSubscribed: boolean;
  isAdmin: boolean;
  userId: string;
}) {
  const router = useRouter();

  const createBlog = () => {
    axios.post(`/api/blog`).then((response) => {
      router.push(`/admin-edition/${response.data.blogId}`);
    });
  };

  const theme = useTheme();

  return (
    <Navbar className={`${theme.isDarkMode ? 'navbar-dark' : ''} navbar`} expand="lg">
      <Container className="navbar-container">
        <Navbar.Brand href="/">
          Apprentissage de la Conduite et de la Sécurité Routière
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar">
            {(isSubscribed || isAdmin) && <Nav.Link href="/">Accueil</Nav.Link>}
            {(isSubscribed || isAdmin) && (
              <Nav.Link href={`/profil/${userId}`}>Profil</Nav.Link>
            )}
            {(isSubscribed || isAdmin) && (
              <Nav.Link href="/quiz">Quiz</Nav.Link>
            )}
            {(isSubscribed || isAdmin) && (
              <Nav.Link href="/contact">Contact</Nav.Link>
            )}
            {isAdmin && (
              <NavDropdown className="nav-dropdown" title="Administrateur">
                <Nav.Link className="nav-dropdown" onClick={createBlog}>
                  Écrire un nouvel article
                </Nav.Link>
                <Nav.Link className="nav-dropdown" href="/admin-articles">
                  Gestion des articles
                </Nav.Link>
                <Nav.Link className="nav-dropdown" href="/admin-eleves">
                  Gestion des élèves
                </Nav.Link>
                <Nav.Link className="nav-dropdown" href="/admin-questions">
                  Gestion des questions
                </Nav.Link>
              </NavDropdown>
            )}
            <Nav.Link onClick={() => signOut()}>Se déconnecter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
