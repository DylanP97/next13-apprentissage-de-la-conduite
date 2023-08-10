import getCurrentUser from "@/app/actions/getCurrentUser";
import InscriptionClient from "./InscriptionClient";
import ClientOnly from "../components/ClientOnly";
import { redirect } from "next/navigation";

export default async function InscriptionPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <ClientOnly>
            <InscriptionClient />
        </ClientOnly>
    )

    if (currentUser) {
        redirect("/");
    }
}