import getPublishedBlogs from "@/app/actions/getPublishedBlogs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

export default async function Home() {
  const blogs = await getPublishedBlogs();
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <HomePage blogs={blogs} currentUser={currentUser} />
      <Footer />
    </ClientOnly>
  );
}
