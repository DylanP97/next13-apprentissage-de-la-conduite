'use client'

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Button } from 'react-bootstrap';
import photo1 from '@/public/images/conduite.jpeg'
import car from '@/public/images/car.png'
import Image from 'next/image';

function Intro() {
    return (
        <div className='intro'>
            <Col className='intro-text' md="6" xl="6">
                <h3 style={{ marginBottom: "20px" }}>Bienvenue sur Apprentissage de la Conduite et de la Sécurité Routière</h3>
                <p>Bonjour je m’appelle Alexandre, je suis moniteur enseignant à la conduite depuis 5 ans.
                    Je propose un contenu exclusif pour vous aider à réussir votre conduite avec des articles, des conseils pour l’examen, des animations, des quiz et des vidéos en situation réél.</p>
                <br />
                <div className='intro-buttons'>
                    <Button className='btn-30color' href="/inscription" type="submit">Inscription</Button>
                    <Button className='btn-10color' href="/connexion" type="submit">Connexion</Button>
                </div>
            </Col>
            <Col className='intro-photo' md="6" xl="6">
                <Image
                    src={photo1} alt=''
                />
            </Col>
        </div>
    )
}

export default Intro