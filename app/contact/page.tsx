import { redirect } from "next/navigation";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ContactClient from "./ContactClient";
import getCurrentUser from '@/app/actions/getCurrentUser';

const ContactPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  if (!currentUser.isAdmin) {
    if (!currentUser?.isAccepted) {
      if (!currentUser?.isSubscribed) {
        redirect("/");
      } else {
        return (
          <ClientOnly>
            <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
            <ContactClient currentUser={currentUser} />
            <Footer />
          </ClientOnly>
        );
      }
    }
  } else {
    return (
      <ClientOnly>
        <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
        <ContactClient currentUser={currentUser} />
        <Footer />
      </ClientOnly>
    )
  }
}

export default ContactPage;