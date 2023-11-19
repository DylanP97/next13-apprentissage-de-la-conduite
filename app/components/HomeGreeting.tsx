"use client";

import { User } from "@prisma/client";

interface HomeGreetingProps {
  currentUser: User;
}

const HomeGreetings: React.FC<HomeGreetingProps> = ({ currentUser }) => {
  return (
    <div>
      <p>Salut {currentUser.firstName ? currentUser.firstName : currentUser.name} vous êtes bien connecté.</p>
      <h1>
        Découvrez nos derniers articles sur le code de la route.
      </h1>
    </div>
  );
};

export default HomeGreetings;
