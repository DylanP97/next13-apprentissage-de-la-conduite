import getCurrentUser from "@/app/actions/getCurrentUser";
import ResetPasswordClient from "./ResetPasswordClient";
import ClientOnly from "../../components/ClientOnly";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <ResetPasswordClient />
      </ClientOnly>
    );

  if (currentUser) {
    redirect("/");
  }
}
