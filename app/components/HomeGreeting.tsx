"use client";

import { User } from "@prisma/client";

interface HomeGreetingProps {
  currentUser?: User | null;
}

const HomeGreetings: React.FC<HomeGreetingProps> = ({ currentUser }) => {
  return (
    <div className="space-y-2">
      {currentUser ? (
        <p className="font-bold text-lg md:text-xl">
          Salut{" "}
          {currentUser.firstName ? currentUser.firstName : currentUser.name} vous êtes bien connecté.
        </p>
      ) : (
        <p className="font-bold text-sm md:text-base">Bienvenue ! Connectez-vous pour commenter ou sauvegarder vos résultats.</p>
      )}
      <p className="italic text-xs md:text-sm">
        Découvrez nos derniers articles sur le code de la route.
      </p>
    </div>
  );
};

export default HomeGreetings;