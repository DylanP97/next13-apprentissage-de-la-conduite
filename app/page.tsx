import getBlogs from '@/app/actions/getBlogs';
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Intro from './components/Intro';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Abonnement from './components/Abonnement';
import ThanksForYourApplication from './components/ThanksForYourApplication';

export default async function Home() {
  const blogs = await getBlogs();
  const currentUser = await getCurrentUser();

  if (!currentUser) return (
    <ClientOnly>
      <Intro />
    </ClientOnly>
  )

  if (!currentUser.isAccepted) return (
    <ClientOnly>
      <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
      <ThanksForYourApplication />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
      {
        (currentUser.isSubscribed || currentUser.isAdmin) ? (
          <HomePage blogs={blogs} currentUser={currentUser} />
        ) : (
          <Abonnement userId={currentUser.id} />
        )
      }
    </ClientOnly>
  )
}
