"use client";

import { useEffect, useState, useRef } from "react";
import trashWhite from "@/public/icons/trash-white.png";
import addImage from "@/public/icons/add-image.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";
import ImageUpload from "./ImageUpload";

interface CardEditionStepProps {
  isNewQuestion?: boolean;
  cancelEdition?: () => void;
  saveResponse?: () => void;
  data?: any;
  id?: string | number;
}

const CardEditionStep: React.FC<CardEditionStepProps> = ({
  data,
  isNewQuestion,
  id,
  cancelEdition,
  saveResponse,
}) => {
  const [question, setQuestion] = useState(data ? data?.question : "");
  const [answers, setAnswers] = useState(data ? data.answers : []);
  const [correctAnswer, setCorrectAnswer] = useState(
    data ? data.correctAnswer : 0,
  );
  const [file, setFile] = useState<any>();
  const [questionError, setQuestionError] = useState("");
  const [answersError, setAnswersError] = useState("");
  // const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [editionStep, setEditionStep] = useState("question");

  let questionErrorEl = document.querySelector("#error-question");
  let answersErrorEl = document.querySelector("#error-answers");

  useEffect(() => {
    if (!question) {
      setQuestionError("La question ne peut pas être vide");
      if (questionErrorEl) {
        questionErrorEl.innerHTML = questionError;
      }
    } else if (question) {
      setQuestionError("");
      if (questionErrorEl) {
        questionErrorEl.innerHTML = questionError;
      }
    }
    if (!answers || answers.length < 2) {
      setAnswersError("Il doit y avoir au moins 2 réponses");
      if (answersErrorEl) {
        answersErrorEl.innerHTML = answersError;
      }
    } else if (answers) {
      setAnswersError("");
      if (answersErrorEl) {
        answersErrorEl.innerHTML = answersError;
      }
    }
  }, [
    question,
    answers,
    questionErrorEl,
    questionError,
    answersErrorEl,
    answersError,
  ]);

  const handleEditionStep = (direction: string) => {
    if (direction === "previous") {
      if (editionStep === "answers") {
        setEditionStep("question");
      } else if (editionStep === "image") {
        setEditionStep("answers");
      }
    } else if (direction === "next") {
      if (editionStep === "question") {
        setEditionStep("answers");
      } else if (editionStep === "answers") {
        setEditionStep("image");
      }
    }
  };

  const handleSaveResponse = () => {
    if (!questionError && !answersError) {
      const payload = {
        question: question && question,
        answers: answers && answers,
        correctAnswer: correctAnswer && correctAnswer,
        imageUrl: file && file,
      };

      const createNew = (payload: any) => {
        axios.post(`/api/question`, { payload }).then(() => {
          saveResponse && saveResponse();
          toast.success("Question créé.");
        });
      };

      const updateOne = (payload: any) => {
        axios.put(`/api/question/${data.id}`, { payload }).then(() => {
          saveResponse && saveResponse();
          toast.success("Question sauvegardé.");
        });
      };

      isNewQuestion ? createNew(payload) : updateOne(payload);
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleDeleteAnswer = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };

  const handleCancelClick = () => {
    cancelEdition && cancelEdition();
  };

  return (
    <>
      {editionStep === "question" && (
        <>
          <label htmlFor={editionStep}>Définissez une {editionStep}</label>
          <input
            type="text"
            data-testid="question-input"
            className="question-input"
            name={editionStep}
            id={editionStep}
            placeholder={question ? question : `Ajouter une question`}
            defaultValue={!isNewQuestion ? data?.question : ""}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <p className="error-text" id="error-question">
            {" "}
          </p>
        </>
      )}
      {editionStep === "answers" && (
        <>
          <label htmlFor={editionStep}>
            Éditer les réponses et cocher la bonne réponse
          </label>
          <br />
          <div className="answers">
            {answers.map((answer: string, index: number) => (
              <div key={index + "answereditioninput"} className="answer">
                <input
                  type="text"
                  data-testid={`answer-input-${index}`}
                  name={editionStep}
                  id={editionStep}
                  placeholder={answer ? answer : `Ajouter une réponse`}
                  defaultValue={!isNewQuestion ? answer : ""}
                  onChange={(e) =>
                    setAnswers([
                      ...answers.slice(0, index),
                      e.target.value,
                      ...answers.slice(index + 1),
                    ])
                  }
                />
                <div className="answer-actions">
                  {answers.length > 1 && (
                    <Image
                      src={trashWhite}
                      alt="delete"
                      onClick={() => handleDeleteAnswer(index)}
                      className="icon"
                    />
                  )}
                  <button
                    className={`correct-answer-button ${
                      correctAnswer === index ? "selected" : ""
                    }`}
                    onClick={() => setCorrectAnswer(index)}
                  />
                </div>
              </div>
            ))}
            <button onClick={handleAddAnswer}>Ajouter une réponse</button>
          </div>
          {answersError && <span id="error-answers">{answersError}</span>}
        </>
      )}
      {editionStep === "image" && (
        <div className="edit-image-div">
          <ImageUpload
            id={editionStep}
            onChange={(value) => setFile(value)}
            value={file ? file : data?.imageUrl}
          />
        </div>
      )}
      <br />
      <div className="btn-group-edition">
        {editionStep === "question" ? (
          <button className="next-step" onClick={() => handleCancelClick()}>
            Annuler
          </button>
        ) : (
          editionStep !== "question" && (
            <button
              className="next-step btn-30color"
              onClick={() => handleEditionStep("previous")}
            >
              Précédent
            </button>
          )
        )}
        {editionStep === "image" ? (
          <button
            className="next-step btn-10color"
            onClick={() => handleSaveResponse()}
          >
            Valider
          </button>
        ) : (
          <button
            className="next-step btn-10color"
            onClick={() => handleEditionStep("next")}
          >
            Suivant
          </button>
        )}
      </div>
    </>
  );
};

export default CardEditionStep;
