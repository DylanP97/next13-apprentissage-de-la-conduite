'use client'

import axios from 'axios'
import React from 'react'
import { Button, Col } from 'react-bootstrap'
// import { getAccessToken } from '@/app/libs/utils'

const Abonnement = ({ userId }: { userId: any }) => {

    const handleClick = async (itemNumber: number) => {
        // const token = await getAccessToken();

        fetch(`${process.env.REACT_APP_API_URL}api/stripe/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                items: [
                    { id: itemNumber, quantity: 1 },
                ],
                id: userId,
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
            console.log(url)
        }).catch(e => {
            console.error(e.error)
        })
    }

    const logout = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/logout`,
          withCredentials: true,
        })
          .then((res: any) => console.log(res.cookie))
          .catch((err) => console.log(err));
        
        window.location.assign("/");
      };

    return (
        <Col className="sign-text" md="12" xl="12">
            <p style={{fontSize: '26px', fontWeight: '600'}}>Vous êtes bien connecté.</p>
            <p style={{fontSize: '26px', fontWeight: '600'}}>Pour accèder au contenu du blog vous devez vous abonnez.</p>
            <p>Sélectionner l&apos;abonnement de votre choix ci-dessous.</p>
            <hr />
            <section className="plans">
                <div className="plan">
                    <h2 className="plan-title">Abonnement 1 Mois</h2>
                    <div className="plan-price">9.99€/mois</div>
                    <ul className="plan-features">
                        <li>Accès illimité aux articles et vidéos</li>
                        <li>Conseils personnalisés de nos experts</li>
                        <li>Support prioritaire</li>
                    </ul>
                    <br />
                    <Button onClick={() => { handleClick(1) }} className="plan-btn">S&apos;abonner </Button>
                </div>
                <div className="plan">
                    <h2 className="plan-title">Abonnement 3 Mois</h2>
                    <div className="plan-price">24.99€/trois mois</div>
                    <ul className="plan-features">
                        <li>Accès illimité aux articles et vidéos</li>
                        <li>Conseils personnalisés de nos experts</li>
                        <li>Support prioritaire</li>
                    </ul>
                    <br />
                    <Button onClick={() => { handleClick(2) }} className="plan-btn">S&apos;abonner </Button>
                </div>
                <div className="plan">
                    <h2 className="plan-title">Abonnement 6 Mois</h2>
                    <div className="plan-price">39.99€/six mois</div>
                    <ul className="plan-features">
                        <li>Accès illimité aux articles et vidéos</li>
                        <li>Conseils personnalisés de nos experts</li>
                        <li>Support prioritaire</li>
                    </ul>
                    <br />
                    <Button onClick={() => { handleClick(3) }} className="plan-btn">S&apos;abonner </Button>
                </div>
            </section>
            <hr />
            <Button
                className="btn-30color"
                onClick={logout}
            >
                Retour à la page de connexion
            </Button>
        </Col>

    )
}

export default Abonnement
