import getCurrentUser from "@/app/actions/getCurrentUser";
import ForgotPasswordClient from "./ForgotPasswordClient";
import ClientOnly from "../components/ClientOnly";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <ForgotPasswordClient />
      </ClientOnly>
    );

  if (currentUser) {
    redirect("/");
  }
}
