"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { memo, useState } from "react";
import ConnexionModal from "./ConnexionModal";
import getCurrentUser from "../actions/getCurrentUser";

const NavBar = memo(function NavBar({
  currentUser,
}: {
  currentUser?: {
    id: string;
    isSubscribed: boolean;
    isAdmin: boolean;
  } | null;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const createBlog = () => {
    axios.post("/api/blog").then((response) => {
      router.push(`/admin-edition/${response.data.blogId}`);
    });
  };

  const isLoggedIn = Boolean(currentUser);
  const isAdmin = Boolean(currentUser?.isAdmin);

  return (
    <>
      <Navbar
        expand="lg"
        className="border-b border-white/20 bg-[#030213]/95 backdrop-blur-lg sticky top-0 z-40"
      >
        <Container className="max-w-7xl mx-auto px-4 md:py-3 lg:px-8">
          {/* Logo */}
          <Navbar.Brand href="/" className="flex items-center">
            <div className="flex flex-col leading-none">
              <span className="hidden md:block text-xl lg:text-2xl font-bold text-white tracking-tight">
                Apprentissage de la Conduite
              </span>
              <span className="md:hidden text-2xl font-bold text-white">
                Blog & Quiz Code
              </span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar"
            className="border-0 focus:outline-none"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Navbar.Toggle>

          <Navbar.Collapse id="main-navbr">
            <Nav className="ms-auto items-center gap-2 md:gap-4 text-sm lg:text-base">
              <Nav.Link href="/quiz" className="text-white text-center font-medium transition rounded-full">
                Quiz Connaissances Code & Conduite
              </Nav.Link>
              <Nav.Link href="/contact" className="text-white font-medium transition rounded-full">
                Contact
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link href={`/profil/${currentUser?.id}`} className="text-white font-medium transition rounded-full">
                  Profil
                </Nav.Link>
              )}

              {isAdmin && (
                <NavDropdown title={<span className="text-white font-medium">Admin</span>} align="end">
                  <NavDropdown.Item onClick={createBlog} className="text-gray-300 hover:bg-[#91e5f6] hover:text-gray-700">
                    Écrire un article
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-articles" className="text-gray-300 hover:bg-[#91e5f6] hover:text-gray-700">
                    Gestion articles
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-eleves" className="text-gray-300 hover:bg-[#91e5f6] hover:text-gray-700">
                    Gestion élèves
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-questions" className="text-gray-300 hover:bg-[#91e5f6] hover:text-gray-700">
                    Gestion questions
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Bouton Connexion / Déconnexion */}
              {isLoggedIn ? (
                <Nav.Link className="text-white font-medium transition rounded-full">
                  <button onClick={() => signOut()}>
                    Déconnexion
                  </button>
                </Nav.Link>
              ) : (
                <Nav.Link className="text-white font-medium transition rounded-full">
                  <button onClick={() => setModalOpen(true)}>
                    Connexion
                  </button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal intégré dans le NavBar → z-index parfait */}
      <ConnexionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
});

export default NavBar;