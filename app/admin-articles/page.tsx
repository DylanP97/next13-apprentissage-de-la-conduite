import getBlogs from '@/app/actions/getBlogs';
import ClientOnly from "@/app/components/ClientOnly";
import ArticleAdminClient from "./ArticleAdminClient";
import getCurrentUser from '@/app/actions/getCurrentUser';
import { redirect } from "next/navigation";
import NavBar from '../components/NavBar';

const ArticleAdminPage = async () => {
    const blogs = await getBlogs();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }

    if (!currentUser?.isAdmin) {
        redirect("/");
    }

    return (
        <ClientOnly>
            <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
            {
                blogs ? (
                    <ArticleAdminClient
                        blogs={blogs}
                    />) : (<h1>Il n&apos;y a pas d&apos;article pour le moment!</h1>)
            }

        </ClientOnly>
    );
}

export default ArticleAdminPage;