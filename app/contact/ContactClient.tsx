"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Link from "next/link";
import { FloatingLabel } from "react-bootstrap";

interface ContactClientProps {
  currentUser?: {
    firstName?: string;
    name?: string;
    email?: string;
  } | null;
}

const ContactClient: React.FC<ContactClientProps> = ({ currentUser }) => {
  const [firstName, setFirstName] = useState(
    currentUser?.firstName || currentUser?.name || "",
  );
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleSend = async () => {
    if (!firstName || !email || !message) {
      setInfoMessage("Merci de remplir votre nom, email et message.");
      return;
    }

    const data = { firstName, email, message };
    axios
      .post(`/api/contact`, { data })
      .then(() => {
        setInfoMessage(
          "Votre message a bien été envoyé! Vous pouvez retourner à la page d'accueil",
        );
        setMessage("");
      })
      .catch((err) => {
        console.log(err.message);
        setInfoMessage(err.message);
      });
  };

  return (
    <div className="home-container">
      <Row>
        <Col md="12" xl="12">
          <h1>Contact</h1>
          <div>
            <Form.Group className="mb-3">
              <FloatingLabel label="Votre nom">
                <Form.Control
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre nom"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Votre email">
                <Form.Control
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Le Contenu de Votre Demande" className="mb-3">
                <Form.Control
                  id="message"
                  as="textarea"
                  rows={3}
                  value={message}
                  onInput={(e: any) => {
                    e.preventDefault();
                    setMessage(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Text className="errorzone" />
            <button
              onClick={handleSend}
              className="btn btn-10color"
              type="submit"
              id="checkout_btn"
            >
              Envoyé ma demande de contact
            </button>
            <Link className="btn btn-30color" href="/">
              Revenir à la page d&apos;accueil
            </Link>
            <p style={{ paddingTop: "10px", minHeight: "50px" }}>
              {infoMessage}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactClient;
