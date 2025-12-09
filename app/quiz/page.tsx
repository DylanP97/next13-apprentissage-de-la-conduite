import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import QuizClient from "./QuizClient";
import getPublishedQuestions from "../actions/getPublishedQuestions";

const QuizPage = async () => {
  const publishedQuestions = await getPublishedQuestions();

  return (
    <ClientOnly>
      {publishedQuestions ? (
        <QuizClient publishedQuestions={publishedQuestions} />
      ) : (
        <h1>Il n&apos;y a aucune question</h1>
      )}

      <Footer />
    </ClientOnly>
  );
};

export default QuizPage;
