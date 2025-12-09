import getQuestions from "@/app/actions/getQuestions";
import ClientOnly from "@/app/components/ClientOnly";
import QuizAdminClient from "./QuizAdminClient";
import Footer from "../components/Footer";

const QuizAdminPage = async () => {
  const questions = await getQuestions();

  return (
    <ClientOnly>
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
