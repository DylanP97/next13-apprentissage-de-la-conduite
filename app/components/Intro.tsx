"use client";

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
          parcours d&apos;apprentissage de la conduite automobile.
        </p>
        <br />
        <div className="intro-buttons">
          <button className="btn-primary btn-10color" onClick={() => {
              window.location.assign(`/connexion`);
            }}>
            Inscription / Connexion
          </button>
        </div>
      </div>
      <div className="intro-photo">
        <Image src={photo1} alt="" />
      </div>
    </div>
  );
}

export default Intro;
