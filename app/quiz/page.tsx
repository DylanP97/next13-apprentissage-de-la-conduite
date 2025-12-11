import Footer from "../components/Footer";
import QuizClient from "./QuizClient";
import getPublishedQuestions from "../actions/getPublishedQuestions";

export default async function QuizPage() {
  const publishedQuestions = await getPublishedQuestions();

  return (
    <>
      <QuizClient publishedQuestions={publishedQuestions} />
      <Footer />
    </>
  );
}
