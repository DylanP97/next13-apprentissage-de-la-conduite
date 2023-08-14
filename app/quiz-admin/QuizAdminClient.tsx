'use client'

import { useEffect, useState } from 'react'
import BasicCard from '../components/BasicCard'
import axios from 'axios'

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
    axios.put(`http://localhost:3000/api/question/${questionId}`, { data })
      .then((response) => {
        const updatedQuestion = response.data.data;
        const questionIndex = questions.findIndex((question: any) => question.id === updatedQuestion.id);
        if (questionIndex !== -1) {
          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex] = updatedQuestion;
          setQuestionsData(updatedQuestions);
        }
        alert(!status ? "le question est désormais visible" : "le question est désormais invisible");
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête");
      })
  };

  const DeleteQuestion = async (questionId: string | number) => {
    axios.delete(`http://localhost:3000/api/question/${questionId}`)
      .then(() => {
        alert("ce question a été supprimer");
      })
      .catch(() => {
        alert("une erreur s'est produite dans la requête");
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