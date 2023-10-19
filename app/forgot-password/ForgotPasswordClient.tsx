"use client";

import React, { useState } from "react";
import axios from "axios";
import { Col, Form, FloatingLabel, Button } from "react-bootstrap";
import autoroute from "@/public/images/autoroute.png";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ForgotPasswordClient = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`/api/user/forgot-password`, { email })
      .then(() => {
        toast.success(
          "Un email de réinitialisation de votre mot de passe vous a été envoyé. Regardez votre boîte email.",
        );
      })
      .catch(() => {
        toast.error("Il n'y a pas de compte actif avec cet email.");
      });
  };

  return (
    <div className="intro sign">
      <div className="intro-text">
        <h2 style={{ marginBottom: "30px" }}>
          Réinitialiser votre mot de passe
        </h2>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Votre Email">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <br />
          <div className="intro-buttons">
            <button className="btn btn-10color" type="submit">
              Envoyer un e-mail de réinitialisation du mot de passe
            </button>
            <button
              className="btn btn-30color"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Retourner à l&apos;accueil
            </button>
          </div>
          <Form.Text className="notifzone" />
        </Form>
      </div>
      <div className="intro-photo">
        <Image src={autoroute} alt="" />
      </div>
    </div>
  );
};

export default ForgotPasswordClient;
