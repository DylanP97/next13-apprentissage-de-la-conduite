"use client";

import { Button } from "react-bootstrap";
import photo1 from "@/public/images/conduite.jpeg";
import Image from "next/image";

function Intro() {
  return (
    <div className="intro sign">
      <div className="intro-text">
        <h1 style={{ marginBottom: "20px" }}>
          Bienvenue sur Apprentissage de la Conduite et de la Sécurité Routière
        </h1>
        <p>
          Apprentissage de la Conduite et de la Sécurité Routière est une
          plateforme novatrice dédiée à accompagner les élèves dans leur
          parcours d&apos;apprentissage de la conduite automobile. Des leçons
          interactives permettent aux élèves de renforcer leur compréhension des
          règles de conduite et des bonnes pratiques tout en cultivant une
          sensibilisation accrue à la sécurité sur les routes.
        </p>
        <br />
        <div className="intro-buttons">
          <Button className="btn-10color" href="/connexion" type="submit">
            Inscription / Connexion
          </Button>
        </div>
      </div>
      <div className="intro-photo">
        <Image src={photo1} alt="" />
      </div>
    </div>
  );
}

export default Intro;
