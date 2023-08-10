import getBlogs from '@/app/actions/getBlogs';
import getBlogById from '@/app/actions/getBlogById';
import ClientOnly from "@/app/components/ClientOnly";
import ArticleAdminClient from "./ArticleAdminClient";
import getCurrentUser from '@/app/actions/getCurrentUser';
import { redirect } from "next/navigation";

interface IParams {
    articleId?: string;
}

const ArticleAdminPage = async ({ params }: { params: IParams }) => {
    const blogs = await getBlogs();
    const blog = await getBlogById(params);
    const currentUser = await getCurrentUser();
    
    if (!currentUser || !currentUser?.isAccepted || !currentUser?.isSubscribed || !currentUser?.isAdmin) {
        redirect("/");
    }

    if (!blog?.id) {
        return (
            <ClientOnly>
                <h1>L&apos;article de blog que vous cherchez n&apos;existe pas ou il y a une erreur !</h1>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ArticleAdminClient
                // blogs={blogs}
                // blog={blog}
            />
        </ClientOnly>
    );
}

export default ArticleAdminPage;