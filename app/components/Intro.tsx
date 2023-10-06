'use client'

import { Button } from 'react-bootstrap';
import photo1 from '@/public/images/conduite.jpeg'
import Image from 'next/image';

import Link from 'next/link';
import { useState } from 'react';
import CanvasContainer from './CanvasContainer';

function Intro() {

    return (
        <div className='intro sign'>
            <div className='intro-text'>
                <h1 style={{ marginBottom: "20px" }}>Bienvenue sur Apprentissage de la Conduite et de la Sécurité Routière</h1>
                <p>Apprentissage de la Conduite et de la Sécurité Routière est une plateforme novatrice dédiée à accompagner les élèves dans leur parcours d&apos;apprentissage de la conduite automobile.</p>
                <br />
                <div className='intro-buttons'>
                    <Link className='btn btn-10color' href="/connexion">Inscription / Connexion</Link>
                </div>
            </div>
            <div className='intro-photo'>
                <CanvasContainer />
            </div>
        </div>
    )
}

export default Intro