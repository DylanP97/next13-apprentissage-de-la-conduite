import ElevesAdminClient from "./ElevesAdminClient";
import ClientOnly from "../components/ClientOnly";
import getUsers from "../actions/getUsers";
import Footer from "../components/Footer";

export default async function ElevesAdminPage() {
  const users = await getUsers();

  return (
    <ClientOnly>
      {users ? (
        <ElevesAdminClient users={users} />

      ) : (
        <h1>Il n&apos;y a pas d&apos;article pour le moment!</h1>
      )}
      <Footer />
    </ClientOnly>
  );
}
