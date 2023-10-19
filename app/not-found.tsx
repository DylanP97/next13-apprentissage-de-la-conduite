"use client";

import { Button } from "react-bootstrap";
import carcrash from "@/public/images/carcrash.png";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="page-404">
      <h1>Erreur 404: Désolé mais cette page n&apos;existe pas !</h1>
      <br />
      <Image src={carcrash} alt="" />
      <br />
      <p>
        Veuillez vérifiez que l&apos;url de la page que vous souhaitez atteindre
        est correcte
      </p>
      <br />
      <Link
      className="btn btn-10color"
        href="/"
      >
        Retourner à l&apos;accueil
      </Link>
    </div>
  );
};

export default Custom404;
