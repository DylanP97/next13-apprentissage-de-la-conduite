import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ContactClient from "./ContactClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ContactPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <NavBar currentUser={currentUser} />
      <ContactClient currentUser={currentUser} />
      <Footer />
    </ClientOnly>
  );
};

export default ContactPage;
