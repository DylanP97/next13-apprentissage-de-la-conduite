'use client'

import { Col, Button } from 'react-bootstrap';
import photo1 from '@/public/images/conduite.jpeg'
import Image from 'next/image';

function Intro() {
    return (
        <div className='intro'>
            <Col className='intro-text'>
                <h1 style={{ marginBottom: "20px" }}>Bienvenue sur Apprentissage de la Conduite et de la Sécurité Routière</h1>
                <p>Apprentissage de la Conduite et de la Sécurité Routière est une plateforme novatrice dédiée à accompagner les élèves dans leur parcours d&apos;apprentissage de la conduite automobile. Des leçons interactives permettent aux élèves de renforcer leur compréhension des règles de conduite et des bonnes pratiques tout en cultivant une sensibilisation accrue à la sécurité sur les routes.</p>
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