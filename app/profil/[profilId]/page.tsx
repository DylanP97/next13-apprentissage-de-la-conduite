import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import ClientOnly from "../../components/ClientOnly";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";

export default async function ProfilePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.isAccepted || !currentUser?.isSubscribed) {
        redirect("/");
    }

    if (currentUser) return (
        <ClientOnly>
            <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
            <ProfileClient currentUser={currentUser} />
        </ClientOnly>
    )


}