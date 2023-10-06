import getCurrentUser from "@/app/actions/getCurrentUser";
import getBlogById from '@/app/actions/getBlogById';
import ClientOnly from "@/app/components/ClientOnly";
import ArticleClient from "./ArticleClient";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import getUserById from "@/app/actions/getUserById";
import getCommentsByBlogId from "@/app/actions/getCommentsByBlogId";

interface IParams {
    articleId?: string;
}

const ArticlePage = async ({ params }: { params: IParams }) => {
    const blog = await getBlogById(params);
    const comments = await getCommentsByBlogId(params);
    const currentUser = await getCurrentUser();
    const author = blog ? blog.posterId && await getUserById(blog.posterId) : null
    const isAdmin = currentUser?.isAdmin;

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
                        {
                            !blog?.id ? (
                                <h1>L&apos;article de blog que vous cherchez n&apos;existe pas ou il y a une erreur !</h1>
                            ) : (
                                <ArticleClient
                                    blog={blog}
                                    isAdmin={isAdmin}
                                    author={author}
                                    comments={comments}
                                    currentUser={currentUser}
                                />
                            )
                        }
                        <Footer />
                    </ClientOnly>
                );
            }
        }
    } else {
        return (
            <ClientOnly>
                <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
                {
                    !blog?.id ? (
                        <h1>L&apos;article de blog que vous cherchez n&apos;existe pas ou il y a une erreur !</h1>
                    ) : (
                        <ArticleClient
                            blog={blog}
                            isAdmin={isAdmin}
                            author={author}
                            comments={comments}
                            currentUser={currentUser}
                        />
                    )
                }
                <Footer />
            </ClientOnly>
        );
    }
}

export default ArticlePage;
