import getQuestions from "@/app/actions/getQuestions";
import ClientOnly from "@/app/components/ClientOnly";
import QuizAdminClient from "./QuizAdminClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const QuizAdminPage = async () => {
  const questions = await getQuestions();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  if (!currentUser?.isAdmin) {
    redirect("/");
  }

  return (
    <ClientOnly>
      <NavBar currentUser={currentUser} />
      {questions ? (
        <QuizAdminClient questions={questions} />
      ) : (
        <h1>Il n&apos;y a pas de questions pour le moment!</h1>
      )}
      <Footer />
    </ClientOnly>
  );
};

export default QuizAdminPage;
