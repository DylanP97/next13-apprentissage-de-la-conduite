import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ContactClient from "./ContactClient"; 
import getCurrentUser from "@/app/actions/getCurrentUser";

const ContactPage = async () => {
  const currentUser = await getCurrentUser();

  // Map null fields to undefined for compatibility with ContactClientProps
  const mappedUser = currentUser
    ? {
        firstName: currentUser.firstName ?? undefined,
        name: currentUser.name ?? undefined,
        email: currentUser.email ?? undefined,
      }
    : null;

  return (
    <ClientOnly>
      <NavBar currentUser={currentUser} />
      <ContactClient currentUser={mappedUser} />
      <Footer />
    </ClientOnly>
  );
};

export default ContactPage;
