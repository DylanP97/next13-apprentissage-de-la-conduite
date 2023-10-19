"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

interface ContactClientProps {
  currentUser: any;
}

const ContactClient: React.FC<ContactClientProps> = ({ currentUser }) => {
  const firstName = currentUser?.firstName
    ? currentUser?.firstName
    : currentUser?.name;
  const email = currentUser?.email;
  const [message, setMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleSend = async () => {
    if (message.length === 0 || !message)
      setInfoMessage("Il n'y a pas de contenu dans votre message");
    else {
      const data = { firstName, email, message };
      axios
        .post(`/api/contact`, { data })
        .then(() => {
          setInfoMessage(
            "Votre message a bien été envoyé! Vous pouvez retourner à la page d'accueil",
          );
        })
        .catch((err) => {
          console.log(err.message);
          setInfoMessage(err.message);
        });
    }
  };

  return (
    <div className="home-container">
      <Row>
        <Col md="12" xl="12">
          <h1>Contact</h1>
          <div>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                id="message"
                as="textarea"
                rows={3}
                onInput={(e: any) => {
                  e.preventDefault();
                  console.log(e.target.value);
                }}
              />
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
            <p style={{ paddingTop: "10px", minHeight: "50px" }}>
              {infoMessage}
            </p>
            <hr />
            <a href="/">
              Revenir à la page d&apos;accueil
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactClient;
