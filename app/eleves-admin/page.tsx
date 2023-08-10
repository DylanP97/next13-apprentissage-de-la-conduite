import getCurrentUser from "@/app/actions/getCurrentUser";
import ElevesAdminClient from "./ElevesAdminClient";
import ClientOnly from "../components/ClientOnly";
import { redirect } from "next/navigation";

export default async function ElevesAdminPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
        redirect("/");
    }

    return (
        <ClientOnly>
            <ElevesAdminClient />
        </ClientOnly>
    )
}