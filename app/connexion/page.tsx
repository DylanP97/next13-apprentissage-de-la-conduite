
import getCurrentUser from "@/app/actions/getCurrentUser";
import ConnexionClient from "./ConnexionClient";
import ClientOnly from "../components/ClientOnly";

import { redirect } from "next/navigation";


export default async function ConnexionPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <ClientOnly>
            <ConnexionClient />
        </ClientOnly>
    )

    if (currentUser.isAccepted) {
        redirect("/");
    }
}
