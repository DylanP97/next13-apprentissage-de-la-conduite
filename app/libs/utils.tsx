// lib/utils.ts
import view from "@/public/icons/view.png";
import hidden from "@/public/icons/hidden.png";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const options: object = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};


export const dateParser = (num: any) => {
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.toString();
};

export const timestampParser = (num: any) => {
  let date = new Date(num).toLocaleDateString("fr-FR", options);
  return date.toString();
};

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const getSubscriptionLabel = (subcriptionPlan: number) => {
  switch (subcriptionPlan) {
    case 1:
      return "Abonnement 1 mois";
    case 2:
      return "Abonnement 3 mois";
    case 3:
      return "Abonnement 6 mois";
    case 4:
      return "Abonnement gratuit";
    default:
      return "N'a pas souscrit à un abonnement";
  }
};

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["link", "image", "video", "blockquote"],
  ["clean"],
];

export const showPassword = (
  e: any,
  typePasswordInput: string,
  setTypePasswordInput: (value: string) => void
) => {
  var eyeIcon = e.target;

  var eyeParent = eyeIcon.parentElement;
  var inputGroup = eyeParent.parentElement;
  var floatingDiv = inputGroup.firstChild;
  var passwordInput = floatingDiv.firstChild;

  if (typePasswordInput === "text") {
    setTypePasswordInput("password");
    eyeIcon.srcset = view.src;
  } else if (typePasswordInput === "password") {
    setTypePasswordInput("text");
    eyeIcon.srcset = hidden.src;
  }
};

// Cette fonction prend une date au format ISO 8601 (2023-08-14T05:21:11.076Z) et la formate en français.
export const formatRelativeDate = (isoDate: string): string => {
  const currentDate = new Date();
  const commentDate = new Date(isoDate);
  const timeDifference = currentDate.getTime() - commentDate.getTime();

  // Calculer les écarts en secondes, minutes, heures, jours, mois, années
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `Il y a ${years} ${years === 1 ? "an" : "ans"}`;
  } else if (months > 0) {
    return `Il y a ${months} ${months === 1 ? "mois" : "mois"}`;
  } else if (days > 0) {
    return `Il y a ${days} ${days === 1 ? "jour" : "jours"}`;
  } else if (hours > 0) {
    return `Il y a ${hours} ${hours === 1 ? "heure" : "heures"}`;
  } else if (minutes > 0) {
    return `Il y a ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  } else {
    return `Il y a quelques secondes`;
  }
};

// Utilisation dans votre composant Comment
// Remplacez {createdAt} par {formatRelativeDate(createdAt)}
