"use client";

import { useRouter } from "next/navigation";
import ConnexionModal from "./ConnexionModal";

const ConnexionMain = () => {
  const router = useRouter();

  return (
    <ConnexionModal isOpen={true} onClose={() => router.push("/")} />
  );
};

export default ConnexionMain;
