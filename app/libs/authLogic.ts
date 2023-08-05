import getCurrentUser from "@/app/actions/getCurrentUser";

export async function whatAuth(req: any, res: any, next: any) {
  const currentUser = await getCurrentUser();

  let matcherArray;

  if (!currentUser) {
    // user is not logged in
    matcherArray = [
      "/abonnement",
      "/article",
      "/article-admin",
      "/contact",
      "/edition-article",
      "/eleves-admin",
      "/profil",
      "/quiz",
      "/quiz-admin",
    ];
  } else if (!currentUser.isAccepted && !currentUser.isAdmin) {
    // user is logged in but not accepted and he's not an admin
    matcherArray = [
      "/abonnement",
      "/article",
      "/article-admin",
      "/contact",
      "/edition-article",
      "/eleves-admin",
      "/profil",
      "/quiz",
      "/quiz-admin",
    ];
  } else if (
    currentUser.isAccepted &&
    !currentUser.isSubscribed &&
    !currentUser.isAdmin
  ) {
    // user is logged in and accepted but hasn't subscribe a plan and he's not an admin
    matcherArray = [
      "/article",
      "/article-admin",
      "/edition-article",
      "/eleves-admin",
      "/profil",
      "/quiz",
      "/quiz-admin",
    ];
  } else if (
    currentUser.isAccepted &&
    currentUser.isSubscribed &&
    !currentUser.isAdmin
  ) {
    // user is logged in and accepted and has subscribe and he's not an admin
    matcherArray = [
      "/article-admin",
      "/edition-article",
      "/eleves-admin",
      "/quiz-admin",
    ];
  } else if (currentUser.isAdmin) {
    // user is an admin
    matcherArray = [];
  } else {
    next();
  }

  return matcherArray
}
