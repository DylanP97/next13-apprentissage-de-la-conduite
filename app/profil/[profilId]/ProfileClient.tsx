"use client";

import { signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { getSubscriptionLabel } from "@/app/libs/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
  currentUser: any;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const router = useRouter();

  const cancelSubscription = async (userId: any) => {
    const data = {
      subscriptionPlan: 0,
      isSubscribed: false,
    };

    axios
      .put(`/api/user/${userId}`, { data })
      .then(() => {
        router.push("/");
        toast.success("Annulation de votre abonnement bien prise en compte !");
      })
      .catch(() => {
        toast.error("Il y a eu une erreur lors de la modification du profil.");
      })
      .finally(() => {
        signOut();
      });
  };

  const handleDelete = async (userId: number | string) => {
    axios
      .delete(`/api/user/${userId}`)
      .then(() => {
        toast.success("Votre compte vient d'être supprimé.");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Il y a eu une erreur.");
      });
  };

  return (
    <section className="home-container">
      <h1>
        {currentUser?.firstName ? currentUser?.firstName : currentUser?.name}
      </h1>
      <br />
      <p>Votre adresse email : {currentUser?.email}</p>
      {!currentUser?.isAdmin ? (
        <div>
          <h2>Votre abonnement</h2>
          <br />
          <p>
            {currentUser?.isSubscribed
              ? "Forfait actuel : " +
                getSubscriptionLabel(currentUser?.subscriptionPlan)
              : null}
          </p>
          <br />
          <button
            className="btn btn-30color"
            onClick={() => cancelSubscription(currentUser?.id)}
          >
            Suspendre mon abonnement
          </button>
          <br />
        </div>
      ) : (
        <p>
          Vous avez un rôle administrateur. Vous pouvez créer, modifier,
          supprimer des articles et également gérer les utilisateurs.
        </p>
      )}
      <hr />
      <button
        onClick={() => handleDelete(currentUser?.id)}
        className="btn btn-30color"
      >
        Supprimer mon compte
      </button>
    </section>
  );
};

export default ProfileClient;
