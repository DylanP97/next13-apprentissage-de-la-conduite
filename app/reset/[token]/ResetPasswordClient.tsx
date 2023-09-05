'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap';

import zone30 from '@/public/images/zone30.jpg'
import view from '@/public/icons/view.png'
import hidden from '@/public/icons/hidden.png'
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";


const ResetPasswordClient = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  let userToken = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.")
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule et un chiffre.")
    } else {
      if (userToken && userToken.token) {
        axios.post(`/api/user/reset/${userToken.token}`, { password })
          .then(() => {
            toast.success("Votre mot de passe a été modifié avec succès. Vous pouvez désormais vous connectez avec votre nouveau mot de passe.");
            router.push('/connexion')
          })
          .catch((error) => {
            toast.error(error.message)
          });
      }
    }
  };

  const ShowPassword = (e: any) => {
    var eyeIcon = e.target;

    var eyeParent = eyeIcon.parentElement;
    var inputGroup = eyeParent.parentElement;
    var floatingDiv = inputGroup.firstChild;
    var passwordInput = floatingDiv.firstChild;

    if (passwordInput.type === "password") {
      passwordInput.setAttribute("type", "text");
      eyeIcon.src = `${hidden}`;
    } else {
      passwordInput.setAttribute("type", "password");
      eyeIcon.src = `${view}`;
    }
  }

  return (
    <div className='intro sign'>
      <div className='intro-text'>
        <h2 style={{ marginBottom: '30px' }}>Changer votre mot de passe</h2>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FloatingLabel label='Écrivez votre nouveau mot de passe'>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <InputGroup.Text id="basic-addon1">
              <Image onClick={ShowPassword} className="password-eye" src={view} alt="eye" style={{ width: "auto" }} />
            </InputGroup.Text>
          </InputGroup>
          <br />
          <InputGroup>
            <FloatingLabel label='Confirmer votre nouveau mot de passe'>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FloatingLabel>
            <InputGroup.Text id="basic-addon1">
              <Image onClick={ShowPassword} className="password-eye" src={view} alt="eye" style={{ width: "auto" }} />
            </InputGroup.Text>
          </InputGroup>
          <br />
          <div className="intro-buttons">
            <Button className='btn-10color' type="submit">Valider mon nouveau mot de passe</Button>
            <Button className='btn-30color' onClick={() => router.push('/')}>Annuler et retourner à l&apos;accueil</Button>
          </div>
          <Form.Text className="notifzone" />
        </Form>
      </div>
      <div className='intro-photo'>
        <Image src={zone30} alt='' />
      </div>
    </div>
  );
}

export default ResetPasswordClient