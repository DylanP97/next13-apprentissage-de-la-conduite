'use client'

import { signOut } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import { toast } from "react-hot-toast";
import { getSubscriptionLabel } from '@/app/libs/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ProfileClientProps {
  currentUser: any;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const router = useRouter()

  const cancelSubscription = async (userId: any) => {
    try {
      const data = {
        subscriptionPlan: 0,
        isSubscribed: false,
      }

      axios.put(`http://localhost:3000/api/user/${userId}`, { data })
        .then(() => {
          router.push("/");
          toast.success('Annulation de votre abonnement bien prise en compte !')
        })
        .catch(() => {
          toast.error('Il y a eu une erreur lors de la modification du profil.')
        })
        .finally(() => {
          signOut()
        })
    } catch {
      console.log("error")
    }
  }

  return (
    <section className="home-container">
      <h1>Bienvenue sur votre profil {currentUser.firstName}</h1><br />
      <p>Voici vos informations</p>
      <p>{currentUser.firstName} {currentUser.lastName}</p>
      <p>{currentUser.email}</p>
      <br />
      <hr />
      {
        !currentUser.isAdmin ? (
          <div>
            <h2>Votre abonnement</h2><br />
            <p>{currentUser.isSubscribed ? "Forfait actuel : " + getSubscriptionLabel(currentUser.subscriptionPlan) : null}</p>
            <br />
            <Button className='btn-30color' onClick={(() => cancelSubscription(currentUser.id))}>Suspendre mon abonnement</Button><br />
          </div>
        ) : (<p>Vous êtes administrateur. Vous pouvez créer, modifier, supprimer des articles et également gérer les utilisateurs.</p>)
      }
    </section>
  )
}

export default ProfileClient