import getCurrentUser from "@/app/actions/getCurrentUser";
import ElevesAdminClient from "./ElevesAdminClient";
import ClientOnly from "../components/ClientOnly";
import { redirect } from "next/navigation";
import getUsers from "../actions/getUsers";
import NavBar from "../components/NavBar";

export default async function ElevesAdminPage() {
  const currentUser = await getCurrentUser();
  const users = await getUsers();

  if (!currentUser) {
    redirect("/");
  }

  if (!currentUser?.isAdmin) {
    redirect("/");
  }

  return (
    <ClientOnly>
      <NavBar
        isSubscribed={currentUser.isSubscribed}
        isAdmin={currentUser.isAdmin}
        userId={currentUser.id}
      />
      {users ? (
        <ElevesAdminClient users={users} />
      ) : (
        <h1>Il n&apos;y a pas d&apos;article pour le moment!</h1>
      )}
    </ClientOnly>
  );
}
