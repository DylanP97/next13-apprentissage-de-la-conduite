'use client'

import { useEffect, useState } from 'react'
import BasicCard from '../components/BasicCard'
import axios from 'axios'
import { toast } from "react-hot-toast";

interface QuizAdminClientProps {
  questions: any
}

const QuizAdminClient: React.FC<QuizAdminClientProps> = ({ questions }) => {
  const [questionsData, setQuestionsData] = useState(questions)

  useEffect(() => {
    setQuestionsData(questions)
  }, [questions]);

  const TogglePublish = async (questionId: string | number, status: any) => {
    const data = { "published": !status }
    axios.put(`/api/question/${questionId}`, { data })
      .then((response) => {
        const updatedQuestion = response.data.data;
        const questionIndex = questions.findIndex((question: any) => question.id === updatedQuestion.id);
        if (questionIndex !== -1) {
          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex] = updatedQuestion;
          setQuestionsData(updatedQuestions);
        }
        toast.success(!status ? "La question est désormais dans le quiz." : "La question n'est désormais plus dans le quiz");
      })
      .catch(() => {
        toast.error("Une erreur s'est produite dans la requête.");
      })
  };

  const DeleteQuestion = async (questionId: string | number) => {
    axios.delete(`/api/question/${questionId}`)
      .then(() => {
        toast.success("Cette question a été supprimer.");
      })
      .catch(() => {
        toast.error("Une erreur s'est produite dans la requête.");
      })
  };

  return (
    <div className='home-container'>
      <h1>Gérer les Questions du Quiz</h1>
      <p>Créer une question, modifier et consulter les questions existantes.</p>
      <hr />
      <div className='article-table'>
        <BasicCard
          key="createQuestion"
          type='createQuestion'
        />
        {questionsData && Object.values(questionsData).map((question: any) => {
          return (
            <BasicCard
              key={question.id}
              data={question}
              type='question'
              toggleMethod={
                TogglePublish
              }
              deleteMethod={
                DeleteQuestion
              }
            />
          )
        })}
      </div>

    </div>
  )
}

export default QuizAdminClient