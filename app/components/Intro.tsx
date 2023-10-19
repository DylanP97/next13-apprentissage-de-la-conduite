"use client";

import { Button } from "react-bootstrap";
import photo1 from "@/public/images/conduite.jpeg";
import Image from "next/image";
import { Model } from "./Pols_gtr";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
          <Button className="btn-10color" href="/connexion" type="submit">
            Inscription / Connexion
          </Button>
        </div>
      </div>
      <div className="intro-photo">
        {/* <Image src={photo1} alt="" /> */}
        <Canvas
          camera={{ position: [10, 10, 10], fov: 100 }}
          style={{
            backgroundColor: '#1d1d29',
            width: '100%',
            height: '100vh',
          }}
        >
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default Intro;
