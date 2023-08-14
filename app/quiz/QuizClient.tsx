'use client'

import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import AngleDoubleSmallRight from '@/public/icons/angle-double-small-right.png';
import axios from 'axios';
import Image from 'next/image';

interface QuizClientProps {
  publishedQuestions: any
}

const QuizClient: React.FC<QuizClientProps> = ({ publishedQuestions }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [seeResults, setSeeResults] = useState(false);
  const [slideScore, setSlideScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [userAnswer, setUserAnswer] = useState<number>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [image, setImage] = useState("");
  const [questionHistory, setQuestionHistory] = useState<object[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState(publishedQuestions);
  const [infoText, setInfoText] = useState("");


  function handleAnswerClick(answer: any, index: number) {
    setIsAnswered(true)
    if (isCorrect === undefined) {
      let correctElement = document.getElementById(`answer${correctAnswer}`)
      let elementId = `answer${index}`
      let element = document.getElementById(elementId)
      setUserAnswer(index)
      if (index === correctAnswer) {
        setInfoText("Bravo, c'est la bonne réponse!")
        setIsCorrect(true)
        element?.classList.add('correct-answer')
      } else {
        setInfoText("C'est la mauvaise réponse!")
        setIsCorrect(false)
        element?.classList.add('wrong-answer')
      }
      correctElement?.classList.add('correct-answer')
      const updatedQuestionHistory = questionHistory.map((q: any) => {
        if (q.question === question) {
          return {
            ...q,
            userAnswer: index,
            isCorrect: correctAnswer === index ? true : false
          };
        }
        return q;
      });
      setQuestionHistory(updatedQuestionHistory);
    }
    else {
      setInfoText("Vous avez déjà répondu !")
    }
  }

  function handleNewQuestionClick() {
    setIsAnswered(false)
    setInfoText("")
    if (isCorrect === undefined && quizStarted === true) {
      setInfoText("Il faut que vous répondez à la question.")
      setTimeout(() => {
        setInfoText("")
      }, 2000)
    } else {
      const previousAnswers = document.getElementsByClassName("response");
      for (let i = 0; i < previousAnswers.length; i++) {
        previousAnswers[i].classList.remove("correct-answer");
        previousAnswers[i].classList.remove("wrong-answer");
      }
      if (availableQuestions.length !== 0) {
        let newQuestion: any = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        setAvailableQuestions(availableQuestions.filter(
          (q: any) => q.question !== newQuestion.question
        ));
        setQuestion(newQuestion.question);
        setAnswers(newQuestion.answers);
        setCorrectAnswer(newQuestion.correctAnswer);
        newQuestion.imageUrl ? setImage(newQuestion.imageUrl) : setImage("");
        setQuestionHistory([...questionHistory, { question: newQuestion.question, answers: newQuestion.answers, correctAnswer: newQuestion.correctAnswer, imageUrl: newQuestion.imageUrl }]);
      } else {
        setSeeResults(true)
      }
      setIsCorrect(undefined);
    }
  }

  function handleStartQuizClick() {
    handleNewQuestionClick();
    setQuizStarted(true);
  }

  return (
    <div className='home-container'>
      {
        !quizStarted ? (
          <>
            <h1>Quiz</h1>
            <p>Répondez à une série de questions pour vous préparez à l&apos;examen de la conduite.</p>
            <hr />
            <Button className="btn-10color" onClick={(() => handleStartQuizClick())}>Démarrer le Quiz</Button>
          </>
        ) : (
          <section className='quiz-section'>
            {
              !seeResults ? (
                <>
                  <div className='quiz'>
                    {image && <Image
                      width={1000}
                      height={1000}
                      src={image} alt=""
                    />}
                    <p className='question'>{question && question}</p>
                    <div className='responses'>
                      {answers && answers.map((answer, index) => (
                        <div key={index} className="response" id={'answer' + index} onClick={() => handleAnswerClick(answer, index)}>
                          <p>{answer}</p>
                        </div>
                      ))}
                    </div>
                    <div className='quiz-btn'>
                      {
                        isAnswered && <Button className="btn-10color" onClick={(() => handleNewQuestionClick())}>{availableQuestions.length === 0 ? "Voir mes scores" : "Question suivante"}</Button>
                      }
                      <hr />
                      <p className='error-text'>{infoText}</p>
                    </div>
                  </div>

                  {
                    !slideScore ? (
                      <div className='slide-score' onClick={(() => setSlideScore(true))}>
                        <Image className='slide-score-img' src={AngleDoubleSmallRight} alt="slide" style={{ width: "48px", height: "auto" }} />
                      </div>
                    ) : (
                      <div className='slide-score active' onClick={(() => setSlideScore(false))}>
                        <p>Score : {questionHistory.filter((q: any) => q.isCorrect).length} sur {questionHistory.length}</p>
                        <p>Nbr de Questions : {publishedQuestions.length} </p>
                      </div>
                    )
                  }
                </>
              ) : (
                <div>
                  <h3>Voici le résulats de vos réponses avec correction:</h3>
                  <br />
                  <p>Votre Score est de {questionHistory.filter((q: any) => q.isCorrect).length} sur {questionHistory.length}</p>
                  <br />
                  {
                    questionHistory.map((q: any) => {

                      return (
                        <div key={q.question}>
                          <hr />
                          <h4>{q.question}</h4>
                          <br />
                          {
                            q.imageUrl && <Image className='img-score-results' src={q.imageUrl} alt="" width={1000} height={1000} />
                          }
                          <p>{q.isCorrect ? "Bravo c'était la bonne réponse" : "Vous avez eu faux"}</p>
                          <p>Vous aviez répondu : {q.answers[q.userAnswer]}</p>
                          <p>La bonne réponse était : {q.answers[q.correctAnswer]}</p>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </section>
        )
      }
    </div>
  )
}

export default QuizClient






