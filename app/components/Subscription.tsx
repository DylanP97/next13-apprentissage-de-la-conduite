'use client'

import { useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import PlanCard from './PlanCard';

const Subscription = ({ currentUser }: { currentUser: any }) => {

    useEffect(() => {
        if (currentUser.isSubscribed) console.log("isSubscribeeed")
    })

    return (
        <Col className="sign-text" md="12" xl="12">
            <p style={{ fontSize: '26px', fontWeight: '600' }}>Votre compte a bien été validé.</p>
            <p style={{ fontSize: '26px', fontWeight: '600' }}>Choisissez un forfait, pour accèder au contenu du blog.</p>
            <p>Sélectionner l&apos;abonnement de votre choix ci-dessous.</p>
            <hr />
            <section className="plans">
                <PlanCard
                    label='Abonnement 1 Mois'
                    priceLabel={"9.99€"}
                    planId={1}
                    features={['Accès illimité aux articles et vidéos', 'Conseils personnalisés de nos experts', 'Support prioritaire']}
                    userId={currentUser.id}
                />
                <PlanCard
                    label='Abonnement 3 Mois'
                    priceLabel={"24.99€"}
                    planId={2}
                    features={['Accès illimité aux articles et vidéos', 'Conseils personnalisés de nos experts', 'Support prioritaire']}
                    userId={currentUser.id}
                />
                <PlanCard
                    label='Abonnement 6 Mois'
                    priceLabel={"39.99€"}
                    planId={3}
                    features={['Accès illimité aux articles et vidéos', 'Conseils personnalisés de nos experts', 'Support prioritaire']}
                    userId={currentUser.id}
                />
            </section>
        </Col>

    )
}

export default Subscription
