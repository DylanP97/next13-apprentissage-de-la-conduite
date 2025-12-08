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
        <Container className="max-w-7xl mx-auto px-4 py-3 lg:px-8">
          {/* Logo */}
          <Navbar.Brand href="/" className="flex items-center">
            <div className="flex flex-col leading-none">
              <span className="hidden md:block text-xl lg:text-2xl font-bold text-white tracking-tight">
                Apprentissage de la Conduite
              </span>
              <span className="md:hidden text-2xl font-bold text-white">
                ADC
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

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto items-center gap-4 lg:gap-8 text-sm lg:text-base">
              <Nav.Link href="/quiz" className="text-white hover:text-[#91e5f6] font-medium transition">
                Quiz
              </Nav.Link>
              <Nav.Link href="/contact" className="text-white hover:text-[#91e5f6] font-medium transition">
                Contact
              </Nav.Link>

              {isLoggedIn && (
                <Nav.Link href={`/profil/${currentUser?.id}`} className="text-white hover:text-[#91e5f6] font-medium transition">
                  Profil
                </Nav.Link>
              )}

              {isAdmin && (
                <NavDropdown title={<span className="text-white font-medium">Admin</span>} align="end">
                  <NavDropdown.Item onClick={createBlog} className="text-gray-300 hover:bg-[#91e5f6] hover:text-[#030213]">
                    Écrire un article
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-articles" className="text-gray-300 hover:bg-[#91e5f6] hover:text-[#030213]">
                    Gestion articles
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-eleves" className="text-gray-300 hover:bg-[#91e5f6] hover:text-[#030213]">
                    Gestion élèves
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin-questions" className="text-gray-300 hover:bg-[#91e5f6] hover:text-[#030213]">
                    Gestion questions
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Bouton Connexion / Déconnexion */}
              {isLoggedIn ? (
                <button onClick={() => signOut()} className="text-white hover:text-[#91e5f6] font-medium transition">
                  Déconnexion
                </button>
              ) : (
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-[#030213] font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg"
                >
                  Connexion
                </button>
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