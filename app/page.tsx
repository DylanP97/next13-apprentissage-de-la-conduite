import getBlogs from '@/app/actions/getBlogs';
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Intro from './components/Intro';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

export default async function Home() {
  const blogs = await getBlogs();
  const currentUser = await getCurrentUser();

  if (!currentUser) return (
    <ClientOnly>
      <Intro />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
      <HomePage blogs={blogs} currentUser={currentUser} />
    </ClientOnly>
  )
}
