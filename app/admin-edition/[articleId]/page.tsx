import getBlogs from '@/app/actions/getBlogs';
import getBlogById from '@/app/actions/getBlogById';
import ClientOnly from "@/app/components/ClientOnly";
import EditionArticleClient from "./EditionArticleClient";
import getCurrentUser from '@/app/actions/getCurrentUser';
import { redirect } from "next/navigation";
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

interface IParams {
    articleId?: string;
}

const EditionArticlePage = async ({ params }: { params: IParams }) => {
    const blogs = await getBlogs();
    const blog = await getBlogById(params);
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.isAccepted || !currentUser?.isSubscribed || !currentUser?.isAdmin) {
        redirect("/");
    }

    return (
        <ClientOnly>
            <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
            <EditionArticleClient
                blogs={blogs}
                blog={blog}
            />
            <Footer />
        </ClientOnly>
    );
}

export default EditionArticlePage;