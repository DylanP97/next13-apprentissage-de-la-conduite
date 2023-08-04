export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/abonnement",
    "/article",
    "/article-admin",
    "/contact",
    "/edition-article",
    "/eleves-admin",
    "/profil",
    "/quiz",
    "/quiz-admin",
  ]
};
