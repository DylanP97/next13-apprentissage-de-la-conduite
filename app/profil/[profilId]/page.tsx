import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import ClientOnly from "../../components/ClientOnly";
import { redirect } from "next/navigation";
import Footer from "@/app/components/Footer";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  if (!currentUser.isAdmin) {
    if (!currentUser?.isAccepted || !currentUser?.isSubscribed) {
      redirect("/");
    } else {
      return (
        <ClientOnly>
          <ProfileClient currentUser={currentUser} />
          <Footer />
        </ClientOnly>
      );
    }
  } else {
    return (
      <ClientOnly>
        <ProfileClient currentUser={currentUser} />
        <Footer />
      </ClientOnly>
    );
  }
}
