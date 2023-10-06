import getPublishedBlogs from "@/app/actions/getPublishedBlogs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Intro from "./components/Intro";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Subscription from "./components/Subscription";
import ThanksForYourApplication from "./components/ThanksForYourApplication";
import Footer from "./components/Footer";

export default async function Home() {
  const blogs = await getPublishedBlogs();
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <Intro />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <NavBar
        isSubscribed={currentUser.isSubscribed}
        isAdmin={currentUser.isAdmin}
        userId={currentUser.id}
      />
      {!currentUser.isAccepted && !currentUser.isAdmin ? (
        <ThanksForYourApplication />
      ) : currentUser.isSubscribed || currentUser.isAdmin ? (
        <HomePage blogs={blogs} currentUser={currentUser} />
      ) : (
        <Subscription currentUser={currentUser} />
      )}
      <Footer />
    </ClientOnly>
  );
}
