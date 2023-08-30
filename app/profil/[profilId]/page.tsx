import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import ClientOnly from "../../components/ClientOnly";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";

export default async function ProfilePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }

    if (!currentUser.isAdmin) {
        if (!currentUser?.isAccepted) {
            if (!currentUser?.isSubscribed) {
                redirect("/");
            } else {
                return (
                    <ClientOnly>
                        <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
                        <ProfileClient currentUser={currentUser} />
                    </ClientOnly>
                )
            }
        }
    } else {
        return (
            <ClientOnly>
                <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
                <ProfileClient currentUser={currentUser} />
            </ClientOnly>
        )
    }
}