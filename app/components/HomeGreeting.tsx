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
        <p className="font-bold text-sm md:text-base">Bienvenue ! Connectez-vous pour commenter, accéder à des articles premium et sauvegarder vos résultats de quiz.</p>
      )}
    </div>
  );
};

export default HomeGreetings;