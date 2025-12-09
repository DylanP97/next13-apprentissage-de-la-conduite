"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/app/components/Loader";

export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show loader if loading takes longer than 300ms
    const timeout = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null; // Prevent flash

  return <Loader />;
}
