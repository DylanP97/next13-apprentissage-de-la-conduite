'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import autoroute from '@/public/images/autoroute.png'
import Image from 'next/image';
import { toast } from "react-hot-toast";

const ForgotPasswordClient = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios.post(`http://localhost:3000/api/user/forgot-password`, { email })
      .then(() => {
        toast.success('Un email de réinitialisation de votre mot de passe vous a été envoyé. Regardez votre boîte email !')
      })
      .catch((error) => {
        toast.error("Il n'y a pas de compte actif avec cet email")
      });
  };

  return (
    <>
      <Col className='intro-text' md="6" xl="6">
        <h2 style={{ marginBottom: '30px' }}>Réinitialiser votre mot de passe</h2>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label='Votre Email'>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <br />
          <div className="intro-buttons">
            <Button className='btn-10color' type="submit">Envoyer un e-mail de réinitialisation du mot de passe</Button>
            <Button className='btn-30color' onClick={() => {
              window.location.href = "/";
            }}>Retourner à l&apos;accueil</Button>
          </div>
          <Form.Text className="notifzone" />
        </Form>
      </Col>
      <Col className='intro-photo' md="6" xl="6">
        <Image src={autoroute} alt='' />
      </Col>
    </>
  );
}

export default ForgotPasswordClient