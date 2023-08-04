import getCurrentUser from "@/app/actions/getCurrentUser";
import getBlogById from '@/app/actions/getBlogById';
import ClientOnly from "@/app/components/ClientOnly";
import ArticleClient from "./ArticleClient";

interface IParams {
    articleId?: string;
}

const ArticlePage = async ({ params }: { params: IParams }) => {
    const blog = await getBlogById(params);
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.isAdmin;

    if (!blog?.id) {
        return (
            <ClientOnly>
                <h1>L&apos;article de blog que vous cherchez n&apos;existe pas ou il y a une erreur !</h1>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ArticleClient
                blog={blog}
                isAdmin={isAdmin}
            />
        </ClientOnly>
    );
}

export default ArticlePage;
