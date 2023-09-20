import { redirect } from "next/navigation";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import QuizClient from "./QuizClient";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPublishedQuestions from "../actions/getPublishedQuestions";

const QuizPage = async () => {
    const currentUser = await getCurrentUser();
    const publishedQuestions = await getPublishedQuestions();

    if (!currentUser) {
        redirect("/");
    }

    if (!currentUser.isAdmin) {
        if (!currentUser?.isAccepted || !currentUser?.isSubscribed) {
            redirect("/");
        } else {
            return (
                <ClientOnly>
                    <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
                    {
                        publishedQuestions ? (
                            <QuizClient publishedQuestions={publishedQuestions} />) : (
                            <h1>Il n&apos;y a aucune question</h1>
                        )
                    }

                    <Footer />
                </ClientOnly>
            );
        }
    } else {
        return (
            <ClientOnly>
                <NavBar isSubscribed={currentUser.isSubscribed} isAdmin={currentUser.isAdmin} userId={currentUser.id} />
                {
                    publishedQuestions ? (
                        <QuizClient publishedQuestions={publishedQuestions} />) : (
                        <h1>Il n&apos;y a aucune question</h1>
                    )
                }

                <Footer />
            </ClientOnly>
        );
    }
}

export default QuizPage;