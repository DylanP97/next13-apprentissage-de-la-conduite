import view from "@/public/icons/view.png";
import hidden from "@/public/icons/hidden.png";

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


export const showPassword = (e: any, typePasswordInput: string, setTypePasswordInput: any) => {
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