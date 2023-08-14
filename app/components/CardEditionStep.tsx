'use client'

import { useEffect, useState, useRef } from 'react'
// import { createQuestion, modifyQuestion } from '../redux-actions/question';
import trashWhite from "@/public/icons/trash-white.png";
import addImage from "@/public/icons/add-image.png";
import Image from 'next/image';

interface CardEditionStepProps {
    isNewQuestion?: boolean;
    cancelEdition?: () => void;
    saveResponse?: () => void;
    data?: any;
    id?: string | number;
}

const CardEditionStep: React.FC<CardEditionStepProps> = ({
    data, isNewQuestion, id, cancelEdition, saveResponse }) => {

    const [question, setQuestion] = useState(data ? data.question : '');
    const [answers, setAnswers] = useState(data ? data.answers : []);
    const [correctAnswer, setCorrectAnswer] = useState(data ? data.correctAnswer : 0);
    const [image, setImage] = useState(data ? data.imageUrl : '');
    const [file, setFile] = useState<any>();
    const [questionError, setQuestionError] = useState('');
    const [answersError, setAnswersError] = useState('');
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [editionStep, setEditionStep] = useState("question");

    let questionErrorEl = document.querySelector('#error-question');
    let answersErrorEl = document.querySelector('#error-answers');

    useEffect(() => {
        if (!question) {
            setQuestionError('La question ne peut pas être vide')
            if (questionErrorEl) {
                questionErrorEl.innerHTML = questionError;
            }
        } else if (question) {
            setQuestionError('')
            if (questionErrorEl) {
                questionErrorEl.innerHTML = questionError;
            }
        }
        if (!answers || answers.length < 2) {
            setAnswersError('Il doit y avoir au moins 2 réponses')
            if (answersErrorEl) {
                answersErrorEl.innerHTML = answersError;
            }
        } else if (answers) {
            setAnswersError('')
            if (answersErrorEl) {
                answersErrorEl.innerHTML = answersError;
            }
        }
    }, [question, answers, questionErrorEl, questionError, answersErrorEl, answersError])


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
    }

    const handleSaveResponse = () => {

        if (!questionError && !answersError) {

            const formData = new FormData();
            if (question) formData.append('question', question);
            if (answers) formData.append('answers', JSON.stringify(answers));
            if (correctAnswer) formData.append('correctAnswer', correctAnswer);
            if (image && file) formData.append('imageUrl', file);

            // const saveAction = isNewQuestion ? createQuestion(formData) : modifyQuestion(id, formData);
            // dispatch(saveAction).then((res: any) => {
            //     saveResponse && saveResponse();
            // });
        } else {
            alert('Veuillez remplir tous les champs')
        }
    }

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleDeleteAnswer = (index: number) => {

        console.log(index)

        const updatedAnswers = [...answers];
        updatedAnswers.splice(index, 1);
        setAnswers(updatedAnswers);
    };

    const handleCancelClick = () => {
        cancelEdition && cancelEdition()
    }



    return (


        <>
            {
                editionStep === "question" && (
                    <>
                        <label htmlFor={editionStep}>Définissez une {editionStep}</label>
                        <input
                            type="text"
                            className='question-input'
                            name={editionStep}
                            id={editionStep}
                            placeholder={question ? question : `Ajouter une question`}
                            defaultValue={!isNewQuestion ? data.question : ""}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <p className='error-text' id="error-question"> </p>
                    </>
                )
            }
            {
                editionStep === "answers" && (
                    <>
                        <label htmlFor={editionStep}>Éditer les réponses et cocher la bonne réponse</label>
                        <br />
                        <div className='answers'>
                            {answers.map((answer: string, index: number) => (
                                <div key={index + "answereditioninput"} className='answer'>
                                    <input
                                        type="text"
                                        name={editionStep}
                                        id={editionStep}
                                        placeholder={answer ? answer : `Ajouter une réponse`}
                                        defaultValue={!isNewQuestion ? answer : ""}
                                        onChange={(e) => setAnswers([...answers.slice(0, index), e.target.value, ...answers.slice(index + 1)])}
                                    />
                                    <div className='answer-actions'>
                                        {answers.length > 1 && (
                                            <Image src={trashWhite} alt='delete' onClick={() => handleDeleteAnswer(index)} className='icon' />
                                        )}
                                        <button className={`correct-answer-button ${correctAnswer === index ? 'selected' : ''}`} onClick={() => setCorrectAnswer(index)} />
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddAnswer}>Ajouter une réponse</button>
                        </div>
                        {answersError && <span id="error-answers">{answersError}</span>}
                    </>
                )
            }
            {
                editionStep === 'image' && (
                    <div className='edit-image-div'>
                        <label htmlFor="file">
                            <p>Éditer ou ajouter une Image</p>
                            <br />
                            {image ? <Image className='current-question-img' src={image} alt="Your current question pic" width={1000} height={1000} onClick={() => inputFileRef.current && inputFileRef.current.click()} /> : <Image src={addImage} alt="" className='click-edit-image' style={{ width: "100px", height: "auto" }} onClick={() => inputFileRef.current && inputFileRef.current.click()} />}
                            <input type="file" alt="image" name={editionStep} id={editionStep}
                                lang="fr"
                                accept=".jpg, .jpeg, .png"
                                ref={inputFileRef}
                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    setFile(file);
                                    setImage(URL.createObjectURL(file));
                                }}
                                style={{ display: "none" }}
                            ></input>
                        </label>

                    </div>
                )
            }
            <br />
            <div className='btn-group-edition'>
                {
                    editionStep === "question" ? (
                        <button className='next-step' onClick={(() => handleCancelClick())} >Annuler</button>
                    ) : (
                        editionStep !== "question" && <button className='next-step' onClick={(() => handleEditionStep("previous"))} >Précédent</button>
                    )
                }
                {
                    editionStep === "image" ? (
                        <button className='next-step' onClick={(() => handleSaveResponse())} >Valider</button>
                    ) : (
                        <button className='next-step' onClick={(() => handleEditionStep("next"))} >Suivant</button>
                    )
                }
            </div>
        </>
    )
}

export default CardEditionStep